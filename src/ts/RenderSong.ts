import { Track, Song } from '../models/TrackDisplayType';
import Store, { EVENTS } from './Store';
import { SECTION_SIZE } from '../models/Constants';
import RenderTrack from './RenderTrack';
import renderElement from './helpers/renderElements';

interface TimeMarker {
  element: HTMLElement;
  timer: NodeJS.Timer;
  firstMeasure: HTMLElement;
  lastMeasure: HTMLElement;
  currentMeasure: HTMLElement;
  currentMeasureNum: number;
}

export default class RenderSong {
  parentElement: HTMLElement;
  song: Song;
  store: Store;
  sheetMusicRender: HTMLElement;
  timeMarker: TimeMarker = {
    element: null,
    timer: null,
    firstMeasure: null,
    lastMeasure: null,
    currentMeasure: null,
    currentMeasureNum: 1,
  };
  measureDuration: number;
  numberElementsPerRow: number;
  track: Track;
  trackRenderer: RenderTrack;

  constructor(parentElement: HTMLElement, song: Song, store: Store) {
    this.parentElement = parentElement;
    this.song = song;
    this.store = store;
    this.track = this.song.Tracks[0];
    this.sheetMusicRender;
    this.timeMarker;
    this.measureDuration;
    this.numberElementsPerRow;
    this.playMusicTrack = this.playMusicTrack.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.selectMeasure = this.selectMeasure.bind(this);
    this.setTimeMarkerPosition = this.setTimeMarkerPosition.bind(this);
  }

  addBitrate(parentElement: HTMLElement) {
    const bitrateContainer = document.createElement('div');
    bitrateContainer.classList.add('sheet-music__bitrate');
    bitrateContainer.textContent = `Bpm = ${Math.trunc(this.track.Bpm)}`;
    bitrateContainer.setAttribute('id', 'print-bitrate');

    parentElement.appendChild(bitrateContainer);
  }

  flushCss(element: HTMLElement) {
    // By reading the offsetHeight property, we are forcing
    // the browser to flush the pending CSS changes (which it
    // does to ensure the value obtained is accurate).
    element.offsetHeight;
  }

  moveTimeMarkerToFirstMeasure() {
    this.timeMarker.currentMeasureNum = 1;
    this.timeMarker.firstMeasure.scrollIntoView({ block: 'center', behavior: 'smooth' });

    this.timeMarker.element.style.transition = 'none';
    this.timeMarker.element.style.left = `${this.timeMarker.firstMeasure.offsetLeft}px`;
    this.timeMarker.element.style.top = '0';

    this.store.endOfSong();
    this.flushCss(this.timeMarker.element);

    clearInterval(this.timeMarker.timer);
  }

  moveTimeMarkerToBeginOfRow() {
    this.timeMarker.element.style.transition = 'none';
    this.timeMarker.element.style.left = `${this.timeMarker.firstMeasure.offsetLeft}px`;
    // apply the "transition: none" and "left: Xpx" rule immediately
    this.flushCss(this.timeMarker.element);
    // restore animation
    this.timeMarker.element.style.transition = `left ${this.measureDuration}s linear`;
  }

