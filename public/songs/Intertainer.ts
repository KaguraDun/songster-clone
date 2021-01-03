import { Clef, Duration, NoteName, Touch } from '../../src/models/Notations';
import { Chord, Measure, Section, Track } from '../../src/models/TrackDisplayType';

const measures : Measure[] = [
    {
        Id:0,
        Time:0,
        Notes: [
            {
                Notes: [
                    {
                        Name: NoteName.D,
                        Octave: 6,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.E,
                        Octave: 6,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.C,
                        Octave: 6,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.A,
                        Octave: 5,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.A,
                        Octave: 5,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.B,
                        Octave: 5,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.G,
                        Octave: 5,
                        Duration: Duration.Quarter,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Staccato,
                    }
                ]
            }
        ]
    },
    {
        Id:1,
        Time:0,
        Notes: [
            {
                Notes: [
                    {
                        Name: NoteName.D,
                        Octave: 5,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.E,
                        Octave: 5,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.C,
                        Octave: 5,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.A,
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.A,
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.B,
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.G,
                        Octave: 4,
                        Duration: Duration.Quarter,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Staccato,
                    }
                ]
            }
        ]
    },
    {
        Id:2,
        Time:0,
        Notes: [
            {
                Notes: [
                    {
                        Name: NoteName.D,
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.E,
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.C,
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.A,
                        Octave: 3,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.A,
                        Octave: 3,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.B,
                        Octave: 3,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.A,
                        Octave: 3,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Staccato,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName['G#'],
                        Octave: 3,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Staccato,
                    }
                ]
            }
        ]
    },
    {
        Id:3,
        Time:0,
        Notes: [
            {
                Notes: [
                    {
                        Name: NoteName.G,
                        Octave: 3,
                        Duration: Duration.Quarter,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Staccato
                    }
                ]
            },
            {
                Notes: [
                    {
                        Duration: Duration.Quarter,
                        IsPause: true,
                        IsDotted: false
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.B,
                        Octave: 3,
                        Duration: Duration.Quarter,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Staccato,
                    },
                    {
                        Name: NoteName.F,
                        Octave: 4,
                        Duration: Duration.Quarter,
                        IsDotted: false,
                        IsPause: false,
                    },
                    {
                        Name: NoteName.G,
                        Octave: 5,
                        Duration: Duration.Quarter,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Accent,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName.D,
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato,
                    }
                ]
            },
            {
                Notes: [
                    {
                        Name: NoteName['D#'],
                        Octave: 4,
                        Duration: Duration.Eighth,
                        IsDotted: false,
                        IsPause: false,
                        Touch: Touch.Legato
                    }
                ]
            }
        ]
    }
]

const section : Section = {
    Bpm: 90,
    Key: NoteName.C,
    Clef: Clef.Treble,
    Size: {
        Count:4,
        Per:4
    },
    Measures: measures,
}

const track : Track = {
    Instrument: 'Piano',
    Sections: [section]
}

export { track }