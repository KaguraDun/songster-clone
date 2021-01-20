import renderElement from './helpers/renderElements';
import { SearchOptions } from '../models/SearchOptions';
import { Genre } from '../models/Genre';
import { InstrumentType } from '../models/Instrument';
import { Difficulty } from '../models/Difficulty';
import Store from './Store';

export default class SearchBar {
  parentElement: HTMLElement;
  searchBarContent: HTMLElement;
  searchDetailsMenu: HTMLElement;
  songListBox: HTMLElement;
  inputName: any;
  wrapper: HTMLElement;
  overlay: HTMLElement;
  textInput: HTMLInputElement;
  instrumentInput: HTMLSelectElement;
  genreInput: HTMLSelectElement;
  difficultyInput: HTMLSelectElement;
  store: Store


  constructor(parentElement: HTMLElement,store: Store) {
    this.parentElement = parentElement;
    this.store = store;

    this.dispose = this.dispose.bind(this);
    this.search = this.search.bind(this);
  }

  render() {

    // this.searchBarContent = document.createElement('div');
    // this.searchBarContent.className = 'search__content';
    // // searchBarContent.textContent='Search...';
    // const searchButton = document.createElement('button');
    // searchButton.className = 'search__content-button';

    // searchButton.addEventListener('click', () => {
    //   this.searchBarContent.classList.toggle('open');
    //   searchButton.classList.toggle('shine');
    //   overlay.classList.toggle('show');
    // });
    // // searchBarContent.appendChild(searchButton);
    // this.parentElement.append(this.searchBarContent, searchButton);
    // const searchBarTitle = document.createElement('div');
    // searchBarTitle.textContent = ' Popular songs ';

    // searchBarTitle.className = 'search__content-title';
    // this.searchBarContent.appendChild(searchBarTitle);
    // this.searchDetailsMenu = document.createElement('div');
    // this.searchDetailsMenu.className = 'searchForm';
    // // this.searchBarContent.appendChild(this.searchDetailsMenu);
    // const overlay = document.createElement('div');
    // overlay.className = 'overlay';
    // this.parentElement.append(overlay);

    // overlay.addEventListener('click', () => {
    //   this.searchBarContent.classList.remove('open');
    //   overlay.classList.remove('show');
    //   searchButton.classList.remove('shine');
    // });

    // this.songListBox = document.createElement('div');
    // this.songListBox.className = 'song_list';

    // // Для теста!
    // // const searchForm = renderElement(this.parentElement, 'form', [
    // //   'search-form',
    // // ]) as HTMLFormElement;

    // // searchForm.action = '';
    // // searchForm.method = 'get';
    // // searchForm.id = 'searchForm';

    // this.inputName = renderElement(this.searchBarContent, 'input', [
    //   'searchForm__input',
    // ]) as HTMLInputElement;
    // this.inputName.type = 'search';
    // this.inputName.placeholder = 'Enter song name';
    // this.inputName.name = 'name';

    // const inputAuthor = renderElement(this.searchBarContent, 'input', [
    //   'searchForm__input',
    // ]) as HTMLInputElement;
    // inputAuthor.type = 'search';
    // inputAuthor.placeholder = 'Enter song author';
    // inputAuthor.name = 'author';

    
    

    // const button = renderElement(
    //   this.searchBarContent,
    //   'button',
    //   ['button-search'],
    //   'Search',
    // ) as HTMLButtonElement;

    // button.addEventListener('click', async () => {
    //   this.makeResponse();
    // });

    

    // const selectGenre = renderElement(this.searchDetailsMenu, 'select', [
    //   'searchForm__select',
    // ]) as HTMLSelectElement;

    // Object.values(Genre)
    //   .filter((k) => isNaN(Number(k)))
    //   .forEach((param) => {
    //     const option = renderElement(selectGenre, 'option', [
    //       'searchForm__select-option',
    //     ]) as HTMLOptionElement;
    //     option.value = param as string;
    //     option.textContent = param as string;
    //   });

    // const selectInstrument = renderElement(this.searchDetailsMenu, 'select', [
    //   'searchForm__select',
    // ]) as HTMLSelectElement;

    // Object.values(InstrumentType).forEach((param) => {
    //   const option = renderElement(selectInstrument, 'option', [
    //     'searchForm__select-option',
    //   ]) as HTMLOptionElement;
    //   option.value = param as string;
    //   option.textContent = param as string;
    // });

    // const selectDifficulty = renderElement(this.searchDetailsMenu, 'select', [
    //   'searchForm__select',
    // ]) as HTMLSelectElement;

    this.parentElement.style.filter = 'blur(0.3em)';

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
    close.classList.add('search__close-icon');
    this.wrapper.appendChild(close);


    close.addEventListener('click',this.dispose);
    this.overlay.addEventListener('click',this.dispose);
    this.wrapper.addEventListener('click',(e:MouseEvent) => {
      e.stopPropagation();
    });

    this.searchBarContent.append(this.searchDetailsMenu, this.songListBox);
  }


  // showSearchBar() {}

  // async makeResponse() {
  //   const responce = await fetch(
  //     `http://localhost:3000/songs/?name=${this.inputName.value[0].toUpperCase()}${this.inputName.value
  //       .substr(1)
  //       .toLowerCase()}`,
  //   );

  //   const songs = await responce.json();

  //   // console.log(songs);

  //   const songList = renderElement(this.songListBox, 'ul', []);

  //   songs.forEach((song: any) => {
  //     const item = renderElement(songList, 'li', []);
  //     item.textContent = `${song.name} ${song.author} ${song.difficulty}`;
  //   });

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

      this.instrumentInput = this.renderOptionSelectAndGet(InstrumentType, 'Instrument', container);
      this.genreInput = this.renderOptionSelectAndGet(Genre, 'Genre', container);
      this.difficultyInput = this.renderOptionSelectAndGet(Difficulty,'Difficulty',container);
  }

  /**e is enum*/
  renderOptionSelectAndGet(e:any, name:string, parentElement: HTMLElement) {
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

  renderSearchButton() {
    const button = document.createElement('button');
    button.textContent = 'Search';
    this.wrapper.appendChild(button);
    button.addEventListener('click',this.search);
  }

  search() {
    const searchOption: any = {
     name:  this.textInput.value,
     instrument: this.instrumentInput.selectedOptions[0].value,
     genre: this.genreInput.selectedOptions[0].value,
     difficulty: this.difficultyInput.selectedOptions[0].value,
    }

    const quaryArray = [];
    for (const key in searchOption) {
        const quaryArg = searchOption[key];
        if(!quaryArg || quaryArg.toLowerCase() === key) continue;
        quaryArray.push(`${key}=${quaryArg}`);
    }
    const url = `http://localhost:3000/songs/?${quaryArray.join('&')}`;
    console.log(url);

  }
}
