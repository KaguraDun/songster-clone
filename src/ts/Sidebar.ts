import { DuoSynth } from 'tone';
import { Track } from '../models/TrackDisplayType';
import DisplayTab from './DisplayTab';
import renderElement from './helpers/renderElements';
import { SVG_SPRITE } from './helpers/svg_sprites';
import { InstrumentBar } from './InstrumentBar';
import Store, { EVENTS } from './Store';

export default class Sidebar {
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
    fullScreenButton.innerHTML = SVG_SPRITE.FULL_SCREEN;
    fullScreenButton.addEventListener('click',this.openfullScreenMode);
  }

  openfullScreenMode() {
    this.store.openFullScreen();
  }

  renderInstrumentButton(parentElement: HTMLElement) {
    const instrumentButton = renderElement(parentElement,'button',['sidebar__button-instrument']);
    instrumentButton.innerHTML = SVG_SPRITE.GUITAR;
    instrumentButton.addEventListener('click',this.renderInstrumentsBar);
  }

  renderInstrumentsBar() {
    const element = document.body.firstElementChild as HTMLElement
    new InstrumentBar(element,this.store,this.tracks).render();
  }

  // renderInstrumentsBarbbb(tracks: Track[]) {
  //   this.instrumentBar.innerHTML='';
    
  //   tracks.forEach((track,id) => {
  //     console.log(track.Instrument);

  //     const instrumentButton = renderElement(
  //       this.instrumentBar,
  //       'button',
  //       [`instr__bar-${track.Instrument.replace(/ /g, '_')}`],
  //       `${track.Instrument}`,
  //     );
  //     // instrumentButton.innerHTML = // TODO icons from
  //     instrumentButton.dataset['id'] = id.toString();
  //   });
  //   return this.instrumentBar;
  // }

  renderMetronomeButton(parentElement: HTMLElement) {
    const metronomeButton = renderElement(parentElement, 'button', ['sidebar__button-metronome',]);
    metronomeButton.innerHTML = SVG_SPRITE.METRONOME;
  }

  renderPrintButton(parentElement: HTMLElement) {
    const printButton = renderElement(parentElement, 'button', ['sidebar__button-print']);
    printButton.innerHTML = SVG_SPRITE.PRINTER;
    printButton.addEventListener('click',this.onPrintClick);
  }

  onPrintClick() {
    var divContents = document.getElementById('print').innerHTML;
    var a = window.open('', '', 'height=700, width=500');
    a.document.write('<html>');
    a.document.write('<body > <h2>Render Title here and Author <br>');
    a.document.write(`<h6>${divContents}</h6>`);
    a.document.close();
    a.print();
  }
}
