import { DuoSynth } from 'tone';
import DisplayTab from './DisplayTab';
import renderElement from './helpers/renderElements';
import { SVG_SPRITE } from './helpers/svg_sprites';
import Store, { EVENTS } from './Store';

export default class Sidebar {
  parentElement: HTMLElement;
  sideBarContent: HTMLElement;
  dropDownGithub: HTMLElement;
  functionButtons: HTMLElement;
  extraButtons: HTMLElement;
  fullScreenBtn: HTMLButtonElement;
  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
  }

  render() {
    this.sideBarContent = renderElement(this.parentElement, 'section', ['sidebar']);
    this.functionButtons = renderElement(this.sideBarContent, 'div', ['sidebar__function']);
    this.extraButtons = renderElement(this.sideBarContent, 'div', ['sidebar__extra']);
    this.fullScreenBtn = this.createFullScreenButton();
    this.fullScreenBtn.addEventListener('click', this.openfullScreenMode);
    this.createInstrumentButton();
    this.createMetronomeButton();
    const printBtn =this.createPrintButton();
    printBtn.addEventListener('click', this.printDiv);
  }

  createFullScreenButton() {
    const fullScreen = document.createElement('button');
    fullScreen.className = 'sidebar__button-fullscreen';
    fullScreen.innerHTML = SVG_SPRITE.FULL_SCREEN;
    return this.functionButtons.appendChild(fullScreen);
  }

  createPlayButton() {
    const playButton = document.createElement('button');
    playButton.className = 'sidebar__button-play';
    this.sideBarContent.appendChild(playButton);

    playButton.addEventListener('click', () => this.store.playSong());
  }

  createMetronomeButton() {
    const metronomeButton = renderElement(this.functionButtons, 'button', [
      'sidebar__button-metronome',
    ]);
    metronomeButton.innerHTML = SVG_SPRITE.METRONOME;
  }

  createInstrumentButton() {
    const instrumentButton = document.createElement('button');
    instrumentButton.className = 'sidebar__button-instrument';
    instrumentButton.innerHTML = SVG_SPRITE.GUITAR;
    this.functionButtons.appendChild(instrumentButton);
  }
  createPrintButton() {
    const printButton = renderElement(this.extraButtons, 'button', ['sidebar__button-print']);

    printButton.innerHTML = SVG_SPRITE.PRINTER;
    return printButton;
  }

  openfullScreenMode() {
    const elem = document.getElementById('data-wrapper');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }
  printDiv() { 
    var divContents = document.getElementById("print").innerHTML; 
    var a = window.open('', '', 'height=500, width=500'); 
    a.document.write('<html>'); 
    a.document.write('<body > <h1>Render Title here and Author <br>'); 
    a.document.write(divContents); 
    a.document.write('</body></html>'); 
    a.document.close(); 
    a.print(); 
} 

}
