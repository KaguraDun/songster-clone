import Sidebar from './Sidebar';
import Store, { EVENTS } from './Store';
import { AudioGenerator } from './AudioGenerator/AudioGenerator';
import RenderSong from './RenderSong';
import renderElement from './helpers/renderElements';
import MusicPlayerBox from './MusicPlayerBox';
import { SVG_SPRITE } from './helpers/svg_sprites';
import { Song } from '../models/TrackDisplayType';
import { Midi } from '@tonejs/midi';
import { serverUrl } from '../models/Constants';
import FavoriteSonsAddOrDelete from './FavoriteSongs';

export default class DisplayTab {
  parentElement: HTMLElement;
  container: HTMLElement;
  titleContainer: HTMLElement;
  contentContainer: HTMLElement;
  notesContent: HTMLElement;

  songRenderer: RenderSong;
  musicPlayerBox: MusicPlayerBox;
  audioGenerator: AudioGenerator;
  sidebar: Sidebar;

  store: Store;
  songId: string;
  song: Song;
  midiData: ArrayBuffer;
  sidebarOverlay: HTMLElement;

  constructor(parentElement: HTMLElement, store: Store, songId: string) {
    this.parentElement = parentElement;
    this.store = store;
    this.songId = songId;

    this.openFullScreenMode = this.openFullScreenMode.bind(this);
    this.showBurgerMenu = this.showBurgerMenu.bind(this);
  }

  dispose() {
    this.parentElement.removeChild(this.container);
    this.store.eventEmitter.removeEvent(EVENTS.FULL_SCREEN_BUTTON_CLICK, this.openFullScreenMode);

    this.songRenderer.dispose();
    this.musicPlayerBox.dispose();
    this.audioGenerator.dispose();
    this.sidebar.dispose();
  }

  async render() {
    this.store.eventEmitter.addEvent(EVENTS.FULL_SCREEN_BUTTON_CLICK, this.openFullScreenMode);

    this.container = renderElement(this.parentElement, 'section', ['display__tab']);
    await this.fetchSong();

    this.renderSongTitle();
    this.renderSongContent();
    this.renderSideBar();
    this.renderMusicPlayer();
    this.initAudio();
  }

  async fetchSong() {
    const responce = await fetch(`${serverUrl}/songs/id/?id=${this.songId}`);
    const { midiData, converted } = await responce.json();

    this.song = converted;
    this.midiData = midiData.data;
  }

  renderSongTitle() {
    this.titleContainer = renderElement(this.container, 'div', ['title']);
    const trackData = renderElement(this.titleContainer, 'div', ['container_trackData']);
    const artistName = renderElement(trackData, 'div', ['title__tab-artist'], this.song.Name);
    artistName.setAttribute('id', 'song_title');
    artistName.title = 'Artist name';
    const titleBox = renderElement(trackData, 'div', ['title__box']);
    const songTitle = renderElement(titleBox, 'div', ['title__tab-track'], this.song.Author);
    songTitle.setAttribute('id', 'print_artist');
    songTitle.title = 'Song title';
    const burgerButton = renderElement(this.titleContainer, 'button', ['burger__button']);
    burgerButton.innerHTML = SVG_SPRITE.MORE;

    burgerButton.addEventListener('click', this.showBurgerMenu);
    this.sidebarOverlay = renderElement(this.container, 'div', ['sidebar__overlay']);

    this.sidebarOverlay.addEventListener('click', () => {
      this.store.toggleSideBar();
      this.sidebarOverlay.classList.remove('show');
    });

    this.renderFavoritesButton(titleBox);
  }

  renderFavoritesButton(parentElement: HTMLElement) {
    const btn = document.createElement('button');
    const span = document.createElement('span');
    btn.title = 'Add to favorite';
    span.innerHTML = SVG_SPRITE.FAVORITES;
    btn.classList.add('title__btn');
    span.classList.add('title__btn-star');

    btn.appendChild(span);
    const favorites = window.localStorage.getItem('favorites');
    
    if (favorites) {
      const favoritesArr = window.localStorage.getItem('favorites').split(',');

      if (favoritesArr.includes(this.store.selectedSongId)) {
        btn.classList.toggle('added');
        span.classList.toggle('gold');
      }
    }

    new FavoriteSonsAddOrDelete(btn, this.store).init();

    parentElement.appendChild(btn);
  }

  renderSongContent() {
    this.contentContainer = renderElement(this.container, 'div', ['display__data']);
    this.notesContent = renderElement(this.contentContainer, 'div', ['tab__content']);
    this.notesContent.setAttribute('id', 'data-wrapper');
    this.songRenderer = new RenderSong(this.notesContent, this.song, this.store);
    this.songRenderer.init();
  }

  renderMusicPlayer() {
    const songDuration = this.getSongDuration();
    this.musicPlayerBox = new MusicPlayerBox(this.container, this.store, songDuration);
    this.musicPlayerBox.render();
  }

  getSongDuration() {
    const midi = new Midi(this.midiData);
    return midi.duration;
  }

  renderSideBar() {
    this.sidebar = new Sidebar(this.contentContainer, this.store, this.song.Tracks);
    this.sidebar.render();
  }

  initAudio() {
    this.audioGenerator = new AudioGenerator(this.midiData, this.store);
    this.audioGenerator.init();
  }

  openFullScreenMode() {
    this.parentElement.requestFullscreen();
  }

  showBurgerMenu() {
    // this.overlay.classList.toggle("show");
    this.store.toggleSideBar();
    this.sidebarOverlay.classList.toggle('show');
  }
}
