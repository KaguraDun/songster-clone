import EventEmitter from './EventEmitter';
import request from './request';

export enum EVENTS {
  TIME_MARKER_POSITION_CHANGED = 'TIME_MARKER_POSITION_CHANGED',
  PLAY_BUTTON_CLICK = 'PLAY_BUTTON_CLICK',
  END_OF_SONG = 'END_OF_SONG',
}

export default class Store {
  eventEmitter: EventEmitter;
  songTime: number;
  playMusic: boolean;

  constructor() {
    this.songTime = null;
    this.eventEmitter = new EventEmitter();
    this.playMusic = false;
  }

  init() {}

  setSongTime(time: number) {
    this.songTime = time;
    this.eventEmitter.emit(EVENTS.TIME_MARKER_POSITION_CHANGED);
  }

  playSong(){
    this.playMusic = !this.playMusic;
    this.eventEmitter.emit(EVENTS.PLAY_BUTTON_CLICK);
  }
}
