import * as Tone from 'tone';
import Store, { EVENTS } from '../Store';

export class Metronome {
    metronomeLoop: Tone.Loop;
    volume: Tone.Volume;
    volumeLevel: number = -30;

    timeSignature: number[];
    store: Store;

    constructor(timeSignature: number[],store: Store) {
        this.timeSignature = timeSignature;
        this.store = store;

        this.toggle = this.toggle.bind(this);
    }

    dispose() {
        this.store.eventEmitter.removeEvent(EVENTS.TOGGLE_METRONOME,this.toggle);

        this.stop();
    }

    init() {
        this.store.eventEmitter.addEvent(EVENTS.TOGGLE_METRONOME,this.toggle);

        this.initLoop();
    }

    initLoop() {
        this.volume = new Tone.Volume(this.volumeLevel).toDestination();
        const synth = new Tone.NoiseSynth().connect(this.volume);
        this.metronomeLoop = new Tone.Loop((time) => {
            synth.triggerAttackRelease(`${this.timeSignature[0]}n`);
        },`${this.timeSignature[1]}n`);
    }

    start() {
        if (this.store.isMetronomeEnabled) {
            this.metronomeLoop.start();
        }
    }

    stop() {
        if (!this.store.isMetronomeEnabled) {
            this.metronomeLoop.stop();
        }
    }

    toggle() {
        this.metronomeLoop.mute = !this.store.isMetronomeEnabled;
        if (this.store.isMetronomeEnabled) {
            this.start();
        }
    }

    mute(flag: boolean) {
        this.metronomeLoop.mute = flag;
    }

    changeVolume(value: number) {
        this.volumeLevel = value;
        this.volume.volume.value = value;
    }
}