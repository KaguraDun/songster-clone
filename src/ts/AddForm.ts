import { TickSignal } from 'tone/build/esm/core/clock/TickSignal';
import { Difficulty } from '../models/Difficulty';
import { Genre } from '../models/Genre';
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
  dropArea: HTMLElement;
  text: HTMLElement;
  fileName: string;
  file: File;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.renderForm = this.renderForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.activeArea = this.activeArea.bind(this);
    this.formContainer;
    this.formOverlay;
    this.formContainer;
    this.dropArea;
    this.text;
    this.fileName;
    this.file;
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

    this.renderUploadForm(form);

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

  renderUploadForm(parentElement: HTMLElement) {
    this.dropArea = renderElement(parentElement, 'div', ['drop-area']);
    this.text = renderElement(this.dropArea, 'div', [], 'Drop your file here');
    this.dropArea.innerHTML = SVG_SPRITE.UPLOAD;

    const file = this.renderInput(this.dropArea, 'input', 'Upload the file', 'file');
    file.classList.add('drop-area__input');

    // document.querySelectorAll('.drop-area__input').forEach((inputElement) => {
    const dropAreaElement = file.closest('.drop-area');

    dropAreaElement.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropAreaElement.classList.add('drop-area__over');
    });

    ['dragleave', 'dragend'].forEach((type) => {
      dropAreaElement.addEventListener(type, (e) => {
        dropAreaElement.classList.remove('drop-area__over');
      });
    });

    dropAreaElement.addEventListener('drop', (e: DragEvent) => {
      this.dropHandler(e);
      // this.changeDropAreaView();
    });
    // });
  }

  // changeDropAreaView() {
  //   this.dropArea.innerHTML = SVG_SPRITE.DONE;
  //   this.text = renderElement(this.dropArea, 'div', [], this.fileName);
  // }

  dropHandler(ev: DragEvent) {
    // console.log('File(s) dropped');
    ev.preventDefault();
    // console.log(ev.dataTransfer.items);
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        // console.log(ev.dataTransfer.items[i].kind);
        if (ev.dataTransfer.items[i].kind === 'file') {
          this.file = ev.dataTransfer.items[i].getAsFile();
          // console.log(this.file);
          this.fileName = `${this.file.name}`;
          // console.log('... file[' + i + '].name = ' + file.name);
          // console.log(this.fileName);
          this.upload(this.file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        this.fileName = `${ev.dataTransfer.files[i].name}`;
        // console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        console.log(this.fileName);
      }
    }
  }
  upload(file: File) {
    var xhr = new XMLHttpRequest();

    // обработчик для отправки
    xhr.upload.onprogress = function (event) {
      console.log(event.loaded + ' / ' + event.total);
    };

    // обработчики успеха и ошибки
    // если status == 200, то это успех, иначе ошибка
    xhr.onload = xhr.onerror = function () {
      if (this.status == 200) {
        console.log('success');
      } else {
        console.log('error ' + this.status);
      }
    };

    xhr.open('POST', 'upload', true);
    xhr.send(file);
  }

  activeArea() {
    this.dropArea.classList.add('.drop-area__over');
  }
}
