import renderElement from './helpers/renderElements';
import { SearchOptions } from '../models/SearchOptions';
import { Genre } from '../models/Genre';
import { InstrumentType } from '../models/Instrument';
import { Difficulty } from '../models/Difficulty';
import Store from './Store';

export default class SearchBar {
  parentElement: HTMLElement;
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
