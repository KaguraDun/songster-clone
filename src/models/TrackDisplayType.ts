import { Duration, Clef, Size, Touch, NoteName, Alteration } from './Notations';
import Vex from 'vexflow';

export interface Song {
    Tracks: Track[];
    Name: string;
    Author: string;
    Difficulty: number;
}

export interface Track {
    Instrument: string;
    Name?: string;
    Author?: string;

    Bpm: number;
    Key: NoteName;
    Clef: Clef;
    Size: Size;  //number of beats per measure
    Measures: Measure[];
}

export interface Measure {
    Id: number;
    Time: number;
    Chords: Chord[];  // sum of all notes durations must be equal to size!!!
}

export interface Chord {
    Name?:string;
    Notes: Note[];
}

export interface Note {
    Name?: string;
    Alteration?: number;
    Octave?: number;
    Duration: string;
    IsDotted: boolean;
    IsPause: boolean;
    Touch?: Touch;
}

export interface NoteTie {
    notes: Vex.Flow.StaveNote[];
    ties: number[];
}