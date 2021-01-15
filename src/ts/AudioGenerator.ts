import { Midi, Track } from '@tonejs/midi';
import * as Tone from 'tone';
import Store, { EVENTS } from './Store';

enum Volume {
    SelectedTrack = 0,
    DefaultTrack = -10,
}

export class AudioGenerator {
    private midi: Midi;
    private parentElement: HTMLElement;
    private store: Store;
    private toneTracks: Tone.Part[];
    private currentTrackId: number;

    constructor(parentElement: HTMLElement,midiData: ArrayBuffer,store: Store) {
        this.store = store;
        this.parentElement = parentElement;
        this.midi = new Midi(midiData);
        this.toneTracks = [];
        this.currentTrackId = 0;
    }

    render() {
        this.init();
        this.store.eventEmitter.addEvent(EVENTS.PLAY_BUTTON_CLICK,() => this.play());

        const button = document.createElement('button');
        button.textContent = 'click';
        this.parentElement.appendChild(button);
        button.onclick = () => this.play();

        const stop = document.createElement('button');
        stop.textContent = 'stop';
        this.parentElement.appendChild(stop);
        stop.onclick = () => Tone.Transport.stop();
    }

    init() {
        Tone.Transport.bpm.value = this.midi.header.tempos[0].bpm;
        console.log(`bpm = ${Tone.Transport.bpm.value}`);
        Tone.Transport.timeSignature = this.midi.header.timeSignatures[0].timeSignature;

        this.midi.tracks.forEach( (track,i) => {
            const volume = i === this.currentTrackId ? +Volume.SelectedTrack : +Volume.DefaultTrack;
            this.initTonePart(track,volume);
        })
    }

    initTonePart(track: Track, volumeLevel: number) {
        const volume = new Tone.Volume(volumeLevel).toDestination();
        const synth = new Tone.Synth().connect(volume);

        const part = new Tone.Part((time,note) => {
            synth.triggerAttackRelease(note.name,note.duration,time,note.velocity);
        },track.notes);
        this.toneTracks.push(part);
    }

    play(timeOffset: number = 0) {
        this.toneTracks.forEach(part => {
            part.start(undefined,timeOffset);
        });
        Tone.Transport.start(undefined,timeOffset);
    }

    setCurrentTrack(id: number) {
        this.currentTrackId = id;
    }
}