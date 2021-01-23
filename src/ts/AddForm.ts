import { Difficulty } from '../models/Difficulty';
import { Genre } from '../models/Genre';
import { InstrumentType } from '../models/Instrument';
import renderElement from './helpers/renderElements';
import { SVG_SPRITE } from './helpers/svg_sprites';

const SHOW = '--show';

export default class AddForm {
  parentElement: HTMLElement;
  formContainer: HTMLElement;
  formOverlay: HTMLElement;
  instrumentInput: HTMLSelectElement;
  genreInput: HTMLSelectElement;
  difficultyInput: HTMLSelectElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.renderForm = this.renderForm.bind(this);
    this.hideForm = this.hideForm.bind(this);

    this.formContainer;
    this.formOverlay;
    this.formContainer;
  }

  renderInput(parentElement: HTMLElement, name: string, labelText: string, type?: string) {
    const label = renderElement(parentElement, 'label', [], labelText) as HTMLLabelElement;
    label.htmlFor = name;
    const input = renderElement(parentElement, 'input', []) as HTMLInputElement;
    input.name = name;
    input.type = type;
    input.required = true;
    return input;
  }

  render() {
    this.formContainer = renderElement(this.parentElement, 'div', ['wrapper-user__form-container']);
    this.formOverlay = renderElement(this.parentElement, 'div', ['wrapper-user__form-overlay']);

    this.formOverlay.addEventListener('click', this.hideForm);

    const buttonAdd = renderElement(this.parentElement, 'button', ['wrapper-user-login']);
    buttonAdd.addEventListener('click', this.renderForm);
    buttonAdd.title = 'Add song';

    buttonAdd.innerHTML = SVG_SPRITE.ADD;
  }

  renderForm() {
    this.formOverlay.classList.add(SHOW);
    this.formContainer.classList.add(SHOW);
    this.formContainer.innerHTML = '';
    const form = renderElement(this.formContainer, 'form', ['form-add']) as HTMLFormElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
    });

    const name = this.renderInput(form, 'name', 'Song Title', 'text');
    name.setAttribute('value', 'Enter Song title...');

    const nameError = renderElement(form, 'div', ['form-add__name-error']);
    nameError.textContent = '';

    name.addEventListener('focus', () => {
      name.removeAttribute('value');
    });

    const container = renderElement(form, 'div', ['options-container']);

    this.instrumentInput = this.renderOptionSelectAndGet(InstrumentType, 'Instrument', container);
    this.genreInput = this.renderOptionSelectAndGet(Genre, 'Genre', container);
    this.difficultyInput = this.renderOptionSelectAndGet(Difficulty, 'Difficulty', container);

    const authorTitle = renderElement(form, 'div', ['author__title']);
    authorTitle.innerText = 'Author';
    const author = renderElement(form, 'textarea', ['input__author']);

    author.setAttribute('value', 'Enter the author...');
    author.innerText = 'Enter the author...';
    author.addEventListener('focus', () => {
      author.textContent = '';
    });
    const authorError = renderElement(form, 'div', ['form-add__name-error']);
    authorError.textContent = '';

  
    const buttonContainer = renderElement(form, 'div', ['form-add__button-container']);
    const buttonSubmit = renderElement(buttonContainer, 'button', ['button-submit'], 'Submit');

    const buttonCancel = renderElement(buttonContainer, 'button', ['button-cancel'], 'Cancel');
    buttonCancel.addEventListener('click', this.hideForm);

   
  }

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


  hideForm() {
    this.formOverlay.classList.remove(SHOW);
    this.formContainer.classList.remove(SHOW);
  }
}
