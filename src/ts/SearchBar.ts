import renderElement from './helpers/renderElements';
import { Genre } from '../models/Genre';
import { InstrumentType } from '../models/Instrument';
import { SearchOptions } from '../models/SearchOptions';

enum difficulty {
  begginer = 'Beginner',
  intermidiate = 'Intermidiate',
  advanced = 'Advanced',
}

export default class SearchBar {
  parentElement: HTMLElement;
  searchBarContent: HTMLElement;
  searchDetailsMenu: HTMLElement;
  songListBox: HTMLElement;
  inputName: any;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    this.searchBarContent = document.createElement('div');
    this.searchBarContent.className = 'search__content';
    // searchBarContent.textContent='Search...';
    const searchButton = document.createElement('button');
    searchButton.className = 'search__content-button';

    searchButton.addEventListener('click', () => {
      this.searchBarContent.classList.toggle('open');
      searchButton.classList.toggle('shine');
      overlay.classList.toggle('show');
    });
    // searchBarContent.appendChild(searchButton);
    this.parentElement.append(this.searchBarContent, searchButton);
    const searchBarTitle = document.createElement('div');
    searchBarTitle.textContent = ' Popular songs ';

    searchBarTitle.className = 'search__content-title';
    this.searchBarContent.appendChild(searchBarTitle);
    this.searchDetailsMenu = document.createElement('div');
    this.searchDetailsMenu.className = 'searchForm';
    // this.searchBarContent.appendChild(this.searchDetailsMenu);
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    this.parentElement.append(overlay);

    overlay.addEventListener('click', () => {
      this.searchBarContent.classList.remove('open');
      overlay.classList.remove('show');
      searchButton.classList.remove('shine');
    });

    this.songListBox = document.createElement('div');
    this.songListBox.className = 'song_list';

    // Для теста!
    // const searchForm = renderElement(this.parentElement, 'form', [
    //   'search-form',
    // ]) as HTMLFormElement;

    // searchForm.action = '';
    // searchForm.method = 'get';
    // searchForm.id = 'searchForm';

    this.inputName = renderElement(this.searchBarContent, 'input', [
      'searchForm__input',
    ]) as HTMLInputElement;
    this.inputName.type = 'search';
    this.inputName.placeholder = 'Enter song name';
    this.inputName.name = 'name';

    const inputAuthor = renderElement(this.searchBarContent, 'input', [
      'searchForm__input',
    ]) as HTMLInputElement;
    inputAuthor.type = 'search';
    inputAuthor.placeholder = 'Enter song author';
    inputAuthor.name = 'author';

    
    

    const button = renderElement(
      this.searchBarContent,
      'button',
      ['button-search'],
      'Search',
    ) as HTMLButtonElement;

    button.addEventListener('click', async () => {
      this.makeResponse();
    });

    

    const selectGenre = renderElement(this.searchDetailsMenu, 'select', [
      'searchForm__select',
    ]) as HTMLSelectElement;

    Object.values(Genre)
      .filter((k) => isNaN(Number(k)))
      .forEach((param) => {
        const option = renderElement(selectGenre, 'option', [
          'searchForm__select-option',
        ]) as HTMLOptionElement;
        option.value = param as string;
        option.textContent = param as string;
      });

    const selectInstrument = renderElement(this.searchDetailsMenu, 'select', [
      'searchForm__select',
    ]) as HTMLSelectElement;

    Object.values(InstrumentType).forEach((param) => {
      const option = renderElement(selectInstrument, 'option', [
        'searchForm__select-option',
      ]) as HTMLOptionElement;
      option.value = param as string;
      option.textContent = param as string;
    });

    const selectDifficulty = renderElement(this.searchDetailsMenu, 'select', [
      'searchForm__select',
    ]) as HTMLSelectElement;

    Object.values(difficulty).forEach((param) => {
      const option = renderElement(selectDifficulty, 'option', [
        'searchForm__select-option',
      ]) as HTMLOptionElement;
      option.value = param as string;
      option.textContent = param as string;
    });

    this.searchBarContent.append(this.searchDetailsMenu, this.songListBox);
  }

  showSearchBar() {}

  async makeResponse() {
    const responce = await fetch(
      `http://localhost:3000/songs/?name=${this.inputName.value[0].toUpperCase()}${this.inputName.value
        .substr(1)
        .toLowerCase()}`,
    );

    const songs = await responce.json();

    // console.log(songs);

    const songList = renderElement(this.songListBox, 'ul', []);

    songs.forEach((song: any) => {
      const item = renderElement(songList, 'li', []);
      item.textContent = `${song.name} ${song.author} ${song.difficulty}`;
    });
  }
}