  moveTimeMarker() {
    const rowNum = Math.ceil(this.timeMarker.currentMeasureNum / this.numberElementsPerRow) - 1;

    const multipler =
      this.timeMarker.currentMeasureNum % this.numberElementsPerRow || this.numberElementsPerRow;
    const leftShift = SECTION_SIZE.width * multipler + this.timeMarker.firstMeasure.offsetLeft;
    const lasMeasureNum = Number(this.timeMarker.lastMeasure.dataset.measureId) + 1;

    if (this.timeMarker.currentMeasureNum > lasMeasureNum) {
      this.moveTimeMarkerToFirstMeasure();
      return;
    }

    if (multipler === 1) {
      this.moveTimeMarkerToBeginOfRow();
    }

    this.timeMarker.element.style.transition = `left ${this.measureDuration}s linear`;
    this.timeMarker.element.style.top = `${SECTION_SIZE.height * rowNum}px`;
    this.timeMarker.element.style.left = `${leftShift}px`;

    this.timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });

    this.timeMarker.currentMeasureNum += 1;
  }

  stopMusicTrack() {
    this.timeMarker.currentMeasureNum -= 1;

    const previousMeasure = this.sheetMusicRender.children[
      this.timeMarker.currentMeasureNum
    ] as HTMLElement;

    this.timeMarker.element.style.transition = 'none';
    this.timeMarker.element.style.left = `${previousMeasure.offsetLeft}px`;

    this.flushCss(this.timeMarker.element);
    clearInterval(this.timeMarker.timer);

    this.store.setSongTime(Number(previousMeasure.dataset.time));
  }

  playMusicTrack() {
    if (this.store.playMusic) {
      // Call function immidiatly to avoid first delay
      this.moveTimeMarker();
      this.timeMarker.timer = setInterval(() => this.moveTimeMarker(), this.measureDuration * 1000);
    } else {
      this.stopMusicTrack();
    }
  }

  addTimeMarker(parentElement: HTMLElement): HTMLElement {
    const timeMarker = document.createElement('div');
    const firstElementPosition = parentElement.firstElementChild as HTMLElement;

    timeMarker.classList.add('sheet-music__time-marker');
    timeMarker.style.height = `${SECTION_SIZE.height}px`;
    timeMarker.style.left = `${firstElementPosition.offsetLeft}px`;

    parentElement.prepend(timeMarker);

    return timeMarker;
  }

  selectMeasure(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const closestToSvg = target.closest('svg') as SVGSVGElement;

    if (!closestToSvg) return;

    const selectedMeasure = closestToSvg.parentElement;
    this.changeTimeMarkerPosition(selectedMeasure);
  }

  changeTimeMarkerPosition(selectedMeasure: HTMLElement) {
    const currentTime = Number(selectedMeasure.dataset.time);
    const measureID = Number(selectedMeasure.dataset.measureId);
    const rowNum = Math.floor(measureID / this.numberElementsPerRow);
    const timeMarkerTop = rowNum * SECTION_SIZE.height;

    this.timeMarker.element.style.left = `${selectedMeasure.offsetLeft}px`;
    this.timeMarker.element.style.top = `${timeMarkerTop}px`;

    this.timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    this.timeMarker.currentMeasureNum = Number(selectedMeasure.dataset.measureId) + 1;

    if (timeMarkerTop > this.timeMarker.lastMeasure.offsetTop) {
      this.timeMarker.element.style.top = `${this.timeMarker.lastMeasure.offsetTop}px`;
    }

    if (this.store.playMusic) {
      this.timeMarker.element.style.transition = 'none';
      this.flushCss(this.timeMarker.element);
      clearInterval(this.timeMarker.timer);
      this.playMusicTrack();
    }

    this.store.setSongTime(currentTime);
  }

  setTimeMarkerPosition() {
    const measureID = Math.floor(this.store.songTimeMiliSeconds / (this.measureDuration * 1000));
    const selectedMeasure = this.sheetMusicRender.children[measureID + 1] as HTMLElement;

    this.changeTimeMarkerPosition(selectedMeasure);
  }

  changeTrack() {
    const currentMeasure = this.sheetMusicRender.children[
      this.timeMarker.currentMeasureNum
    ] as HTMLElement;

    const timeMarkerPositon = {
      left: this.timeMarker.element.offsetLeft,
      top: this.timeMarker.element.offsetTop,
    };

    const id = this.store.selectedInstrumentId;
    this.track = this.song.Tracks[id];
    this.render();

    this.timeMarker.element.style.left = `${timeMarkerPositon.left}px`;
    this.timeMarker.element.style.top = `${timeMarkerPositon.top}px`;

    this.store.setSongTime(Number(currentMeasure.dataset.time));
  }

  init() {
    this.store.eventEmitter.addEvent(EVENTS.SELECT_INSTRUMENT, this.changeTrack);
    this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK, () => this.playMusicTrack());
    this.store.eventEmitter.addEvent(EVENTS.PLAYER_PROGRESS_BAR_CLICK, this.setTimeMarkerPosition);

    this.render();
  }

  dispose() {
    this.store.eventEmitter.removeEvent(EVENTS.SELECT_INSTRUMENT, this.changeTrack);
    this.store.eventEmitter.removeEvent(EVENTS.PLAY_BUTTON_CLICK, () => this.playMusicTrack());
    this.store.eventEmitter.removeEvent(
      EVENTS.PLAYER_PROGRESS_BAR_CLICK,
      this.setTimeMarkerPosition,
    );

    this.trackRenderer.dispose();
  }

  render() {
    this.parentElement.innerHTML = '';
    this.addBitrate(this.parentElement);

    this.sheetMusicRender = renderElement(this.parentElement, 'div', ['sheet-music__render']);
    this.sheetMusicRender.setAttribute('id', 'print');
    this.sheetMusicRender.addEventListener('click', this.selectMeasure);

    const timeSignature = `${this.track.Size.Count}/${this.track.Size.Per}`;
    const quarterDuration = 60 / this.track.Bpm;

    this.measureDuration = (4 * quarterDuration * this.track.Size.Count) / this.track.Size.Per;
    this.numberElementsPerRow = Math.floor(this.parentElement.clientWidth / SECTION_SIZE.width);

    this.trackRenderer = new RenderTrack(
      this.track.Measures,
      timeSignature,
      this.track.Clef,
      this.sheetMusicRender as HTMLDivElement,
    );

    this.trackRenderer.render();

    this.timeMarker.element = this.addTimeMarker(this.sheetMusicRender);
    this.timeMarker.firstMeasure = this.sheetMusicRender.children[1] as HTMLElement;
    this.timeMarker.lastMeasure = this.sheetMusicRender.lastElementChild as HTMLElement;
    this.timeMarker.currentMeasure = this.timeMarker.firstMeasure;
  }
}
