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
        const input = document.createElement('input');
        this.parentElement.appendChild(input);
        input.type = 'text';

        const button = document.createElement('button');
        button.textContent = 'click';
        this.parentElement.appendChild(button);
        button.onclick = () => {
            const time = +input.value;
            Tone.Transport.cancel(0);
            this.playAudio(time);
        }

        const stop = document.createElement('button');
        stop.textContent = 'stop';
        this.parentElement.appendChild(stop);
        stop.onclick = async () => {
            Tone.Transport.stop();
        }
    }

    playAudio(timeOffset: number) {
        Tone.Transport.bpm.value = this.midi.header.tempos[0].bpm;
        Tone.Transport.timeSignature = this.midi.header.timeSignatures[0].timeSignature;

        this.midi.tracks.forEach(track => {
            this.playTrack(track,timeOffset);
        });
        Tone.Transport.start(undefined,timeOffset);
    }

    playTrack(track: Track,timeOffset: number) {
        const synth = new Tone.Synth().toDestination();
        new Tone.Part((time,note) => {
            synth.triggerAttackRelease(note.name,note.duration,time,note.velocity);
        },track.notes).start(undefined,timeOffset);
    }

    createLink(url: string) {
        const link = document.createElement('a');
        link.style.margin = '50px';
        link.href = url;
        link.textContent = 'Audio';
        this.parentElement.appendChild(link);
    }
}