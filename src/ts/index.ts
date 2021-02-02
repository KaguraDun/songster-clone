import '../styles/index.scss';
import Store, { EVENTS } from './Store';
import Page from './Page';

const store = new Store();
store.init();

const container = document.createElement('div');
container.classList.add('wrapper');
document.body.appendChild(container);
new Page(container,store).render();
