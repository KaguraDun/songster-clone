import EventEmitter from './EventEmitter';
import request from './request';

export enum EVENTS {
  TIME_MARKER_POSITION_CHANGED = 'TIME_MARKER_POSITION_CHANGED',
  PLAY_BUTTON_CLICK = 'PLAY_BUTTON_CLICK',
  END_OF_SONG = 'END_OF_SONG',
  SELECT_SONG = 'SELECT_SONG',
}



export default class Store {
  eventEmitter: EventEmitter;
  songTime: number;
  playMusic: boolean;
  selectedSong: string;
  tracksArray: any;


  constructor() {
    this.songTime = null;
    this.eventEmitter = new EventEmitter();
    this.playMusic = false;
    this.selectedSong;
    this.tracksArray;
  }

  init() {}

  setSongTime(time: number) {
    this.songTime = time;
    this.eventEmitter.emit(EVENTS.TIME_MARKER_POSITION_CHANGED);
  }

  playSong() {
    this.playMusic = !this.playMusic;
    this.eventEmitter.emit(EVENTS.PLAY_BUTTON_CLICK);
  }

  setSongData(id: string) {
    this.selectedSong = id;
    this.eventEmitter.emit(EVENTS.SELECT_SONG);
  }

    // getSongArray(id:string, tracks: any){
    //   this.selectedSong = id;
    //   this.tracksArray =  tracks;
    //   this.eventEmitter.emit(EVENTS.SELECT_SONG);
    // }


}
