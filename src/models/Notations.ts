export enum Duration { // size of note in fractions of quarter
    'Whole' = 'w',
    'Half' = 'h',
    'Quarter' = 'q',
    'Eighth' = '8',
    'Sixteen' ='16',
    'ThirtySecond' = '32',

    'WholeWithDot' = 'wd',
    'HalfWithDot' = 'hd',
    'QuarterWithDot' = 'qd',
    'EighthWithDot' = '8d',
    'SixteenWithDot' = '16d',
    'ThirtySecondWithDot' = '32d',

    'EighthTriplet' = 0.33,
    'QuarterTriplet' = 0.67,
    'EighthQuintol' = 0.2,
    'QuarterQuintol' = 0.4
}

export enum Clef {
    'bass',
    'treble',
    'tenor',
    'alto',
    'soprano',
    'percussion',
    'mezzo-soprano',
    'baritone-c',
    'baritone-f',
    'subbass',
    'french',
}

export interface Size { // number of beats per measure = Count/Per
    Count: number;
    Per: number;
}

export enum Touch {
    Staccato,
    Accent,
    Legato,
    NonLegato,
    Marcato
}

export enum NoteName {
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
    'B#'
}