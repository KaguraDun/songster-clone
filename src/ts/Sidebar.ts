import { DuoSynth } from 'tone';
import { Track } from '../models/TrackDisplayType';
import DisplayTab from './DisplayTab';
import renderElement from './helpers/renderElements';
import { SVG_SPRITE } from './helpers/svg_sprites';
import { InstrumentBar } from './InstrumentBar';
import Store, { EVENTS } from './Store';

export default class Sidebar {
  renderInstrumentsButton() {
      throw new Error("Method not implemented.");
  }
  parentElement: HTMLElement;
  container: HTMLElement;
  functionButtons: HTMLElement;
  extraButtons: HTMLElement;

  store: Store;
  tracks: Track[];

  constructor(parentElement: HTMLElement, store: Store, tracks: Track[]) {
    this.parentElement = parentElement;
    this.store = store;
    this.tracks = tracks;

    this.renderInstrumentsBar = this.renderInstrumentsBar.bind(this);
    this.openfullScreenMode = this.openfullScreenMode.bind(this);
    this.onPrintClick = this.onPrintClick.bind(this);
    this.toggleMetronome = this.toggleMetronome.bind(this);
  }

  dispose() {
    
  }

  render() {
    this.container = renderElement(this.parentElement, 'section', ['sidebar']);
    this.renderFunctionButtons();
    this.renderExtraButtons();
  }

  renderFunctionButtons() {
    this.functionButtons = renderElement(this.container, 'div', ['sidebar__function']);
    this.renderFullScreenButton(this.functionButtons);
    this.renderInstrumentButton(this.functionButtons);
    this.renderMetronomeButton(this.functionButtons);
  }

  renderExtraButtons() {
    this.extraButtons = renderElement(this.container, 'div', ['sidebar__extra']);
    this.renderPrintButton(this.extraButtons);
  }

  renderFullScreenButton(parentElement: HTMLElement) {
    const fullScreenButton = renderElement(parentElement,'button',['sidebar__button-fullscreen']);
    fullScreenButton.title = 'Full Screen Mode';
    fullScreenButton.innerHTML = SVG_SPRITE.FULL_SCREEN;
    fullScreenButton.addEventListener('click',this.openfullScreenMode);
  }

  openfullScreenMode() {
    this.store.openFullScreen();
  }

  renderInstrumentButton(parentElement: HTMLElement) {
    const instrumentButton = renderElement(parentElement,'button',['sidebar__button-instrument']);
    instrumentButton.title = 'Choose instrument';
    instrumentButton.innerHTML = SVG_SPRITE.GUITAR;
    instrumentButton.addEventListener('click',this.renderInstrumentsBar);
  }

  renderInstrumentsBar() {
    const element = document.body.firstElementChild as HTMLElement
    new InstrumentBar(element,this.store,this.tracks).render();
  }

  
  renderMetronomeButton(parentElement: HTMLElement) {
    const metronomeButton = renderElement(parentElement, 'button', ['sidebar__button-metronome',]);
    metronomeButton.innerHTML = SVG_SPRITE.METRONOME;
    metronomeButton.addEventListener('click',this.toggleMetronome);
  }

  toggleMetronome(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const button = target.closest('.sidebar__button-metronome') as HTMLElement;
    button.classList.toggle('active');
    this.store.toggleMetronome();
  }

  renderPrintButton(parentElement: HTMLElement) {
    const printButton = renderElement(parentElement, 'button', ['sidebar__button-print']);
    printButton.title = 'Print the document';
    printButton.innerHTML = SVG_SPRITE.PRINTER;
    printButton.addEventListener('click',this.onPrintClick);
  }

  onPrintClick() {
    const artistName = document.getElementById('print_artist').innerHTML;
    const songTitle = document.getElementById('song_title').innerHTML;
    const divContents = document.getElementById('print').innerHTML;
    const bit = document.getElementById('print-bitrate').innerHTML;
    // const a = window.open('',  'height=1200, width=900');
    const a = window.open('', '', 'height=1200, width=900');
    a.document.write('<html>');
    a.document.write(`<body> <h1 style="text-align:center">${artistName}`);
    a.document.write(`<body> <h2 style="text-align:center">${songTitle}`);
    a.document.write(`<body> <h4>${bit}`)
    a.document.write(`<p style="font-size: 14px">${divContents}`);
    a.document.close();
    a.print();
  }
}
