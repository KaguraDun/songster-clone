import EventEmitter from './EventEmitter';
import request from './request';

export enum EVENTS {
  TIME_MARKER_POSITION_CHANGED = 'TIME_MARKER_POSITION_CHANGED',
  PLAYER_PROGRESS_BAR_CLICK = 'PLAYER_PROGRESS_BAR_CLICK',
  FULL_SCREEN_BUTTON_CLICK = 'FULL_SCREEN_BUTTON_CLICK',
  SELECT_INSTRUMENT = 'SELECT_INSTRUMENT',
  PLAY_BUTTON_CLICK = 'PLAY_BUTTON_CLICK',
  END_OF_SONG = 'END_OF_SONG',
  SELECT_SONG = 'SELECT_SONG',
  MUTE_SONG = 'MUTE_SONG',
  CHANGE_VOLUME = 'CHANGE_VOLUME',
  TOGGLE_METRONOME = 'TOGGLE_METRONOME',
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
}



export default class Store {
  eventEmitter: EventEmitter;
  songTimeMiliSeconds: number;
  playMusic: boolean = false;

  isSongMuted: boolean = false;
  volumeLevel: number = 50;

  selectedSongId: string;
  selectedInstrumentId: number = 0;

  isMetronomeEnabled: boolean = false;

  isSideBarOpened: boolean = false;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.setLastSelectedSongId();
  }

  init() {}

  setSongTime(time: number) {
    this.songTimeMiliSeconds = time;
    this.eventEmitter.emit(EVENTS.TIME_MARKER_POSITION_CHANGED);
  }

  setSongTimeFromPlayer(time: number){
    this.songTimeMiliSeconds = time;
    this.eventEmitter.emit(EVENTS.PLAYER_PROGRESS_BAR_CLICK);
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

  setLastSelectedSongId() {
    const id = localStorage.getItem('songID');
    this.selectedSongId = id ? id : '601417bd36c92d00234d4a9a';
  }

  selectSong(id: string) {
    this.playMusic = false;
    this.isMetronomeEnabled = false;
    localStorage.setItem('songID',id);
    this.selectedSongId = id;
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

  toggleMetronome() {
    this.isMetronomeEnabled = !this.isMetronomeEnabled;
    this.eventEmitter.emit(EVENTS.TOGGLE_METRONOME);
  }

  toggleSideBar(){
    this.isSideBarOpened = !this.isSideBarOpened;
    this.eventEmitter.emit(EVENTS.TOGGLE_SIDEBAR);

  }
}
