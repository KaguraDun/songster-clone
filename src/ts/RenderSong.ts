import renderElement from './helpers/renderElements';
import { Track, Song } from '../models/TrackDisplayType';
import Store, { EVENTS } from './Store';
import { SECTION_SIZE } from './Constants';
import RenderTrack from './RenderTrack';

interface TimeMarker {
  element: HTMLDivElement;
  timer: NodeJS.Timer;
  speed: number;
  shiftOffset: number;
  firstMeasure: HTMLDivElement;
  lastMeasure: HTMLDivElement;
}
// для теста
//let startTime = Date.now();

export default class RenderSong {
  parentElement: HTMLElement;
  song: Song;
  store: Store;
  sheetMusicRender: HTMLDivElement;
  timeMarker: TimeMarker = {
    element: null,
    timer: null,
    speed: null,
    shiftOffset: null,
    firstMeasure: null,
    lastMeasure: null,
  };
  measureDuration: number;
  buttonChangeTrack: HTMLButtonElement;
  trackList: HTMLUListElement;
  track: Track;

  constructor(parentElement: HTMLElement, song: Song, store: Store) {
    this.parentElement = parentElement;
    this.song = song;
    this.store = store;
    this.track = this.song.Tracks[0];
    this.sheetMusicRender;
    this.timeMarker;
    this.buttonChangeTrack;
    this.trackList;
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

  moveTimeMarker(timeMarker: TimeMarker) {
    const numberElementsPerRow = Math.floor(this.parentElement.clientWidth / SECTION_SIZE.width);
    const rowStartX = timeMarker.firstMeasure.offsetLeft;
    const firstRowEndPosition = rowStartX + numberElementsPerRow * SECTION_SIZE.width;

    timeMarker.element.style.left = `${timeMarker.element.offsetLeft + timeMarker.shiftOffset}px`;

    // Для тестирования ------------------------
    //let elapsedTime = Date.now() - startTime;
    //timeMarker.element.innerText = (elapsedTime / 1000).toFixed(3);

    //elapsedTime / 1000 should be equal to measureDuration

    // if (
    //   Math.round(timeMarker.element.offsetLeft - timeMarker.firstMeasure.offsetLeft) %
    //     SECTION_SIZE.width === 0
    // ) {
    //   startTime = Date.now();
    //   console.log(elapsedTime / 1000, this.measureDuration);
    // }
    //--------------------------------------

    const lastMesureEndX = timeMarker.lastMeasure.offsetLeft + SECTION_SIZE.width;
    const lastMesureEndY = timeMarker.lastMeasure.offsetTop - SECTION_SIZE.height;

    const isEndOfLastMeasure = timeMarker.element.offsetLeft >= lastMesureEndX;
    const isLastMeasure = timeMarker.element.offsetTop >= lastMesureEndY;
    const isEndOfRow = timeMarker.element.offsetLeft > firstRowEndPosition;

    if (isEndOfLastMeasure && isLastMeasure) {
      timeMarker.element.style.left = `${rowStartX}px`;
      timeMarker.element.style.top = '0';

      this.store.endOfSong();
      clearInterval(this.timeMarker.timer);
      return;
    }

    if (isEndOfRow) {
      timeMarker.element.style.left = `${rowStartX}px`;
      timeMarker.element.style.top = `${timeMarker.element.offsetTop + SECTION_SIZE.height}px`;
      timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  playMusicTrack() {
    this.timeMarker.shiftOffset = this.timeMarker.speed / 20;

    if (this.store.playMusic) {
      // для теста
      //startTime = Date.now();
      this.timeMarker.timer = setInterval(() => this.moveTimeMarker(this.timeMarker), 50);
      this.timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });
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

  changeTrack(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const closestToList = target.closest('ul');

    if (!closestToList) return;

    const trackID = Number(target.id);

    this.track = this.song.Tracks[trackID];

    this.render();
  }

  renderAside() {
    const aside = renderElement(this.parentElement, 'aside', ['sheet-music__aside']);

    this.trackList = renderElement(aside, 'ul', ['sheet-music__track-list']) as HTMLUListElement;
    this.trackList.addEventListener('click', this.changeTrack);

    this.song.Tracks.forEach((track, index) => {
      const item = renderElement(this.trackList, 'li', [
        'sheet-music__track-list-item',
      ]) as HTMLLIElement;

      const button = renderElement(
        item,
        'button',
        ['button-change-track'],
        '🎸',
      ) as HTMLButtonElement;

      button.title = track.Instrument;
      button.id = String(index);
    });
  }

  render() {
    // console.log(this.song);
    // Подумать как лучше сделать адаптив
    // Синхронизировать ползунок с песней, протестировать
    this.parentElement.innerHTML = '';
    this.addBitrate(this.parentElement);

    this.renderAside();

    this.sheetMusicRender = document.createElement('div');
    this.sheetMusicRender.classList.add('sheet-music__render');
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
    this.timeMarker.speed = SECTION_SIZE.width / this.measureDuration;
    this.timeMarker.firstMeasure = this.sheetMusicRender.children[1] as HTMLDivElement;
    this.timeMarker.lastMeasure = this.sheetMusicRender.lastElementChild as HTMLDivElement;

    this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK, () => this.playMusicTrack());
  }
}
