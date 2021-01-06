import Vex from 'vexflow';
import { track } from '../../public/songs/Intertainer';
import { NoteName} from '../models/Notations';

export default class SheetMusicPage {
  parentElement: HTMLElement;
  VF: any;
  context: any;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.VF = Vex.Flow;
    this.context = null;
  }

  drawStaveMeasure(section) {
    const timeSignature = `${section.Size.Count}/${section.Size.Per}`;
    const sectionSizeX = 300;

    section.Measures.forEach((measure, index) => {
      const stave = new this.VF.Stave(sectionSizeX * index, 0, sectionSizeX);

      if (index === 0) stave.addClef('treble').addTimeSignature(timeSignature);

      stave.setContext(this.context).draw();

      const notesArray = this.getNotesArray(measure.Notes);
      const beams = this.VF.Beam.generateBeams(notesArray);

      this.VF.Formatter.FormatAndDraw(this.context, stave, notesArray);

      beams.forEach((beam) => {
        beam.setContext(this.context).draw();
      });
    });
  }

  getNotesArray(notes) {
    let notesArray = [];

    notes.forEach((notes) => {
      let note = notes.Notes[0];

      if (typeof note.Name === 'undefined') return;

      const noteObj = new this.VF.StaveNote({
        clef: 'treble',
        keys: [`${NoteName[note.Name]}/${note.Octave}`],
        duration: note.Duration,
        auto_stem: true,
      });

      //noteObj.addAccidental(0, new this.VF.Accidental("b"));
      //добавить лигу (связка ноты)
      if (note.IsDotted) noteObj.addDot(0);

      notesArray.push(noteObj);
    });

    return notesArray;
  }

  render() {
    console.log(track);

    const renderer = new this.VF.Renderer(this.parentElement, this.VF.Renderer.Backends.SVG);

    // Size our SVG:
    renderer.resize(1200, 600);

    // And get a drawing context:
    this.context = renderer.getContext();

    track.Sections.forEach((section) => {
      this.drawStaveMeasure(section);
    });
  }
}
