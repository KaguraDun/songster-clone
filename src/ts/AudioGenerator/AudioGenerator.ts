import { Midi, Track } from '@tonejs/midi';
import * as Tone from 'tone';
import Store, { EVENTS } from '../Store';
import SampleLibrary from '../../../public/tonejs-instruments/Tonejs-Instruments';
import { Instrument } from '@tonejs/midi/dist/Instrument';
import { instruments } from './MidiInstruments';
import { Metronome } from './Metronome';

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
  private metronome: Metronome;

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
    Tone.Transport.stop();
    this.metronome.dispose();

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

    const bpm = this.midi.header.tempos[0].bpm;
    const timeSignature = this.midi.header.timeSignatures[0].timeSignature;

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.timeSignature = timeSignature;

    this.metronome = new Metronome(timeSignature,this.store);

    this.initTracks();
  }

  initTracks() {
    this.resetTracks();
    this.midi.tracks.forEach((track, id) => {
      const volume = id === this.currentTrackId ? Volume.SelectedTrack : Volume.DefaultTrack;
      this.initTonePart(track, volume);
    });
    this.metronome.init();
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
      synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
    }, track.notes);
    this.toneTracks.push(part);
  }

  muteSong() {
    this.toneVolumes.forEach((volume) => {
      volume.mute = this.store.isSongMuted;
    })
    this.metronome.mute(this.store.isSongMuted);
  }

  async changeVolume() {
    const value = this.getVolumeLevel(this.store.volumeLevel);
    Volume.DefaultTrack = value;
    Volume.SelectedTrack = value + 10;
    this.toneVolumes.forEach((volume,id) => {
      volume.volume.value = value;
      if (id === this.currentTrackId) volume.volume.value += 10;
    });

    this.metronome.changeVolume(value);
  }

  getVolumeLevel(value: number) {
    return value * 0.8 - 70;
  }

  async changeTrack() {
    this.setCurrentTrack(this.store.selectedInstrumentId);
    await this.changeVolume();
  }

  async play() {
    await Tone.start();

    if (this.store.playMusic) {
      this.start();
      this.metronome.start();
    } else {
      this.pause();
      this.metronome.stop();
    }
  }

  stopMusic() {
    this.metronome.dispose();

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
    const name = instrument.name;
    const instrumentObj = instruments.find((obj) => obj.id === name);
    if (!instrumentObj || !instrumentObj.name) return;

    return SampleLibrary.load({
      instruments: instrumentObj.name,
      ext: '.ogg',
    });
  }
}
