import { Midi, Track } from '@tonejs/midi';
import * as Tone from 'tone';
import Store, { EVENTS } from '../Store';
import SampleLibrary from '../../../tonejs-instruments/Tonejs-Instruments';
import { Instrument } from '@tonejs/midi/dist/Instrument';
import { instruments } from './MidiInstruments';

// enum Volume {
//   SelectedTrack = -20,
//   DefaultTrack = -30,
// }

let Volume = {
  SelectedTrack: -20,
  DefaultTrack: -30,
}

export class AudioGenerator {
  private midi: Midi;
  private store: Store;
  private toneTracks: Tone.Part[];
  private toneVolumes: Tone.Volume[];
  private currentTrackId: number;
  private timeOffset: number;

  constructor(midiData: ArrayBuffer, store: Store) {
    this.store = store;
    this.midi = new Midi(midiData);

    this.currentTrackId = 0;
    this.timeOffset = 0;

    this.play = this.play.bind(this);
    this.stopMusic = this.stopMusic.bind(this);
    this.setTimeOffset = this.setTimeOffset.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.muteSong = this.muteSong.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  dispose() {
    Tone.Transport.cancel();

    this.store.eventEmitter.removeEvent(EVENTS.PLAY_BUTTON_CLICK, this.play);
    this.store.eventEmitter.removeEvent(EVENTS.TIME_MARKER_POSITION_CHANGED, this.setTimeOffset);
    this.store.eventEmitter.removeEvent(EVENTS.END_OF_SONG, this.stopMusic);
    this.store.eventEmitter.removeEvent(EVENTS.SELECT_INSTRUMENT,this.changeTrack);
    this.store.eventEmitter.removeEvent(EVENTS.MUTE_SONG,this.muteSong);
    this.store.eventEmitter.removeEvent(EVENTS.CHANGE_VOLUME,this.changeVolume);
  }

  init() {
    this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK, this.play);
    this.store.eventEmitter.addEvent(EVENTS.TIME_MARKER_POSITION_CHANGED, this.setTimeOffset);
    this.store.eventEmitter.addEvent(EVENTS.END_OF_SONG, this.stopMusic);
    this.store.eventEmitter.addEvent(EVENTS.SELECT_INSTRUMENT,this.changeTrack);
    this.store.eventEmitter.addEvent(EVENTS.MUTE_SONG,this.muteSong);
    this.store.eventEmitter.addEvent(EVENTS.CHANGE_VOLUME,this.changeVolume);

    Tone.Transport.bpm.value = this.midi.header.tempos[0].bpm;
    Tone.Transport.timeSignature = this.midi.header.timeSignatures[0].timeSignature;

    this.initTracks();
    Tone.start();
  }

  initTracks() {
    this.resetTracks();
    this.midi.tracks.forEach((track, id) => {
      const volume = id === this.currentTrackId ? Volume.SelectedTrack : Volume.DefaultTrack;
      this.initTonePart(track, volume);
    });
  }

  resetTracks() {
    this.toneTracks = [];
    this.toneVolumes = [];
  }

  initTonePart(track: Track, volumeLevel: number) {
    const synth = this.getSynth(track.instrument);
    if (!synth) return;

    const volume = new Tone.Volume(volumeLevel).toDestination();
    this.toneVolumes.push(volume);
    synth.connect(volume);

    const part = new Tone.Part((time, note) => {
      console.log(note.time,time);
      synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
    }, track.notes);
    this.toneTracks.push(part);
  }

  muteSong() {
    this.toneVolumes.forEach((volume) => {
      volume.mute = this.store.isSongMuted;
    })
  }

  async changeVolume() {
    const value = this.getVolumeLevel(this.store.volumeLevel);
    Volume.DefaultTrack = value;
    Volume.SelectedTrack = value + 10;
    this.toneVolumes.forEach((volume,id) => {
      volume.volume.value = value;
      if (id === this.currentTrackId) volume.volume.value += 10;
    });
  }

  getVolumeLevel(value: number) {
    return value * 0.8 - 70;
  }

  changeTrack() {
    Tone.Transport.cancel();
    this.setCurrentTrack(this.store.selectedInstrumentId);
    this.resetTracks();
    this.initTracks();
    if (this.store.playMusic) {
      this.start();
    }
  }

  play() {
    if (this.store.playMusic) {
      this.start();
    } else {
      this.pause();
    }
  }

  stopMusic() {
    this.timeOffset = 0;
    Tone.Transport.cancel();
    Tone.Transport.stop();
    this.initTracks();
  }

  start() {
    this.toneTracks.forEach((part) => {
      part.start();
    });
    Tone.Transport.start(undefined, this.timeOffset);
  }

  pause() {
    Tone.Transport.pause();
  }

  setTimeOffset() {
    const second: number = 1000;

    this.timeOffset = this.store.songTimeMiliSeconds / second;

    if (this.store.playMusic) {
      Tone.Transport.pause();
      this.start();
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
