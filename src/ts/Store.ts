import EventEmitter from './EventEmitter';
import request from './request';

export enum EVENTS {
  TIME_MARKER_POSITION_CHANGED = 'TIME_MARKER_POSITION_CHANGED',
  FULL_SCREEN_BUTTON_CLICK = 'FULL_SCREEN_BUTTON_CLICK',
  SELECT_INSTRUMENT = 'SELECT_INSTRUMENT',
  PLAY_BUTTON_CLICK = 'PLAY_BUTTON_CLICK',
  END_OF_SONG = 'END_OF_SONG',
  SELECT_SONG = 'SELECT_SONG',
  MUTE_SONG = 'MUTE_SONG',
  CHANGE_VOLUME = 'CHANGE_VOLUME',
}



export default class Store {
  eventEmitter: EventEmitter;
  songTime: number;
  playMusic: boolean = false;

  isSongMuted: boolean = false;
  volumeLevel: number = 50;

  selectedSongId: string;
  selectedInstrumentId: number = 0;
  tracksArray: any;


  constructor() {
    this.songTime;
    this.eventEmitter = new EventEmitter();
    this.playMusic;
  }

  init() {}

  setSongTime(time: number) {
    this.songTime = time;
    this.eventEmitter.emit(EVENTS.TIME_MARKER_POSITION_CHANGED);
  }

  playSong() {
    console.log('play');
    this.playMusic = !this.playMusic;
    this.eventEmitter.emit(EVENTS.PLAY_BUTTON_CLICK);
  }

  endOfSong() {
    this.playMusic = false;
    this.eventEmitter.emit(EVENTS.END_OF_SONG);
  }
  setSongId(id: string) {
    this.selectedSongId = id;
    this.eventEmitter.emit(EVENTS.SELECT_SONG);
  }

  getSongArray(id:string, tracks: any){
    this.selectedSongId = id;
    this.tracksArray =  tracks;
    this.eventEmitter.emit(EVENTS.SELECT_SONG);
  }

  openFullScreen() {
    this.eventEmitter.emit(EVENTS.FULL_SCREEN_BUTTON_CLICK);
  }

  selectInstrument(id: number) {
    this.selectedInstrumentId = id;
    this.eventEmitter.emit(EVENTS.SELECT_INSTRUMENT);
  }

  muteSong() {
    this.isSongMuted = !this.isSongMuted;
    this.eventEmitter.emit(EVENTS.MUTE_SONG);
  }

  async changeVolume(value: number) {
    this.volumeLevel = value;
    this.eventEmitter.emit(EVENTS.CHANGE_VOLUME);
  }
}
