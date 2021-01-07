import Vex from 'vexflow';
import { track } from '../../public/songs/Intertainer';
import { NoteName, Touch, Clef } from '../models/Notations';

const SECTION_SIZE = {
  width: 400,
  height: 150,
};

export default class SheetMusicPage {
  parentElement: HTMLDivElement;
  renderElement: HTMLDivElement;
  VF: any;
  context: any;
  sectionSize: { width: number; height: number };

  constructor(parentElement: HTMLDivElement) {
    this.parentElement = parentElement;
    this.VF = Vex.Flow;
    this.context = null;
    this.renderElement = null;
  }

  getTies(notesList) {
    let tiesList = [];
    //Нужно подумать как сделать последовательность если связь будет у нескольких нот подряд
    for (let i = 0; i < notesList.ties.length; i = i + 2) {
      const tieObj = new this.VF.StaveTie({
        first_note: notesList.notes[notesList.ties[i]],
        last_note: notesList.notes[notesList.ties[i + 1]],
      });

      tiesList.push(tieObj);
    }

    return tiesList;
  }

  drawStaveMeasure(section) {
    const timeSignature = `${section.Size.Count}/${section.Size.Per}`;

    section.Measures.forEach((measure, index: number) => {
      const renderer = new this.VF.Renderer(this.renderElement, this.VF.Renderer.Backends.SVG);

      // Size our SVG:
      renderer.resize(SECTION_SIZE.width, SECTION_SIZE.height);

      // And get a drawing context:
      this.context = renderer.getContext();
      this.context.setViewBox(
        SECTION_SIZE.width * index,
        0,
        SECTION_SIZE.width,
        SECTION_SIZE.height,
      );

      const stave = new this.VF.Stave(SECTION_SIZE.width * index, 0, SECTION_SIZE.width);

      if (index === 0) stave.addClef(Clef[section.Clef]).addTimeSignature(timeSignature);

      stave.setContext(this.context).draw();

      const notesList = this.getNotesArray(measure.Notes);
      const beams = this.VF.Beam.generateBeams(notesList.notes);

      this.VF.Formatter.FormatAndDraw(this.context, stave, notesList.notes);

      beams.forEach((beam) => {
        beam.setContext(this.context).draw();
      });

      const ties = this.getTies(notesList);

      ties.forEach((tie) => {
        tie.setContext(this.context).draw();
      });
    });
  }

  getNotesArray(notes) {
    const notesList = {
      notes: <any>[],
      ties: <any>[],
    };

    notes.forEach((notes, index: number) => {
      let note = notes.Notes[0];

      if (typeof note.Name === 'undefined') return;

      const noteObj = new this.VF.StaveNote({
        clef: 'treble',
        keys: [`${NoteName[note.Name]}/${note.Octave}`],
        duration: note.Duration,
        auto_stem: true,
      });

      //noteObj.addAccidental(0, new this.VF.Accidental("b"));
      if (note.IsDotted) noteObj.addDot(0);

      notesList.notes.push(noteObj);

      if (note.Touch === Touch.Legato) {
        notesList.ties.push(index);
        return;
      }

      if (note.Touch === Touch.Staccato) {
        noteObj.addModifier(0, new this.VF.Dot());
        return;
      }
    });

    return notesList;
  }

  addBitrate(renderElement: HTMLDivElement) {
    const bitrateContainer = document.createElement('div');
    bitrateContainer.classList.add('sheet-music__bitrate');
    bitrateContainer.textContent = `Bpm = ${track.Sections[0].Bpm}`;
    renderElement.append(bitrateContainer);
  }

  render() {
    console.log(track);

    this.addBitrate(this.parentElement);

    this.renderElement = document.createElement('div');
    this.renderElement.classList.add('sheet-music__render');
    this.parentElement.append(this.renderElement);

    track.Sections.forEach((section) => {
      this.drawStaveMeasure(section);
    });
  }
}
