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

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    const searchBarContent = document.createElement('div');
    searchBarContent.className = 'search__content';
    // searchBarContent.textContent='Search...';
    const searchButton = document.createElement('button');
    searchButton.className = 'search__content-button';
    searchBarContent.appendChild(searchButton);
    this.parentElement.appendChild(searchBarContent);

    // Для теста!
    // const searchForm = renderElement(this.parentElement, 'form', [
    //   'search-form',
    // ]) as HTMLFormElement;

    // searchForm.action = '';
    // searchForm.method = 'get';
    // searchForm.id = 'searchForm';

    const inputName = renderElement(this.parentElement, 'input', [
      'searchForm__input',
    ]) as HTMLInputElement;
    inputName.type = 'search';
    inputName.placeholder = 'Enter song name';
    inputName.name = 'name';

    const inputAuthor = renderElement(this.parentElement, 'input', [
      'searchForm__input',
    ]) as HTMLInputElement;
    inputAuthor.type = 'search';
    inputAuthor.placeholder = 'Enter song author';
    inputAuthor.name = 'author';

    const button = renderElement(
      this.parentElement,
      'button',
      ['button-search'],
      'Search',
    ) as HTMLButtonElement;

    button.addEventListener('click', async () => {
      const responce = await fetch(`http://localhost:3000/songs`);

      const songs = await responce.json();

      console.log(songs);

      const songList = renderElement(this.parentElement, 'ul', []);

      songs.forEach((song: any) => {
        const item = renderElement(songList, 'li', []);
        item.textContent = `${song.name} ${song.author} ${song.difficulty}`;
      });
    });

    const selectGenre = renderElement(this.parentElement, 'select', [
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

    const selectInstrument = renderElement(this.parentElement, 'select', [
      'searchForm__select',
    ]) as HTMLSelectElement;

    Object.values(InstrumentType).forEach((param) => {
      const option = renderElement(selectInstrument, 'option', [
        'searchForm__select-option',
      ]) as HTMLOptionElement;
      option.value = param as string;
      option.textContent = param as string;
    });

    const selectDifficulty = renderElement(this.parentElement, 'select', [
      'searchForm__select',
    ]) as HTMLSelectElement;

    Object.values(difficulty).forEach((param) => {
      const option = renderElement(selectDifficulty, 'option', [
        'searchForm__select-option',
      ]) as HTMLOptionElement;
      option.value = param as string;
      option.textContent = param as string;
    });
  }

  showSearchBar() {}
}
