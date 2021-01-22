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
  instrumentBar: HTMLElement;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
    this.showInstrumentsBar = this.showInstrumentsBar.bind(this);
  }

  render() {
    this.sideBarContent = renderElement(this.parentElement, 'section', ['sidebar']);
    this.functionButtons = renderElement(this.sideBarContent, 'div', ['sidebar__function']);
    this.extraButtons = renderElement(this.sideBarContent, 'div', ['sidebar__extra']);
    this.fullScreenBtn = this.createFullScreenButton();
    this.fullScreenBtn.addEventListener('click', this.openfullScreenMode);
    const instrButton = this.createInstrumentButton();
    instrButton.addEventListener('click', this.showInstrumentsBar);
    this.instrumentBar = renderElement(this.sideBarContent, 'div', ['instr__bar']);
    this.createMetronomeButton();
    const printBtn = this.createPrintButton();
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
    console.log('button created!');

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
    return this.functionButtons.appendChild(instrumentButton);
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
      // } else if (elem.webkitRequestFullscreen) {
      //   /* Safari */
      //   elem.webkitRequestFullscreen();
      // } else if (elem.msRequestFullscreen) {
      //   /* IE11 */
      //   elem.msRequestFullscreen();
    }
  }

  printDiv() {
    var divContents = document.getElementById('print').innerHTML;
    var a = window.open('', '', 'height=700, width=500');
    a.document.write('<html>');
    a.document.write('<body > <h2>Render Title here and Author <br>');
    a.document.write(`<h6>${divContents}</h6>`);
    // a.document.write('</body></html><font-size="18"');
    a.document.close();
    a.print();
  }

  showInstrumentsBar() {
    console.log('im here');
    this.createInstrumentsBar(this.store.selectedSong, this.store.tracksArray);
  }

  createInstrumentsBar(id: string, array: any) {
    this.instrumentBar.innerHTML='';
    

    array.forEach((element: { Instrument: any }) => {
      console.log(element.Instrument);

      const instrumentButton = renderElement(
        this.instrumentBar,
        'button',
        [`instr__bar-${element.Instrument.replace(/ /g, '_')}`],
        `${element.Instrument}`,
      );
      // instrumentButton.innerHTML = // TODO icons from
      instrumentButton.dataset[`id`] = id;
    });
    return this.instrumentBar;
  }
}
