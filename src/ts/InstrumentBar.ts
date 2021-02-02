import { Track } from '../models/TrackDisplayType';
import renderElement from './helpers/renderElements';
import Store from './Store';
import { INSTRUMENT_ICONS } from './helpers/instrument_icons';

export class InstrumentBar {
  parentElement: HTMLElement;
  overlay: HTMLElement;
  container: HTMLElement;

  store: Store;
  tracks: Track[];

  constructor(parentElement: HTMLElement, store: Store, tracks: Track[]) {
    this.parentElement = parentElement;
    this.store = store;
    this.tracks = tracks;

    this.dispose = this.dispose.bind(this);
    this.selectInstrument = this.selectInstrument.bind(this);
  }

  render() {
    this.overlay = renderElement(document.body, 'div', ['overlay']);
    this.container = renderElement(this.overlay, 'div', ['inst-bar__container']);

    this.overlay.addEventListener('click', this.dispose);
    this.container.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
    });

    this.renderTitle();
    this.renderContent();
  }

  dispose() {
    this.parentElement.style.filter = '';
    document.body.removeChild(this.overlay);
  }

  renderTitle() {
    const title = renderElement(this.container, 'div', ['inst-bar__title']);
    title.textContent = 'Select an instrument';
  }

  renderContent() {
    const wrapper = renderElement(this.container, 'div', ['inst-bar__instrument-wrapper']);
    this.tracks.forEach((track, id) => {
      this.renderInstrument(wrapper, track, id);
    });
  }

  renderInstrument(parentElement: HTMLElement, track: Track, id: number) {
    const instrumentElement = renderElement(parentElement, 'div', ['inst-bar__instrument']);
    if (this.store.selectedInstrumentId === id) {
      this.highlightSelectedInstrument(instrumentElement);
    }
    // console.log('here ' + track.Instrument);
    instrumentElement.dataset.id = id.toString();
    instrumentElement.addEventListener('click', this.selectInstrument);

    const instrumentName = track.Instrument;
    console.log(instrumentName);

    this.renderInstrumentIcon(instrumentElement, instrumentName);
    this.renderInstrumentContent(instrumentElement, track);
  }

  highlightSelectedInstrument(element: HTMLElement) {
    element.classList.add('inst-bar__highlight');
  }

  renderInstrumentIcon(parentElement: HTMLElement, Instrument: string) {
    const element = renderElement(parentElement, 'div', ['inst-bar__instrument-icon']);
    const icon = INSTRUMENT_ICONS[Instrument];
    if(!icon){
      element.innerHTML = INSTRUMENT_ICONS.DEFAULT;
      return;
    }
    element.innerHTML = icon;
   
  }

  renderInstrumentContent(parentElement: HTMLElement, track: Track) {
    const content = renderElement(parentElement, 'div', ['inst-bar__instrument-content']);
    content.textContent = track.Instrument;
  }

  selectInstrument(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const element = target.closest('.inst-bar__instrument') as HTMLElement;
    const id = +element.dataset.id;
    this.store.selectInstrument(id);

    this.dispose();
  }
}
