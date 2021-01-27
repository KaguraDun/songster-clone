import Sidebar from './Sidebar';
import Store, { EVENTS } from './Store';
import { AudioGenerator } from './AudioGenerator/AudioGenerator';
import RenderSong from './RenderSong';
import renderElement from './helpers/renderElements';
import MusicPlayerBox from './MusicPlayerBox';
import { Player } from 'tone';
import { SVG_SPRITE } from './helpers/svg_sprites';
import { Song } from '../models/TrackDisplayType';
import { Midi } from '@tonejs/midi';

export default class DisplayTab {
  parentElement: HTMLElement;
  container: HTMLElement;
  titleContainer: HTMLElement;
  contentContainer: HTMLElement;
  notesContent: HTMLElement;

  store: Store;
  songId: string;
  song: Song;
  midiData: ArrayBuffer;

  constructor(parentElement: HTMLElement, store: Store, songId: string) {
    this.parentElement = parentElement;
    this.store = store;
    this.songId = songId;

    this.openFullScreenMode = this.openFullScreenMode.bind(this);
  }

  dispose() {
    this.parentElement.removeChild(this.container);
  }

  async render() {
    this.store.eventEmitter.addEvent(EVENTS.FULL_SCREEN_BUTTON_CLICK,this.openFullScreenMode);

    this.container = renderElement(this.parentElement, 'section', ['display__tab']);
    await this.fetchSong();

    this.renderSongTitle();
    this.renderSongContent();
    this.renderSideBar();
    this.renderMusicPlayer();
    this.initAudio();
  }

  async fetchSong() {
    const responce = await fetch(`http://localhost:3000/songs/id/?id=${this.songId}`);
    const { midiData, converted } = await responce.json();

    this.song = converted;
    this.midiData = midiData.data;
  }

  renderSongTitle() {
    this.titleContainer = renderElement(this.container, 'div', ['title']);
    renderElement(this.titleContainer, 'div', ['title__tab-artist'], this.song.Author);
    const titleBox = renderElement(this.titleContainer, 'div', ['title__box']);
    renderElement(titleBox, 'div', ['title__tab-track'], this.song.Name);
    this.renderFavoritesButton(titleBox);
  }

  renderFavoritesButton(parentElement: HTMLElement) {
    const favButton = renderElement(parentElement, 'button', ['title__tab-fav']);
  }

  renderSongContent() {
    this.contentContainer = renderElement(this.container, 'div', ['display__data']);
    this.notesContent = renderElement(this.contentContainer, 'div', ['tab__content']);
    this.notesContent.setAttribute('id', 'data-wrapper');

    new RenderSong(this.notesContent,this.song,this.store).render();
  }

  renderMusicPlayer() {
    const songDuration = this.getSongDuration();
    new MusicPlayerBox(this.container, this.store,songDuration).render();
  }

  getSongDuration() {
    const midi = new Midi(this.midiData);
    return midi.duration;
  }

  renderSideBar() {
    new Sidebar(this.contentContainer, this.store,this.song.Tracks).render();
  }

  initAudio() {
    new AudioGenerator(this.midiData,this.store).init();
  }

  openFullScreenMode() {
    this.notesContent.requestFullscreen();
  }
}


