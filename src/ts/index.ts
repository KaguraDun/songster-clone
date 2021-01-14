import '../styles/index.scss';
import { AudioGenerator } from './AudioGenerator';
import SheetMusicPage from './SheetMusicPage';
import * as path from 'path';
import * as fs from 'fs';
import song from '../../public/songs/1.json';
import { Track } from '../models/TrackDisplayType';
import { Midi } from '@tonejs/midi';
import Store, { EVENTS } from './Store';

const store = new Store();
store.init();

const sheetMusicContainer = document.createElement('div');
sheetMusicContainer.classList.add('sheet-music__container');
document.body.appendChild(sheetMusicContainer);

async function start() {
    const responce = await fetch('http://localhost:3000/songs/:id/?name=Enter%20Sandman');
    const {midiData, converted} = await responce.json();

    //const arrayBuffer = new ArrayBuffer(midiData.data);
    //const midi = new Midi(arrayBuffer);
    const audio = new AudioGenerator(sheetMusicContainer,midiData.data,store);
    audio.render();

    const page = new SheetMusicPage(sheetMusicContainer,converted,store);
    page.render();
}
start();

// const sheetMusicPage = new SheetMusicPage(sheetMusicContainer);
// const track: Track = song.Tracks[0];
// const sheetMusicPage = new SheetMusicPage(sheetMusicContainer, song, store);
// sheetMusicPage.render();

store.eventEmitter.addEvent(EVENTS.TIME_MARKER_POSITION_CHANGED, () => {
  console.log(store.songTime);
});
