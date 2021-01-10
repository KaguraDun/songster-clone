import Vex from 'vexflow';
import * as track from '../../public/songs/4.json';
import { Touch, Alteration } from '../models/Notations';
import { Chord, Measure, Note, NoteTie, Track } from '../models/TrackDisplayType';

const SECTION_SIZE = {
  width: 400,
  height: 150,
};

export default class SheetMusicPage {
  parentElement: HTMLDivElement;
  renderElement: HTMLDivElement;

  constructor(parentElement: HTMLDivElement) {
    this.parentElement = parentElement;
    this.renderElement = null;
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

    measures.forEach((measure, index: number) => {
      const context = Vex.Flow.Renderer.getSVGContext(
        this.renderElement,
        Vex.Flow.Renderer.Backends.SVG,
      );

      context.setViewBox(
        SECTION_SIZE.width * index,
        0,
        SECTION_SIZE.width,
        SECTION_SIZE.height,
      );

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

  addBitrate(renderElement: HTMLDivElement) {
    const bitrateContainer = document.createElement('div');
    bitrateContainer.classList.add('sheet-music__bitrate');
    bitrateContainer.textContent = `Bpm = ${Math.trunc(track.Bpm)}`;
    renderElement.append(bitrateContainer);
  }

  render() {
    this.addBitrate(this.parentElement);

    this.renderElement = document.createElement('div');
    this.renderElement.classList.add('sheet-music__render');
    this.parentElement.append(this.renderElement);

    this.drawStaveMeasures(track.Measures);
  }
}
