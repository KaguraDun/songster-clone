import Vex from 'vexflow';
import { Touch } from '../models/Notations';
import { Chord, Measure, NoteTie } from '../models/TrackDisplayType';
import { SECTION_SIZE } from '../models/Constants';
import renderElement from './helpers/renderElements';

export default class renderTrack {
  measures: Measure[];
  timeSignature: string;
  sheetMusicRender: HTMLElement;
  clef: string;

  constructor(
    measures: Measure[],
    timeSignature: string,
    clef: string,
    sheetMusicRender: HTMLElement,
  ) {
    this.measures = measures;
    this.timeSignature = timeSignature;
    this.sheetMusicRender = sheetMusicRender;
    this.clef = clef;
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

  drawStaveMeasures() {
    if (this.measures.length <= 1) {
      const measureContainer = renderElement(this.sheetMusicRender, 'div', ['measure-error']);

      measureContainer.style.height = `${SECTION_SIZE.height}px`;
      measureContainer.dataset.time = `${this.measures[0].Time}`;
      measureContainer.dataset.measureId = `${0}`;
      measureContainer.innerText = 'Note list for this instrument is empty. Try other instrument';
      return;
    }

    this.measures.forEach((measure, index: number) => {
      const measureContainer = renderElement(this.sheetMusicRender, 'div', ['measure']);

      const context = Vex.Flow.Renderer.getSVGContext(
        measureContainer,
        Vex.Flow.Renderer.Backends.SVG,
      );

      context.setViewBox(SECTION_SIZE.width * index, 0, SECTION_SIZE.width, SECTION_SIZE.height);

      const stave = new Vex.Flow.Stave(SECTION_SIZE.width * index, 0, SECTION_SIZE.width);

      if (index === 0) stave.addClef(this.clef).addTimeSignature(this.timeSignature);

      stave.setContext(context).draw();

      const notesList = this.getNotesArray(measure.Chords);
      const beams = Vex.Flow.Beam.generateBeams(notesList.notes);

      measureContainer.style.height = `${SECTION_SIZE.height}px`;
      measureContainer.dataset.time = `${measure.Time}`;
      measureContainer.dataset.measureId = `${index}`;


      Vex.Flow.Formatter.FormatAndDraw(context, stave, notesList.notes);

      beams.forEach((beam) => {
        beam.setContext(context).draw();
      });

      const ties = this.getTies(notesList);

      ties.forEach((tie) => {
        tie.setContext(context).draw();
      });
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
        clef: this.clef,
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

  render() {
    this.drawStaveMeasures();
  }
}
