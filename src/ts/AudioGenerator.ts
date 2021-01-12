import { Midi, Track } from '@tonejs/midi';
import * as Tone from 'tone';

export class AudioGenerator {
    private midi: Midi;
    private parentElement: HTMLElement;
    private recorder: Tone.Recorder;

    constructor(parentElement: HTMLElement,midiData: ArrayBuffer) {
        this.parentElement = parentElement;
        this.midi = new Midi(midiData);
        this.recorder = new Tone.Recorder();
    }

    render() {
        const button = document.createElement('button');
        button.textContent = 'click';
        button.onclick = () => {
            this.recorder.start();
            this.renderAudio();
        }
        this.parentElement.appendChild(button);

        const stop = document.createElement('button');
        stop.textContent = 'stop';
        stop.onclick = async () => {
            Tone.Transport.stop();
        }
        this.parentElement.appendChild(stop);
    }

    renderAudio() {
        Tone.Transport.bpm.value = this.midi.header.tempos[0].bpm;
        Tone.Transport.timeSignature = this.midi.header.timeSignatures[0].timeSignature;

        this.midi.tracks.forEach(track => {
            this.renderTrack(track);
        });
        Tone.Transport.start();
    }

    renderTrack(track: Track) {
        const synth = new Tone.Synth().toDestination();
        new Tone.Part((time,note) => {
            synth.triggerAttackRelease(note.name,note.duration,time,note.velocity);
        },track.notes).start();
    }

    createLink(url: string) {
        const link = document.createElement('a');
        link.style.margin = '50px';
        link.href = url;
        link.textContent = 'Audio';
        this.parentElement.appendChild(link);
    }
}