import { Track, Song } from '../models/TrackDisplayType';
import Store, { EVENTS } from './Store';
import { SECTION_SIZE } from '../models/Constants';
import RenderTrack from './RenderTrack';
import renderElement from './helpers/renderElements';
import getTransitionEndEventName from './helpers/getTransitionEndEventName';

interface TimeMarker {
  element: HTMLElement;
  timer: NodeJS.Timer;
  firstMeasure: HTMLElement;
  lastMeasure: HTMLElement;
  currentMeasure: HTMLElement;
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
  };
  measureDuration: number;
  track: Track;
  trackRenderer: RenderTrack;
  transitionEndEventName: string;

  constructor(parentElement: HTMLElement, song: Song, store: Store) {
    this.parentElement = parentElement;
    this.song = song;
    this.store = store;
    this.track = this.song.Tracks[0];
    this.sheetMusicRender;
    this.timeMarker;
    this.measureDuration;
    this.transitionEndEventName;
    this.playMusicTrack = this.playMusicTrack.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.selectMeasure = this.selectMeasure.bind(this);
    this.setTimeMarkerPosition = this.setTimeMarkerPosition.bind(this);
    this.appendToNextMeasure = this.appendToNextMeasure.bind(this);
  }

  addBitrate(parentElement: HTMLElement) {
    const bitrateContainer = document.createElement('div');
    bitrateContainer.classList.add('sheet-music__bitrate');
    bitrateContainer.textContent = `Bpm = ${Math.trunc(this.track.Bpm)}`;

    parentElement.appendChild(bitrateContainer);
  }

  flushCss(element: HTMLElement) {
    // By reading the offsetHeight property, we are forcing
    // the browser to flush the pending CSS changes (which it
    // does to ensure the value obtained is accurate).
    element.offsetHeight;
  }

  moveTimeMarkerToFirstMeasure() {
    this.timeMarker.firstMeasure.append(
      this.timeMarker.currentMeasure.removeChild(this.timeMarker.element),
    );
    this.timeMarker.firstMeasure.scrollIntoView({ block: 'center', behavior: 'smooth' });

    this.moveTimeMarkerTobeginOfMeasure();
    this.timeMarker.currentMeasure = this.timeMarker.firstMeasure;
    this.store.endOfSong();
  }

  moveTimeMarkerTobeginOfMeasure() {
    this.timeMarker.element.style.transition = 'none';
    this.timeMarker.element.style.left = `${0}px`;
    // apply the "transition: none" and "left: Xpx" rule immediately
    this.flushCss(this.timeMarker.element);
    // restore animation
    this.timeMarker.element.style.transition = `left ${this.measureDuration}s linear`;
  }

  appendToNextMeasure() {
    const nextMeasure = this.timeMarker.currentMeasure.nextElementSibling as HTMLElement;

    if (!nextMeasure) {
      this.moveTimeMarkerToFirstMeasure();
      return;
    }

    nextMeasure.append(this.timeMarker.currentMeasure.removeChild(this.timeMarker.element));

    this.timeMarker.currentMeasure = nextMeasure;
    this.moveTimeMarkerTobeginOfMeasure();
    this.runTimeMarker();
  }

  runTimeMarker() {
    this.timeMarker.element.style.transition = `left ${this.measureDuration}s linear`;
    this.timeMarker.element.style.left = `${SECTION_SIZE.width}px`;
    this.timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  stopMusicTrack() {
    this.moveTimeMarkerTobeginOfMeasure();

    this.store.setSongTime(Number(this.timeMarker.currentMeasure.dataset.time));
  }

  playMusicTrack() {
    if (this.store.playMusic) {
      this.runTimeMarker();
    } else {
      this.stopMusicTrack();
    }
  }

  addTimeMarker() {
    const timeMarker = document.createElement('div');

    this.timeMarker.firstMeasure.append(timeMarker);

    timeMarker.classList.add('sheet-music__time-marker');
    timeMarker.style.height = `${SECTION_SIZE.height}px`;
    timeMarker.style.left = `${0}px`;
    timeMarker.style.top = `${0}px`;

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

    selectedMeasure.append(this.timeMarker.currentMeasure.removeChild(this.timeMarker.element));

    this.timeMarker.currentMeasure = selectedMeasure;
    this.timeMarker.element.style.left = '0';

    if (this.store.playMusic) {
      this.moveTimeMarkerTobeginOfMeasure();
      this.runTimeMarker();
    }

    this.timeMarker.element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    this.store.setSongTime(currentTime);
  }

  setTimeMarkerPosition() {
    const measureID = Math.floor(this.store.songTimeMiliSeconds / (this.measureDuration * 1000));
    const selectedMeasure = this.sheetMusicRender.children[measureID] as HTMLElement;

    this.changeTimeMarkerPosition(selectedMeasure);
  }

  changeTrack() {
    const currentMeasureID = Number(this.timeMarker.currentMeasure.dataset.measureId);
    const instrumentID = this.store.selectedInstrumentId;
    const scrollPositionY = this.parentElement.scrollTop;

    this.track = this.song.Tracks[instrumentID];

    this.render();

    this.timeMarker.currentMeasure = this.sheetMusicRender.children[
      currentMeasureID
    ] as HTMLElement;

    this.timeMarker.currentMeasure.append(
      this.timeMarker.firstMeasure.removeChild(this.timeMarker.element),
    );

    this.timeMarker.element.style.left = `0`;
    this.parentElement.scrollTo(0, scrollPositionY);
    this.store.setSongTime(Number(this.timeMarker.currentMeasure.dataset.time));
    if (this.store.playMusic) {
      this.runTimeMarker();
    }
  }

  init() {
    this.store.eventEmitter.addEvent(EVENTS.SELECT_INSTRUMENT, this.changeTrack);
    this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK, () => this.playMusicTrack());
    this.store.eventEmitter.addEvent(EVENTS.PLAYER_PROGRESS_BAR_CLICK, this.setTimeMarkerPosition);

    this.transitionEndEventName = getTransitionEndEventName();
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

    this.trackRenderer = new RenderTrack(
      this.track.Measures,
      timeSignature,
      this.track.Clef,
      this.sheetMusicRender as HTMLDivElement,
    );

    this.trackRenderer.render();

    this.timeMarker.firstMeasure = this.sheetMusicRender.firstElementChild as HTMLElement;
    this.timeMarker.lastMeasure = this.sheetMusicRender.lastElementChild as HTMLElement;
    this.timeMarker.currentMeasure = this.timeMarker.firstMeasure;
    this.timeMarker.element = this.addTimeMarker();
    this.timeMarker.element.addEventListener(this.transitionEndEventName, this.appendToNextMeasure);
  }
}
