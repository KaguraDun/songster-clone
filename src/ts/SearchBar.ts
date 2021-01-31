import renderElement from './helpers/renderElements';
import { Genre } from '../models/Genre';
import { InstrumentType } from '../models/Instrument';
import { Difficulty } from '../models/Difficulty';
import Store, { EVENTS } from './Store';
import { SongViewModel } from '../models/SongViewModel';
import { serverUrl } from '../models/Constants';

export default class SearchBar {
  parentElement: HTMLElement;
  wrapper: HTMLElement;
  overlay: HTMLElement;
  songsContainer: HTMLElement;

  textInput: HTMLInputElement;
  instrumentInput: HTMLSelectElement;
  genreInput: HTMLSelectElement;
  difficultyInput: HTMLSelectElement;
  favSongsBtn: HTMLElement;

  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;

    this.dispose = this.dispose.bind(this);
    this.search = this.search.bind(this);
    this.selectSong = this.selectSong.bind(this);
    this.favSongsBtnOnClick = this.favSongsBtnOnClick.bind(this);
  }

  render() {
     this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    document.body.appendChild(this.overlay);

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('search__wrapper');
    this.overlay.appendChild(this.wrapper);

    this.renderCloseIcon();
    this.renderTextInput();
    this.renderOptionsInputs();
    this.renderSearchButton();
  }

  renderCloseIcon() {
    const close = document.createElement('div');
    close.classList.add('search__close-icon', 'icon');
    this.wrapper.appendChild(close);

    close.addEventListener('click', this.dispose);
    this.overlay.addEventListener('click', this.dispose);
    this.wrapper.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
    });
  }

  dispose() {
    this.parentElement.style.filter = '';
    document.body.removeChild(this.overlay);
  }

  renderTextInput() {
    this.textInput = document.createElement('input');
    this.textInput.classList.add('search__text-input');
    this.textInput.placeholder = 'Enter a song...';
    this.wrapper.appendChild(this.textInput);
  }

  renderOptionsInputs() {
    const container = document.createElement('div');
    container.classList.add('options-container');
    this.wrapper.appendChild(container);

    this.favSongsBtn = this.renderFavSongStarBtn(container);
    this.instrumentInput = this.renderOptionSelectAndGet(InstrumentType, 'Instrument', container);
    this.genreInput = this.renderOptionSelectAndGet(Genre, 'Genre', container);
    this.difficultyInput = this.renderOptionSelectAndGet(Difficulty, 'Difficulty', container);
  }

  /**e is enum*/
  renderOptionSelectAndGet(e: any, name: string, parentElement: HTMLElement) {
    const select = document.createElement('select');
    const option = document.createElement('option');
    option.text = name;
    option.selected = true;
    option.disabled = true;
    select.options.add(option);

    for (const value of Object.keys(e)) {
      const option = document.createElement('option');
      option.text = value;
      option.value = value;
      select.options.add(option);
    }
    parentElement.appendChild(select);
    return select;
  }

  renderFavSongStarBtn(container: HTMLElement) {

    const btn = document.createElement('button');
    const span = document.createElement('span');

    span.innerText = '🟊';
    span.classList.add('favorites-star');

    btn.addEventListener('click', this.favSongsBtnOnClick)

    btn.appendChild(span)
    container.appendChild(btn);

    return span;
  }

  favSongsBtnOnClick() {
    this.favSongsBtn.classList.toggle('favorites');
  }

  renderSearchButton() {
    const button = document.createElement('div');
    button.classList.add('search-button', 'icon');
    this.wrapper.appendChild(button);
    button.addEventListener('click', this.search);
    this.wrapper.addEventListener('keypress', this.search);
  }

  async search(e: MouseEvent | KeyboardEvent) {

    if (e instanceof KeyboardEvent && e.key !== 'Enter') return;

    if(this.favSongsBtn.classList.contains('favorites')) {

      const userId = window.localStorage.getItem('user');
      if(!userId) throw new Error()

      const url = `${serverUrl}/favorite-songs/?userId=${userId}`;
      const response = await fetch(url);
      const songs: SongViewModel[] = await response.json();
      this.renderSongList(songs);

    } else {

      const searchOption: any = {
        name: this.textInput.value,
        instrument: this.instrumentInput.selectedOptions[0].value,
        genre: this.genreInput.selectedOptions[0].value,
        difficulty: this.difficultyInput.selectedOptions[0].value,
      };

      const quaryArray = [];
      for (const key in searchOption) {
        const quaryArg = searchOption[key];
        if (!quaryArg || quaryArg.toLowerCase() === key) continue;
        quaryArray.push(`${key}=${quaryArg}`);
      }

      const url = `${serverUrl}/songs/?${quaryArray.join('&')}`;
      const response = await fetch(url);
      const songs: SongViewModel[] = await response.json();
      this.renderSongList(songs);

    }

  }

  renderSongList(songs: SongViewModel[]) {
    if (this.songsContainer) this.wrapper.removeChild(this.songsContainer);
    this.songsContainer = document.createElement('div');
    this.songsContainer.classList.add('songs-container');
    this.wrapper.appendChild(this.songsContainer);

    for (const song of songs) {
      const songElement = document.createElement('div');
      songElement.classList.add('song');
      songElement.dataset.id = song._id;
      this.songsContainer.appendChild(songElement);
      songElement.addEventListener('click', this.selectSong);

      this.renderSongImage(songElement);
      this.renderSongContent(song.name, song.author, songElement);
    }
  }

  selectSong(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const element = target.closest('.song') as HTMLElement;
    const id = element.dataset['id'];
    this.store.selectSong(id);
    setTimeout(this.dispose);
  }

  renderSongImage(parentElement: HTMLElement) {
    const img = document.createElement('div');
    img.classList.add('image');
    parentElement.appendChild(img);
  }

  renderSongContent(name: string, author: string, parentElement: HTMLElement) {
    const content = document.createElement('div');
    content.classList.add('content');
    parentElement.appendChild(content);

    const nameElement = document.createElement('div');
    nameElement.classList.add('content-name');
    nameElement.textContent = name;
    content.appendChild(nameElement);

    const authorElement = document.createElement('div');
    authorElement.classList.add('content-author');
    authorElement.textContent = author;
    content.appendChild(authorElement);
  }
}
