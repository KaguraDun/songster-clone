import { Player } from 'tone';

// import { AudioGenerator } from "./AudioGenerator";
// import SheetMusicPage from "./SheetMusicPage";
import Sidebar from './Sidebar';
import Store from './Store';
import { AudioGenerator } from './AudioGenerator/AudioGenerator';
import RenderSong from './RenderSong';
import renderElement from './helpers/renderElements';
import PlayerBox from './PlayerBox';


export default class DisplayTab {
  parentElement: HTMLElement;
  displayContent: HTMLElement;
  notesContent: HTMLElement;
  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
  }

  render() {
    this.displayContent = renderElement(this.parentElement, 'section', ['display__tab']);
    this.renderSongTitle();
    const dataWrapper = renderElement(this.displayContent, 'div', ['display__data']);
    this.notesContent = renderElement(dataWrapper, 'div', ['tab__content']);
    this.notesContent.setAttribute('id', 'data-wrapper');
    new PlayerBox(this.notesContent, this.store).render();
    new Sidebar(dataWrapper, this.store).render();
    this.renderSongContent();
  }

  renderSongTitle() {
    const titleComponents = renderElement(this.displayContent, 'div', ['title']);
    const artistName = renderElement(titleComponents, 'div', ['title__tab-artist'], 'Nirvana');
    const titleBox = renderElement(titleComponents, 'div', ['title__box']);
    const trackTitle = renderElement(
      titleBox,
      'div',
      ['title__tab-track'],
      'Smells like Teen Spirit',
    );
    const favButton = renderElement(titleBox, 'button', ['title__tab-fav']);
    const subTitle = renderElement(
      titleComponents,
      'div',
      ['title__sub'],
      'Kurt Cobain - Intro/Verse Guitar - Electric Guitar (clean)',
    );
  }

  async renderSongContent() {
    const responce = await fetch('http://localhost:3000/songs/id/?id=6000521b6a4f1508a4233e03');

    //const responce = await fetch('http://localhost:3000/songs/id/?id=6000a2a200bb3e15e47d4d33');

    const {midiData, converted} = await responce.json();


    //const arrayBuffer = new ArrayBuffer(midiData.data);
    //const midi = new Midi(arrayBuffer);
    const audio = new AudioGenerator(this.notesContent, midiData.data, this.store);
    audio.init();

    const page = new RenderSong(this.notesContent, converted, this.store);
    page.render();
  }


  
}
