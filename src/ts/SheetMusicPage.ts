import Vex from 'vexflow';
import { Touch, Alteration } from '../models/Notations';
import { Chord, Measure, Note, NoteTie, Track, Song } from '../models/TrackDisplayType';
import EventEmitter from './EventEmitter';
import renderElement from './helpers/renderElements';
import Store, { EVENTS } from './Store';

const SECTION_SIZE = {
  width: 400,
  height: 100,
};

interface timeMarkerParams {
  shiftOffset: number;
  firstMeasurePosition: DOMRect;
  lastMeasurePosition: DOMRect;
}

// для теста
let startTime = Date.now();

export default class SheetMusicPage {
  store: Store;
  parentElement: HTMLElement;
  sheetMusicRender: HTMLDivElement;
  timeMarker: HTMLDivElement;
  timeMarkerTimer: NodeJS.Timer;
  timeMarkerSpeed: number;
  measureDuration: number;
  playMusic: boolean;
  buttonPlay: HTMLButtonElement;
  buttonChangeTrack: HTMLButtonElement;
  trackList: HTMLUListElement;
  track: Track;
  song: Song;

  constructor(parentElement: HTMLElement, song: Song, store: Store) {
    this.store = store;
    this.song = song;
    this.track = this.song.Tracks[0];
    this.parentElement = parentElement;
    this.sheetMusicRender = null;
    this.timeMarker = null;
    this.timeMarkerTimer = null;
    this.timeMarkerSpeed = null;
    this.playMusic = false;
    this.buttonPlay = null;
    this.buttonChangeTrack = null;
    this.trackList = null;
    this.measureDuration = null;
    this.playMusicTrack = this.playMusicTrack.bind(this);
    this.changeTrack = this.changeTrack.bind(this);
    this.changeTimeMarkerPosition = this.changeTimeMarkerPosition.bind(this);
  }

  getTies(notesList: NoteTie) {
    let tiesList: Vex.Flow.StaveTie[] = [];
    //Нужно подумать как сделать последовательность если связь будет у нескольких нот подряд
    //Но может и не понадобится ^_^
    for (let i = 0; i < notesList.ties.length; i = i + 2) {
      const tieObj = new Vex.Flow.StaveTie({
        first_note: notesList.notes[notesList.ties[i]],
        last_note: notesList.notes[notesList.ties[i + 1]],
      });

      tiesList.push(tieObj);
    }

    return tiesList;
  }

  drawStaveMeasures(measures: Measure[]) {
    const timeSignature = `${this.track.Size.Count}/${this.track.Size.Per}`;
    const quarterDuration = 60 / this.track.Bpm;
    this.measureDuration = (4 * quarterDuration * this.track.Size.Count) / this.track.Size.Per;
    this.timeMarkerSpeed = SECTION_SIZE.width / this.measureDuration;

    measures.forEach((measure, index: number) => {
      const context = Vex.Flow.Renderer.getSVGContext(
        this.sheetMusicRender,
        Vex.Flow.Renderer.Backends.SVG,
      );

      context.setViewBox(SECTION_SIZE.width * index, 0, SECTION_SIZE.width, SECTION_SIZE.height);

      const stave = new Vex.Flow.Stave(SECTION_SIZE.width * index, 0, SECTION_SIZE.width);

      if (index === 0) stave.addClef(this.track.Clef).addTimeSignature(timeSignature);

      stave.setContext(context).draw();

      const notesList = this.getNotesArray(measure.Chords);
      const beams = Vex.Flow.Beam.generateBeams(notesList.notes);

      Vex.Flow.Formatter.FormatAndDraw(context, stave, notesList.notes);

      beams.forEach((beam) => {
        beam.setContext(context).draw();
      });

      const ties = this.getTies(notesList);

      ties.forEach((tie) => {
        tie.setContext(context).draw();
      });

      const svgElement = this.sheetMusicRender.children[index] as HTMLElement;
      svgElement.dataset.time = `${measure.Time}`;
      svgElement.dataset.markerSpeed = `${this.timeMarkerSpeed}`;
      svgElement.dataset.id = `${index}`;
    });
  }

  getNotesArray(chords: Chord[]): NoteTie {
    const notes: Vex.Flow.StaveNote[] = [];
    const ties: number[] = [];

    chords.forEach((chord, index: number) => {
      const note = chord.Notes[0];
      const notesArr = chord.Notes.map((note) => `${note.Name}/${note.Octave}`);

      if (typeof note.Name === 'undefined') return;

      const noteDuration = note.IsPause ? note.Duration + 'r' : note.Duration;
      const noteObj = new Vex.Flow.StaveNote({
        clef: this.track.Clef,
        keys: notesArr,
        duration: noteDuration,
        auto_stem: true,
      });

      if (note.Alteration) noteObj.addAccidental(0, new Vex.Flow.Accidental(note.Alteration));

      if (note.IsDotted) noteObj.addDot(0);

      notes.push(noteObj);

      if (note.Touch === Touch.Legato) {
        ties.push(index);
        return;
      }

      if (note.Touch === Touch.Staccato) {
        noteObj.addModifier(0, new Vex.Flow.Dot());
        return;
      }
    });

    return { notes, ties };
  }

  addBitrate(parentElement: HTMLElement) {
    const bitrateContainer = document.createElement('div');

    bitrateContainer.classList.add('sheet-music__bitrate');
    bitrateContainer.textContent = `Bpm = ${Math.trunc(this.track.Bpm)}`;

    parentElement.appendChild(bitrateContainer);
  }

