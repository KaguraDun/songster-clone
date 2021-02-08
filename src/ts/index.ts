import '../styles/index.scss';
import Store, { EVENTS } from './Store';
import Page from './Page';
import renderElement from './helpers/renderElements';

const store = new Store();
store.init();


const preloader = document.createElement('div');
preloader.classList.add('preloader');
const preloaderRow = renderElement(preloader, 'div', ['preloader__row']);
const preloaderItem1 = renderElement(preloaderRow, 'div', ['preloader__item']);
const preloaderItem2 = renderElement(preloaderRow, 'div', ['preloader__item']);

const container = document.createElement('div');
container.classList.add('wrapper');
document.body.appendChild(container);
new Page(container,store).render();
document.body.appendChild(preloader);

window.onload = function () {
    window.setTimeout(function() {
    document.body.classList.add('loaded_hiding');
}, 300);
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }




