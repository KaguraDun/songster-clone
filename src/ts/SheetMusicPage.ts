import Vex from 'vexflow';
import { track } from '../../public/songs/Intertainer';
import { NoteName, Clef } from '../models/Notations';

export default class SheetMusicPage {
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    console.log(track);

    const VF = Vex.Flow;

    var renderer = new VF.Renderer(this.parentElement, VF.Renderer.Backends.SVG);

    // Size our SVG:
    renderer.resize(500, 500);

    // And get a drawing context:
    var context = renderer.getContext();

    // Create a stave at position 10, 40 of width 400 on the canvas.
    var stave = new VF.Stave(10, 40, 400);

    // Add a clef and time signature.
    stave.addClef('treble').addTimeSignature('4/4');

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    let notesArray = [];
    
    console.log(track.Sections);

    track.Sections[0].Measures.forEach((notes) => {
      notes.Notes.forEach((notes) => {

        let note = notes.Notes[0];

        if (!note.Name) return;

        // console.log(NoteName[note.Name] + '/4');

        const noteObj = new VF.StaveNote({
          clef: 'treble',
          keys: [NoteName[note.Name] + '/4'],
          duration: 'q',
        });

        notesArray.push(noteObj);
      });
    });

    console.log(notesArray);
    // Create a voice in 4/4 and add the notes from above
    var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notesArray.slice(0, 4));

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(context, stave);
  }

  drawSection() {

  }
}
