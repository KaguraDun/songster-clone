import Vex from 'vexflow';
import * as track from '../../public/songs/2.json';
import { Touch, Alteration } from '../models/Notations';
import { Chord, Measure, Note, NoteTie, Track } from '../models/TrackDisplayType';

const SECTION_SIZE = {
  width: 400,
  height: 150,
};

const timeMarkerStartOffset: number = 100;

export default class SheetMusicPage {
  parentElement: HTMLDivElement;
  renderElement: HTMLDivElement;
  timeMarker: HTMLDivElement;
  timeMarkerTimer: NodeJS.Timer;
  playMusic: boolean;
  buttonPlay: HTMLButtonElement;

  constructor(parentElement: HTMLDivElement) {
    this.parentElement = parentElement;
    this.renderElement = null;
    this.timeMarker = null;
    this.timeMarkerTimer = null;
    this.playMusic = false;
    this.buttonPlay = null;
    this.playMusicTrack = this.playMusicTrack.bind(this);
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
    const timeSignature = `${track.Size.Count}/${track.Size.Per}`;
    const quarter = 60 / track.Bpm;
    const measureDuration = (4 * quarter * track.Size.Count) / track.Size.Per;
    const timeMarkerSpeed = SECTION_SIZE.width / measureDuration;

    measures.forEach((measure, index: number) => {
      const context = Vex.Flow.Renderer.getSVGContext(
        this.renderElement,
        Vex.Flow.Renderer.Backends.SVG,
      );

      context.setViewBox(SECTION_SIZE.width * index, 0, SECTION_SIZE.width, SECTION_SIZE.height);

      const stave = new Vex.Flow.Stave(SECTION_SIZE.width * index, 0, SECTION_SIZE.width);

      if (index === 0) stave.addClef(track.Clef).addTimeSignature(timeSignature);

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

      const svgElement = this.renderElement.children[index] as HTMLElement;
      svgElement.dataset.time = `${measure.Time}`;
      svgElement.dataset.markerSpeed = `${timeMarkerSpeed}`;
    });
  }

  getNotesArray(chords: Chord[]): NoteTie {
    const notes: Vex.Flow.StaveNote[] = [];
    const ties: number[] = [];

    chords.forEach((chord, index: number) => {
      const note = chord.Notes[0];
      const notesArr = chord.Notes.map((note) => `${note.Name}/${note.Octave}`);

      if (typeof note.Name === 'undefined') return;

      const noteAlteration = Object.values(Alteration)[note.Alteration];
      const noteDuration = note.IsPause ? note.Duration + 'r' : note.Duration;
      const noteObj = new Vex.Flow.StaveNote({
        clef: track.Clef,
        keys: notesArr,
        duration: noteDuration,
        auto_stem: true,
      });

      if (noteAlteration) noteObj.addAccidental(0, new Vex.Flow.Accidental(noteAlteration));

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

  addBitrate(parentElement: HTMLDivElement) {
    const bitrateContainer = document.createElement('div');

    bitrateContainer.classList.add('sheet-music__bitrate');
    bitrateContainer.textContent = `Bpm = ${Math.trunc(track.Bpm)}`;

    parentElement.append(bitrateContainer);
  }

  addButtonPlay(parentElement: HTMLDivElement): HTMLButtonElement {
    const buttonContainer = document.createElement('button');

    buttonContainer.classList.add('button-play');
    buttonContainer.textContent = `play`;
    parentElement.append(buttonContainer);

    return buttonContainer;
  }

  moveTimeMarker(timeMarker: HTMLDivElement) {
    const shiftOffset: number = 1;
    const firstMeasure = this.renderElement.children[1];
    const lastMeasure = this.renderElement.lastElementChild;
    const lastRowPosition = lastMeasure.getBoundingClientRect();
    const numberElementsPerRow = Math.floor(document.body.clientWidth / firstMeasure.clientWidth);
    const firstRowPosition = firstMeasure.getBoundingClientRect();
    const firstRowEndPosition = firstRowPosition.x + numberElementsPerRow * SECTION_SIZE.width;

    timeMarker.style.left = `${timeMarker.offsetLeft + shiftOffset}px`;

    if (timeMarker.offsetLeft > firstRowEndPosition) {
      timeMarker.style.left = `${firstRowPosition.x}px`;
      timeMarker.style.top = `${timeMarker.offsetTop + SECTION_SIZE.height}px`;
      timeMarker.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    if (
      timeMarker.offsetLeft > lastRowPosition.x + SECTION_SIZE.width &&
      timeMarker.offsetTop >= lastRowPosition.y + window.scrollY - SECTION_SIZE.height
    ) {
      timeMarker.style.left = `${firstRowPosition.x + timeMarkerStartOffset}px`;
      timeMarker.style.top = '0';

      this.playMusic = !this.playMusic;
      this.buttonPlay.textContent = 'play';
      
      clearInterval(this.timeMarkerTimer);
    }
  }

  playMusicTrack() {
    this.playMusic = !this.playMusic;

    if (this.playMusic) {
      this.buttonPlay.textContent = 'stop';
      this.timeMarkerTimer = setInterval(() => this.moveTimeMarker(this.timeMarker), 1);
      this.timeMarker.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else {
      this.buttonPlay.textContent = 'play';
      clearInterval(this.timeMarkerTimer);
    }
  }

  addTimeMarker(parentElement: HTMLDivElement): HTMLDivElement {
    const timeMarker = document.createElement('div');
    const firstElementPosition = parentElement.children[0].getBoundingClientRect();

    timeMarker.classList.add('sheet-music__time-marker');
    timeMarker.style.height = `${SECTION_SIZE.height}px`;
    timeMarker.style.left = `${firstElementPosition.x + timeMarkerStartOffset}px`;

    parentElement.prepend(timeMarker);

    return timeMarker;
  }

  changeTimeMarkerPosition(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const closestToSvg = target.closest('svg');

    if (!closestToSvg) return;

    const newTimeMarkerPosition = Math.floor((event.clientY + pageYOffset) / SECTION_SIZE.height);

    this.timeMarker.style.left = `${event.clientX}px`;
    this.timeMarker.style.top = `${newTimeMarkerPosition * SECTION_SIZE.height}px`;

    this.timeMarker.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  render() {
    console.log(track.Measures);
    this.addBitrate(this.parentElement);

    // for testing!
    this.buttonPlay = this.addButtonPlay(this.parentElement);
    this.buttonPlay.addEventListener('click', this.playMusicTrack);

    this.renderElement = document.createElement('div');
    this.renderElement.classList.add('sheet-music__render');

    this.parentElement.append(this.renderElement);

    this.drawStaveMeasures(track.Measures);

    this.timeMarker = this.addTimeMarker(this.renderElement);

    this.renderElement.addEventListener('click', this.changeTimeMarkerPosition);
  }
}
