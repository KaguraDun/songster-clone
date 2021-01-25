import { Track, Song } from '../models/TrackDisplayType';
import Store, { EVENTS } from './Store';
import { SECTION_SIZE } from '../models/Constants';
import RenderTrack from './RenderTrack';

interface TimeMarker {
  element: HTMLDivElement;
  timer: NodeJS.Timer;
  firstMeasure: HTMLDivElement;
  lastMeasure: HTMLDivElement;
  currentMeasureNum: number;
}

export default class RenderSong {
  parentElement: HTMLElement;
  song: Song;
  store: Store;
  sheetMusicRender: HTMLDivElement;
  timeMarker: TimeMarker = {
    element: null,
    timer: null,
    firstMeasure: null,
    lastMeasure: null,
    currentMeasureNum: 1,
  };
  measureDuration: number;
  track: Track;

  constructor(parentElement: HTMLElement, song: Song, store: Store) {
    this.parentElement = parentElement;
    this.song = song;
    this.store = store;
    this.track = this.song.Tracks[0];
    this.sheetMusicRender;
    this.timeMarker;
    this.measureDuration;
    this.playMusicTrack = this.playMusicTrack.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.changeTimeMarkerPosition = this.changeTimeMarkerPosition.bind(this);
  }

  addBitrate(parentElement: HTMLElement) {
    const bitrateContainer = document.createElement('div');
    bitrateContainer.classList.add('sheet-music__bitrate');
    bitrateContainer.textContent = `Bpm = ${Math.trunc(this.track.Bpm)}`;

    parentElement.appendChild(bitrateContainer);
  }

  flushCss(element: HTMLDivElement) {
    // By reading the offsetHeight property, we are forcing
    // the browser to flush the pending CSS changes (which it
    // does to ensure the value obtained is accurate).
    element.offsetHeight;
  }

  moveTimeMarkerToBeginOfRow() {
    this.timeMarker.element.style.transition = 'none';
    this.timeMarker.element.style.left = this.timeMarker.firstMeasure.offsetLeft + 'px';
    // apply the "transition: none" and "left: Xpx" rule immediately
    this.flushCss(this.timeMarker.element);
    // restore animation
    this.timeMarker.element.style.transition = `left ${this.measureDuration}s linear`;
  }

