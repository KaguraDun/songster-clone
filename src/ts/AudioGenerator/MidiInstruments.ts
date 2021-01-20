interface Instrument {
    number: number,
    id: string,
    name: string,
}

const instruments: Instrument[] = [
    {number: 0, id: 'standard kit', name: ''},
    {number: 1, id: 'acoustic grand piano', name: 'piano'},
    {number: 3, id: 'electric grand piano', name: 'piano'},
    {number: 5, id: 'electric piano 2', name: 'piano'},
    {number: 11, id: 'music box', name: 'xylophone'},
    {number: 19, id: 'rock organ', name: 'organ'},
    {number: 22, id: 'accordion', name: 'harmonium'},
    {number: 24, id: 'tango accordion', name: 'harmonium'},
    {number: 25, id: 'acoustic guitar (nylon)', name: 'guitar-nylon'},
    {number: 26, id: 'acoustic guitar (steel)', name: 'guitar-acoustic'},
    {number: 27, id: 'electric guitar (clean)', name: 'guitar-electric'},
    {number: 35, id: 'electric bass (finger)', name: 'bass-electric'},
    {number: 35, id: 'electric bass (pick)', name: 'bass-electric'},
    {number: 39, id: 'synth bass 1', name: 'bassoon'},
    {number: 50, id: 'string ensemble 1', name: 'violin'},
    {number: 57, id: 'trumpet', name: 'trumpet'},
    {number: 67, id: 'tenor sax', name: 'saxophone'},
    {number: 72, id: 'clarinet', name: 'clarinet'},
    {number: 62, id: 'brass section', name: 'french-horn'},
    {number: 91, id: 'pad 3 (polysynth)', name: ''},
]

export {instruments}