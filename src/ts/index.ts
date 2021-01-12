import '../styles/index.scss';
import { AudioGenerator } from './AudioGenerator';
import SheetMusicPage from './SheetMusicPage';
import * as path from 'path';
import * as fs from 'fs';

const sheetMusicContainer = document.createElement('div');
sheetMusicContainer.classList.add('sheet-music__container');
document.body.append(sheetMusicContainer);


const container = document.createElement('div');
sheetMusicContainer.appendChild(container);

const input = document.createElement('input');
container.appendChild(input);
input.type = 'file';
const reader = new FileReader();
input.onchange = onChange;

function onChange() {
    const file = input.files[0];
    reader.readAsArrayBuffer(file);
    reader.onload = onFileLoaded;
}

function onFileLoaded() {
    const midiData = reader.result;
    if (typeof midiData !== 'string') {
        const generator = new AudioGenerator(container,midiData);
        generator.render();
    }
}

const sheetMusicPage = new SheetMusicPage(sheetMusicContainer);
sheetMusicPage.render();
