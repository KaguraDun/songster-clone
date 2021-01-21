import Sidebar from './Sidebar';
import Store, { EVENTS } from './Store';
import { AudioGenerator } from './AudioGenerator/AudioGenerator';
import RenderSong from './RenderSong';
import renderElement from './helpers/renderElements';
import MusicPlayerBox from './MusicPlayerBox';

export default class DisplayTab {
  parentElement: HTMLElement;
  displayContent: HTMLElement;
  notesContent: HTMLElement;
  store: Store;
  titleComponents: HTMLElement;
  // title: string;
  // author: string;
  artistName: HTMLElement;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
    this.changeDisplay = this.changeDisplay.bind(this);
    this.titleComponents;
    this.artistName;

    // this.author;
  }

  render() {
    this.displayContent = renderElement(this.parentElement, 'section', ['display__tab']);
    this.renderSongContent('6000521b6a4f1508a4233e03'); // сделать рандомным по дефолту
    this.titleComponents = renderElement(this.displayContent, 'div', ['title']);

    const dataWrapper = renderElement(this.displayContent, 'div', ['display__data']);
    this.notesContent = renderElement(dataWrapper, 'div', ['tab__content']);
    this.notesContent.setAttribute('id', 'data-wrapper');
    new MusicPlayerBox(this.notesContent, this.store).render();
    new Sidebar(dataWrapper, this.store).render();

    this.store.eventEmitter.addEvent(EVENTS.SELECT_SONG, this.changeDisplay);
  }

  changeDisplay() {
    console.log(this.store.selectedSong);
    this.renderSongContent(this.store.selectedSong);
  }

  async renderSongTitle(title: string, track: string) {
    this.titleComponents.innerHTML = '';
    this.artistName = renderElement(this.titleComponents, 'div', ['title__tab-artist'], `${title}`);
    const titleBox = renderElement(this.titleComponents, 'div', ['title__box']);
    const trackTitle = renderElement(titleBox, 'div', ['title__tab-track'], `${track}`);
    const favButton = renderElement(titleBox, 'button', ['title__tab-fav']);
  }

  async renderSongContent(id: string) {
    const responce = await fetch(`http://localhost:3000/songs/id/?id=${id}`);
    const { midiData, converted } = await responce.json();
    this.titleComponents.innerHTML = '';
    this.renderSongTitle(converted.Name, converted.Author);

    const audio = new AudioGenerator(this.notesContent, midiData.data, this.store);
    audio.init();

    const page = new RenderSong(this.notesContent, converted, this.store);
    page.render();
  }
}
