import EventEmitter from './EventEmitter';
import request from './request';

export enum EVENTS {
  TIME_MARKER_POSITION_CHANGED = 'TIME_MARKER_POSITION_CHANGED',
  PLAY_BUTTON_CLICK = 'PLAY_BUTTON_CLICK',
}

export default class Store {
  eventEmitter: EventEmitter;
  songTime: number;

  constructor() {
    this.songTime = null;
    this.eventEmitter = new EventEmitter();
  }

  init() {}

  setSongTime(time: number) {
    this.songTime = time;
    this.eventEmitter.emit(EVENTS.TIME_MARKER_POSITION_CHANGED);
  }
}
