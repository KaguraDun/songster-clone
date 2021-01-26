import renderElement from './helpers/renderElements';
import { SVG_SPRITE } from './helpers/svg_sprites';
import Store from './Store';

export default class Player {
  parentElement: HTMLElement;
  store: Store;
  audio: HTMLAudioElement;
  isPlaying: boolean;

//   constructor(parentElement: HTMLElement, store: Store, audio: HTMLAudioElement) {
    constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
    // this.audio = audio;
    this.isPlaying = false;
  }

  
}
