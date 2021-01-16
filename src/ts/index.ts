import '../styles/index.scss';
import { AudioGenerator } from './AudioGenerator';
import SheetMusicPage from './SheetMusicPage';
import song from '../../public/songs/1.json';
import Store, { EVENTS } from './Store';
import Page from './Page';

const store = new Store();
store.init();

new Page(document.body,store).render();

// const sheetMusicContainer = document.createElement('div');
// sheetMusicContainer.classList.add('sheet-music__container');
// document.body.appendChild(sheetMusicContainer);

// async function start() {
//     const responce = await fetch('http://localhost:3000/songs/:id/?name=Enter%20Sandman');
//     const {midiData, converted} = await responce.json();

//     //const arrayBuffer = new ArrayBuffer(midiData.data);
//     //const midi = new Midi(arrayBuffer);
//     const audio = new AudioGenerator(sheetMusicContainer,midiData.data,store);
//     audio.render();

//     const page = new SheetMusicPage(sheetMusicContainer,converted,store);
//     page.render();
// }
// start();


store.eventEmitter.addEvent(EVENTS.TIME_MARKER_POSITION_CHANGED, () => {
  console.log(store.songTime);
});