  moveTimeMarker(timeMarker: HTMLDivElement, params: timeMarkerParams) {
    const numberElementsPerRow = Math.floor(this.parentElement.clientWidth / SECTION_SIZE.width);

    const rowStartX = params.firstMeasurePosition.x - this.parentElement.offsetLeft;
    const firstRowEndPosition = rowStartX + numberElementsPerRow * SECTION_SIZE.width;

    timeMarker.style.left = `${timeMarker.offsetLeft + params.shiftOffset}px`;

    // Для тестирования ------------------------
    // let elapsedTime = Date.now() - startTime;
    // timeMarker.innerText = (elapsedTime / 1000).toFixed(3);

    // //elapsedTime / 1000 should be equal to measureDuration
    // if (
    //   Math.round(timeMarker.offsetLeft - params.firstMeasurePosition.x) %
    //     SECTION_SIZE.width ===
    //   0
    // ) {
    //   console.log(params.shiftOffset, elapsedTime / 1000, this.measureDuration);
    //   startTime = Date.now();
    // }
    //--------------------------------------
    const lastMesureEndX =
      params.lastMeasurePosition.x - this.parentElement.offsetLeft + SECTION_SIZE.width;

    const lastMesureEndY =
      params.lastMeasurePosition.y +
      window.scrollY -
      SECTION_SIZE.height -
      this.parentElement.offsetTop;

    const isEndOfLastMeasure = timeMarker.offsetLeft >= lastMesureEndX;
    const isLastMeasure = timeMarker.offsetTop >= lastMesureEndY;
    const isEndOfRow = timeMarker.offsetLeft > firstRowEndPosition;

    if (isEndOfLastMeasure && isLastMeasure) {
      timeMarker.style.left = `${rowStartX}px`;
      timeMarker.style.top = '0';

      this.playMusic = !this.playMusic;
      this.buttonPlay.textContent = 'play';
      clearInterval(this.timeMarkerTimer);
      return;
    }

    if (isEndOfRow) {
      timeMarker.style.left = `${rowStartX}px`;
      timeMarker.style.top = `${timeMarker.offsetTop + SECTION_SIZE.height}px`;
      timeMarker.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  playMusicTrack() {
    this.store.eventEmitter.emit(EVENTS.PLAY_BUTTON_CLICK);

    const params: timeMarkerParams = {
      shiftOffset: this.timeMarkerSpeed / 20,
      firstMeasurePosition: this.sheetMusicRender.children[1].getBoundingClientRect(),
      lastMeasurePosition: this.sheetMusicRender.lastElementChild.getBoundingClientRect(),
    };

    this.playMusic = !this.playMusic;

    if (this.playMusic) {
      // для теста
      startTime = Date.now();

      this.buttonPlay.textContent = 'stop';
      this.timeMarkerTimer = setInterval(() => this.moveTimeMarker(this.timeMarker, params), 50);
      this.timeMarker.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else {
      this.buttonPlay.textContent = 'play';

      clearInterval(this.timeMarkerTimer);
    }
  }

  addTimeMarker(parentElement: HTMLDivElement): HTMLDivElement {
    const timeMarker = document.createElement('div');
    const firstElementPosition = parentElement.firstElementChild.getBoundingClientRect();
  
    timeMarker.classList.add('sheet-music__time-marker');
    timeMarker.style.height = `${SECTION_SIZE.height}px`;
    timeMarker.style.left = `${firstElementPosition.x - this.parentElement.offsetLeft}px`;

    parentElement.prepend(timeMarker);

    return timeMarker;
  }

  getTimebyClickPosition(currentMeasure: SVGSVGElement, offsetX: number): number {
    const nextMeasure = currentMeasure.nextElementSibling as HTMLElement;
    const previousMeasure = currentMeasure.previousElementSibling as HTMLElement;
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

    time = time + Number(currentMeasure.dataset.id) * measureTime;
    return time;
  }

  changeTimeMarkerPosition(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const closestToSvg = target.closest('svg');

    if (!closestToSvg) return;

    const currentTime = this.getTimebyClickPosition(
      closestToSvg,
      event.offsetX - this.parentElement.offsetLeft,
    );

    this.store.setSongTime(currentTime);

    const newTimeMarkerPositionY = Math.floor(
      (event.y - Math.abs(this.parentElement.offsetTop) + scrollY) / SECTION_SIZE.height,
    );

    this.timeMarker.style.left = `${event.x - this.parentElement.offsetLeft}px`;
    this.timeMarker.style.top = `${newTimeMarkerPositionY * SECTION_SIZE.height}px`;
    this.timeMarker.scrollIntoView({ block: 'center', behavior: 'smooth' });
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

    this.buttonPlay = renderElement(aside, 'button', ['button-play'], 'play') as HTMLButtonElement;
    this.buttonPlay.addEventListener('click', this.playMusicTrack);

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

  addResizeEvent() {
    window.addEventListener('resize', () => {
    });
  }

  render() {
    //console.log(this.song);
    // Подумать как лучше сделать адаптив
    // Синхронизировать ползунок с песней, протестировать
    this.parentElement.innerHTML = '';
    this.addBitrate(this.parentElement);

    this.renderAside();

    this.sheetMusicRender = document.createElement('div');
    this.sheetMusicRender.classList.add('sheet-music__render');
    this.sheetMusicRender.addEventListener('click', this.changeTimeMarkerPosition);

    this.parentElement.appendChild(this.sheetMusicRender);

    this.drawStaveMeasures(this.track.Measures);

    this.timeMarker = this.addTimeMarker(this.sheetMusicRender);

    this.addResizeEvent();
  }
}
