import { Midi, Track } from '@tonejs/midi';
import * as Tone from 'tone';
import Store, { EVENTS } from '../Store';
import SampleLibrary from '../../../tonejs-instruments/Tonejs-Instruments';
import { Instrument } from '@tonejs/midi/dist/Instrument';
import { instruments } from './MidiInstruments';

enum Volume {
  SelectedTrack = 0,
  DefaultTrack = -10,
}

export class AudioGenerator {
  private midi: Midi;
  private parentElement: HTMLElement;
  private store: Store;
  private toneTracks: Tone.Part[];
  private currentTrackId: number;
  private timeOffset: number;

  constructor(parentElement: HTMLElement, midiData: ArrayBuffer, store: Store) {
    this.store = store;
    this.parentElement = parentElement;
    this.midi = new Midi(midiData);
    this.toneTracks = [];
    this.currentTrackId = 0;
    this.timeOffset = 0;

    this.play = this.play.bind(this);
    this.stopMusic = this.stopMusic.bind(this);
    this.setTimeOffset = this.setTimeOffset.bind(this);
  }

  render() {
    this.init();
    const button = document.createElement('button');
    button.textContent = 'click';
    this.parentElement.appendChild(button);
    button.onclick = () => this.play();

    const stop = document.createElement('button');
    stop.textContent = 'stop';
    this.parentElement.appendChild(stop);
    stop.onclick = () => Tone.Transport.stop();
  }

  setTimeOffset() {
    const second: number = 1000;

    this.timeOffset = this.store.songTime / second;

    if (this.store.playMusic) {
      Tone.Transport.pause();
      this.play();
    }
  }

  stopMusic() {
    this.timeOffset = 0;
    Tone.Transport.stop();
  }

  init() {
    this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK, this.play);
    this.store.eventEmitter.addEvent(EVENTS.TIME_MARKER_POSITION_CHANGED, this.setTimeOffset);
    this.store.eventEmitter.addEvent(EVENTS.END_OF_SONG, this.stopMusic);

    Tone.Transport.bpm.value = this.midi.header.tempos[0].bpm;
    Tone.Transport.timeSignature = this.midi.header.timeSignatures[0].timeSignature;

    this.midi.tracks.forEach((track, i) => {
      const volume = i === this.currentTrackId ? +Volume.SelectedTrack : +Volume.DefaultTrack;
      this.initTonePart(track, volume);
    });
  }

  initTonePart(track: Track, volumeLevel: number) {
    const synth = this.getSynth(track.instrument);
    if (!synth) return;

    const volume = new Tone.Volume(volumeLevel).toDestination();
    synth.connect(volume);

    const part = new Tone.Part((time, note) => {
      synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
    }, track.notes);
    this.toneTracks.push(part);
  }

  play() {
    console.log(this.store.playMusic, 'offset', this.timeOffset);

    if (this.store.playMusic) {
      console.log(this.toneTracks.length);

      this.toneTracks.forEach((part) => {
        part.start(undefined, this.timeOffset);
      });

      Tone.Transport.start(undefined, this.timeOffset);
      Tone.start();
    } else {
      Tone.Transport.pause();
      this.timeOffset = Tone.now();
    }
  }

  setCurrentTrack(id: number) {
    this.currentTrackId = id;
  }

  getSynth(instrument: Instrument) {
    console.log(instrument.number, instrument.name);
    console.log('-------------');
    const name = instrument.name;
    const instrumentObj = instruments.find((obj) => obj.id === name);
    if (!instrumentObj || !instrumentObj.name) return;

    return SampleLibrary.load({
      instruments: instrumentObj.name,
      ext: '.ogg',
    });
  }
}