  moveTimeMarker(timeMarker: TimeMarker) {
    const lastMeasureID = Number(timeMarker.lastMeasure.dataset.measureId);

    if (timeMarker.currentMeasureNum > lastMeasureID + 1) {
      timeMarker.element.style.left = `${timeMarker.firstMeasure.offsetLeft}px`;
      timeMarker.element.style.top = '0';

      this.store.endOfSong();
      clearInterval(this.timeMarker.timer);
      return;
    }

    const numberElementsPerRow = Math.floor(this.parentElement.clientWidth / SECTION_SIZE.width);
    const rowNum = Math.ceil(timeMarker.currentMeasureNum / numberElementsPerRow) - 1;

    const multipler = timeMarker.currentMeasureNum % numberElementsPerRow || numberElementsPerRow;
    const leftShift = SECTION_SIZE.width * multipler + timeMarker.firstMeasure.offsetLeft;

    if (multipler === 1) {
      this.moveTimeMarkerToBeginOfRow();
      this.timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    timeMarker.element.style.top = `${SECTION_SIZE.height * rowNum}px`;
    timeMarker.element.style.left = `${leftShift}px`;

    timeMarker.currentMeasureNum = timeMarker.currentMeasureNum + 1;
  }

  playMusicTrack() {
    console.log(this.measureDuration);

    if (this.store.playMusic) {
      // Вызываем функцию сразу чтобы не было первой задаржки перед её выполнением
      this.moveTimeMarker(this.timeMarker);

      this.timeMarker.timer = setInterval(
        () => this.moveTimeMarker(this.timeMarker),
        this.measureDuration * 1000,
      );
    } else {
      clearInterval(this.timeMarker.timer);
    }
  }

  addTimeMarker(parentElement: HTMLElement): HTMLDivElement {
    const timeMarker = document.createElement('div');
    const firstElementPosition = parentElement.firstElementChild as HTMLDivElement;

    timeMarker.classList.add('sheet-music__time-marker');
    timeMarker.style.height = `${SECTION_SIZE.height}px`;
    timeMarker.style.left = `${firstElementPosition.offsetLeft}px`;

    parentElement.prepend(timeMarker);

    return timeMarker;
  }

  getTimebyClickPosition(currentMeasure: HTMLElement, offsetX: number): number {
    const nextMeasure = currentMeasure.nextElementSibling as HTMLDivElement;
    const previousMeasure = currentMeasure.previousElementSibling as HTMLDivElement;
    let measureTime: number;

    if (nextMeasure) {
      measureTime = Number(nextMeasure.dataset.time) - Number(currentMeasure.dataset.time);
    } else {
      measureTime = Number(currentMeasure.dataset.time) - Number(previousMeasure.dataset.time);
    }

    measureTime = Number(measureTime.toFixed(3));

    let time = (offsetX * measureTime) / SECTION_SIZE.width;

    if (time <= 0) {
      time = Number(currentMeasure.dataset.time);
      return time;
    }

    time = time + Number(currentMeasure.dataset.measureId) * measureTime;

    return time;
  }

  changeTimeMarkerPosition(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const closestToSvg = target.closest('svg') as SVGSVGElement;

    if (!closestToSvg) return;

    const currentTime = this.getTimebyClickPosition(closestToSvg.parentElement, event.offsetX);

    this.store.setSongTime(currentTime);

    const measureColNum = Math.floor(
      (event.y + this.parentElement.scrollTop - Math.abs(this.parentElement.offsetTop)) /
        SECTION_SIZE.height,
    );

    const timeMarkerTop = measureColNum * SECTION_SIZE.height;

    this.timeMarker.element.style.left = `${event.x - this.parentElement.offsetLeft}px`;
    this.timeMarker.element.style.top = `${timeMarkerTop}px`;
    this.timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });

    if (timeMarkerTop > this.timeMarker.lastMeasure.offsetTop) {
      this.timeMarker.element.style.top = `${this.timeMarker.lastMeasure.offsetTop}px`;
    }
  }

  changeTrack() {
    const id = this.store.selectedInstrumentId;
    this.track = this.song.Tracks[id];
    this.render();
  }

  render() {
    this.store.eventEmitter.addEvent(EVENTS.SELECT_INSTRUMENT, this.changeTrack);

    this.parentElement.innerHTML = '';
    this.addBitrate(this.parentElement);

    this.sheetMusicRender = document.createElement('div');
    this.sheetMusicRender.classList.add('sheet-music__render');
    this.sheetMusicRender.setAttribute('id', 'print');
    this.sheetMusicRender.addEventListener('click', this.changeTimeMarkerPosition);

    this.parentElement.appendChild(this.sheetMusicRender);

    const timeSignature = `${this.track.Size.Count}/${this.track.Size.Per}`;
    const quarterDuration = 60 / this.track.Bpm;

    this.measureDuration = (4 * quarterDuration * this.track.Size.Count) / this.track.Size.Per;

    const renderTrack = new RenderTrack(
      this.track.Measures,
      timeSignature,
      this.track.Clef,
      this.sheetMusicRender,
    );

    renderTrack.render();

    this.timeMarker.element = this.addTimeMarker(this.sheetMusicRender);
    this.timeMarker.firstMeasure = this.sheetMusicRender.children[1] as HTMLDivElement;
    this.timeMarker.lastMeasure = this.sheetMusicRender.lastElementChild as HTMLDivElement;

    this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK, () => this.playMusicTrack());
  }
}
