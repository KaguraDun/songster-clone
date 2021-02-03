import*as Tone from"tone";var SampleLibrary={minify:!1,ext:".[mp3|ogg]",baseUrl:"",list:["bass-electric","bassoon","cello","clarinet","contrabass","flute","french-horn","guitar-acoustic","guitar-electric","guitar-nylon","harmonium","harp","organ","piano","saxophone","trombone","trumpet","tuba","violin","xylophone"],onload:null,setExt:function(g){var o;for(o=0;o<=this.list.length-1;o++)for(var m in this[this.list[o]])this[this.list[o]][m]=this[this.list[o]][m].replace(this.ext,g);return this.ext=g,console.log("sample extensions set to "+this.ext)},load:function(g){var o,m,p;if((o=g||{}).instruments=o.instruments||this.list,o.baseUrl=o.baseUrl||this.baseUrl,o.onload=o.onload||this.onload,o.ext&&(o.ext!=this.ext&&this.setExt(o.ext),o.ext=this.ext),m={},Array.isArray(o.instruments)){for(p=0;p<=o.instruments.length-1;p++){var s=this[o.instruments[p]];if(!0===this.minify||!0===o.minify){var C=1;Object.keys(s).length>=17&&(C=2),Object.keys(s).length>=33&&(C=4),Object.keys(s).length>=49&&(C=6);var A=Object.keys(s).filter((function(g,o){return o%C!=0}));A.forEach((function(g){delete s[g]}))}m[o.instruments[p]]=new Tone.Sampler(s,{baseUrl:o.baseUrl+o.instruments[p]+"/",onload:o.onload})}return m}return s=this[o.instruments],!0!==this.minify&&!0!==o.minify||(C=1,Object.keys(s).length>=17&&(C=2),Object.keys(s).length>=33&&(C=4),Object.keys(s).length>=49&&(C=6),(A=Object.keys(s).filter((function(g,o){return o%C!=0}))).forEach((function(g){delete s[g]}))),new Tone.Sampler(s,{baseUrl:o.baseUrl+o.instruments+"/",onload:o.onload})},"bass-electric":{"A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]","A#4":"As4.[mp3|ogg]","A#5":"As5.[mp3|ogg]","C#2":"Cs2.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]","C#4":"Cs4.[mp3|ogg]","C#5":"Cs5.[mp3|ogg]",E2:"E2.[mp3|ogg]",E3:"E3.[mp3|ogg]",E4:"E4.[mp3|ogg]",E5:"E5.[mp3|ogg]",G2:"G2.[mp3|ogg]",G3:"G3.[mp3|ogg]",G4:"G4.[mp3|ogg]",G5:"G5.[mp3|ogg]"},bassoon:{A3:"A3.[mp3|ogg]",C2:"C2.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",E3:"E3.[mp3|ogg]",G1:"G1.[mp3|ogg]",G2:"G2.[mp3|ogg]",G3:"G3.[mp3|ogg]",A1:"A1.[mp3|ogg]",A2:"A2.[mp3|ogg]"},cello:{E3:"E3.[mp3|ogg]",E4:"E4.[mp3|ogg]",F2:"F2.[mp3|ogg]",F3:"F3.[mp3|ogg]",F4:"F4.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]","F#4":"Fs4.[mp3|ogg]",G2:"G2.[mp3|ogg]",G3:"G3.[mp3|ogg]",G4:"G4.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]","G#3":"Gs3.[mp3|ogg]","G#4":"Gs4.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]","A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]","A#4":"As4.[mp3|ogg]",B2:"B2.[mp3|ogg]",B3:"B3.[mp3|ogg]",B4:"B4.[mp3|ogg]",C2:"C2.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]","C#4":"Cs4.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]",D4:"D4.[mp3|ogg]","D#2":"Ds2.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]","D#4":"Ds4.[mp3|ogg]",E2:"E2.[mp3|ogg]"},clarinet:{D3:"D3.[mp3|ogg]",D4:"D4.[mp3|ogg]",D5:"D5.[mp3|ogg]",F2:"F2.[mp3|ogg]",F3:"F3.[mp3|ogg]",F4:"F4.[mp3|ogg]","F#5":"Fs5.[mp3|ogg]","A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]","A#4":"As4.[mp3|ogg]",D2:"D2.[mp3|ogg]"},contrabass:{C1:"C1.[mp3|ogg]","C#2":"Cs2.[mp3|ogg]",D1:"D1.[mp3|ogg]",E1:"E1.[mp3|ogg]",E2:"E2.[mp3|ogg]","F#0":"Fs0.[mp3|ogg]","F#1":"Fs1.[mp3|ogg]",G0:"G0.[mp3|ogg]","G#1":"Gs1.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]",A1:"A1.[mp3|ogg]","A#0":"As0.[mp3|ogg]",B2:"B2.[mp3|ogg]"},flute:{A5:"A5.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]",C6:"C6.[mp3|ogg]",E3:"E3.[mp3|ogg]",E4:"E4.[mp3|ogg]",E5:"E5.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]"},"french-horn":{D2:"D2.[mp3|ogg]",D4:"D4.[mp3|ogg]","D#1":"Ds1.[mp3|ogg]",F2:"F2.[mp3|ogg]",F4:"F4.[mp3|ogg]",G1:"G1.[mp3|ogg]",A0:"A0.[mp3|ogg]",A2:"A2.[mp3|ogg]",C1:"C1.[mp3|ogg]",C3:"C3.[mp3|ogg]"},"guitar-acoustic":{F3:"F3.[mp3|ogg]","F#1":"Fs1.[mp3|ogg]","F#2":"Fs2.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]",G1:"G1.[mp3|ogg]",G2:"G2.[mp3|ogg]",G3:"G3.[mp3|ogg]","G#1":"Gs1.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]","G#3":"Gs3.[mp3|ogg]",A1:"A1.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]","A#1":"As1.[mp3|ogg]","A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]",B1:"B1.[mp3|ogg]",B2:"B2.[mp3|ogg]",B3:"B3.[mp3|ogg]",C2:"C2.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]","C#2":"Cs2.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]","C#4":"Cs4.[mp3|ogg]",D1:"D1.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]",D4:"D4.[mp3|ogg]","D#1":"Ds1.[mp3|ogg]","D#2":"Ds2.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]",E1:"E1.[mp3|ogg]",E2:"E2.[mp3|ogg]",E3:"E3.[mp3|ogg]",F1:"F1.[mp3|ogg]",F2:"F2.[mp3|ogg]"},"guitar-electric":{"D#3":"Ds3.[mp3|ogg]","D#4":"Ds4.[mp3|ogg]","D#5":"Ds5.[mp3|ogg]",E2:"E2.[mp3|ogg]","F#2":"Fs2.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]","F#4":"Fs4.[mp3|ogg]","F#5":"Fs5.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]",A5:"A5.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]",C6:"C6.[mp3|ogg]","C#2":"Cs2.[mp3|ogg]"},"guitar-nylon":{"F#2":"Fs2.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]","F#4":"Fs4.[mp3|ogg]","F#5":"Fs5.[mp3|ogg]",G3:"G3.[mp3|ogg]",G5:"G3.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]","G#4":"Gs4.[mp3|ogg]","G#5":"Gs5.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]",A5:"A5.[mp3|ogg]","A#5":"As5.[mp3|ogg]",B1:"B1.[mp3|ogg]",B2:"B2.[mp3|ogg]",B3:"B3.[mp3|ogg]",B4:"B4.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]","C#4":"Cs4.[mp3|ogg]","C#5":"Cs5.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]",D5:"D5.[mp3|ogg]","D#4":"Ds4.[mp3|ogg]",E2:"E2.[mp3|ogg]",E3:"E3.[mp3|ogg]",E4:"E4.[mp3|ogg]",E5:"E5.[mp3|ogg]"},harmonium:{C2:"C2.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]","C#2":"Cs2.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]","C#4":"Cs4.[mp3|ogg]","C#5":"Cs5.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]",D4:"D4.[mp3|ogg]",D5:"D5.[mp3|ogg]","D#2":"Ds2.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]","D#4":"Ds4.[mp3|ogg]",E2:"E2.[mp3|ogg]",E3:"E3.[mp3|ogg]",E4:"E4.[mp3|ogg]",F2:"F2.[mp3|ogg]",F3:"F3.[mp3|ogg]",F4:"F4.[mp3|ogg]","F#2":"Fs2.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]",G2:"G2.[mp3|ogg]",G3:"G3.[mp3|ogg]",G4:"G4.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]","G#3":"Gs3.[mp3|ogg]","G#4":"Gs4.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]","A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]","A#4":"As4.[mp3|ogg]"},harp:{C5:"C5.[mp3|ogg]",D2:"D2.[mp3|ogg]",D4:"D4.[mp3|ogg]",D6:"D6.[mp3|ogg]",D7:"D7.[mp3|ogg]",E1:"E1.[mp3|ogg]",E3:"E3.[mp3|ogg]",E5:"E5.[mp3|ogg]",F2:"F2.[mp3|ogg]",F4:"F4.[mp3|ogg]",F6:"F6.[mp3|ogg]",F7:"F7.[mp3|ogg]",G1:"G1.[mp3|ogg]",G3:"G3.[mp3|ogg]",G5:"G5.[mp3|ogg]",A2:"A2.[mp3|ogg]",A4:"A4.[mp3|ogg]",A6:"A6.[mp3|ogg]",B1:"B1.[mp3|ogg]",B3:"B3.[mp3|ogg]",B5:"B5.[mp3|ogg]",B6:"B6.[mp3|ogg]",C3:"C3.[mp3|ogg]"},organ:{C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]",C6:"C6.[mp3|ogg]","D#1":"Ds1.[mp3|ogg]","D#2":"Ds2.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]","D#4":"Ds4.[mp3|ogg]","D#5":"Ds5.[mp3|ogg]","F#1":"Fs1.[mp3|ogg]","F#2":"Fs2.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]","F#4":"Fs4.[mp3|ogg]","F#5":"Fs5.[mp3|ogg]",A1:"A1.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]",A5:"A5.[mp3|ogg]",C1:"C1.[mp3|ogg]",C2:"C2.[mp3|ogg]"},piano:{A0:"A0.[mp3|ogg]",A1:"A1.[mp3|ogg]",A2:"A2.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]",A5:"A5.[mp3|ogg]",A6:"A6.[mp3|ogg]","A#0":"As0.[mp3|ogg]","A#1":"As1.[mp3|ogg]","A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]","A#4":"As4.[mp3|ogg]","A#5":"As5.[mp3|ogg]","A#6":"As6.[mp3|ogg]",B0:"B0.[mp3|ogg]",B1:"B1.[mp3|ogg]",B2:"B2.[mp3|ogg]",B3:"B3.[mp3|ogg]",B4:"B4.[mp3|ogg]",B5:"B5.[mp3|ogg]",B6:"B6.[mp3|ogg]",C0:"C0.[mp3|ogg]",C1:"C1.[mp3|ogg]",C2:"C2.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]",C6:"C6.[mp3|ogg]",C7:"C7.[mp3|ogg]","C#0":"Cs0.[mp3|ogg]","C#1":"Cs1.[mp3|ogg]","C#2":"Cs2.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]","C#4":"Cs4.[mp3|ogg]","C#5":"Cs5.[mp3|ogg]","C#6":"Cs6.[mp3|ogg]",D0:"D0.[mp3|ogg]",D1:"D1.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]",D4:"D4.[mp3|ogg]",D5:"D5.[mp3|ogg]",D6:"D6.[mp3|ogg]","D#0":"Ds0.[mp3|ogg]","D#1":"Ds1.[mp3|ogg]","D#2":"Ds2.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]","D#4":"Ds4.[mp3|ogg]","D#5":"Ds5.[mp3|ogg]","D#6":"Ds6.[mp3|ogg]",E0:"E0.[mp3|ogg]",E1:"E1.[mp3|ogg]",E2:"E2.[mp3|ogg]",E3:"E3.[mp3|ogg]",E4:"E4.[mp3|ogg]",E5:"E5.[mp3|ogg]",E6:"E6.[mp3|ogg]",F0:"F0.[mp3|ogg]",F1:"F1.[mp3|ogg]",F2:"F2.[mp3|ogg]",F3:"F3.[mp3|ogg]",F4:"F4.[mp3|ogg]",F5:"F5.[mp3|ogg]",F6:"F6.[mp3|ogg]","F#0":"Fs0.[mp3|ogg]","F#1":"Fs1.[mp3|ogg]","F#2":"Fs2.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]","F#4":"Fs4.[mp3|ogg]","F#5":"Fs5.[mp3|ogg]","F#6":"Fs6.[mp3|ogg]",G0:"G0.[mp3|ogg]",G1:"G1.[mp3|ogg]",G2:"G2.[mp3|ogg]",G3:"G3.[mp3|ogg]",G4:"G4.[mp3|ogg]",G5:"G5.[mp3|ogg]",G6:"G6.[mp3|ogg]","G#0":"Gs0.[mp3|ogg]","G#1":"Gs1.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]","G#3":"Gs3.[mp3|ogg]","G#4":"Gs4.[mp3|ogg]","G#5":"Gs5.[mp3|ogg]","G#6":"Gs6.[mp3|ogg]"},saxophone:{"D#4":"Ds4.[mp3|ogg]",E2:"E2.[mp3|ogg]",E3:"E3.[mp3|ogg]",E4:"E4.[mp3|ogg]",F2:"F2.[mp3|ogg]",F3:"F3.[mp3|ogg]",F4:"F4.[mp3|ogg]","F#2":"Fs2.[mp3|ogg]","F#3":"Fs3.[mp3|ogg]","F#4":"Fs4.[mp3|ogg]",G2:"G2.[mp3|ogg]",G3:"G3.[mp3|ogg]",G4:"G4.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]","G#3":"Gs3.[mp3|ogg]","G#4":"Gs4.[mp3|ogg]",A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]","A#2":"As2.[mp3|ogg]","A#3":"As3.[mp3|ogg]",B2:"B2.[mp3|ogg]",B3:"B3.[mp3|ogg]",C3:"C3.[mp3|ogg]",C4:"C4.[mp3|ogg]","C#2":"Cs2.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]","C#4":"Cs4.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]",D4:"D4.[mp3|ogg]","D#2":"Ds2.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]"},trombone:{"A#2":"As2.[mp3|ogg]",C2:"C2.[mp3|ogg]",C3:"C3.[mp3|ogg]","C#1":"Cs1.[mp3|ogg]","C#3":"Cs3.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]","D#1":"Ds1.[mp3|ogg]","D#2":"Ds2.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]",F1:"F1.[mp3|ogg]",F2:"F2.[mp3|ogg]",F3:"F3.[mp3|ogg]","G#1":"Gs1.[mp3|ogg]","G#2":"Gs2.[mp3|ogg]","A#0":"As0.[mp3|ogg]","A#1":"As1.[mp3|ogg]"},trumpet:{C5:"C5.[mp3|ogg]",D4:"D4.[mp3|ogg]","D#3":"Ds3.[mp3|ogg]",F2:"F2.[mp3|ogg]",F3:"F3.[mp3|ogg]",F4:"F4.[mp3|ogg]",G3:"G3.[mp3|ogg]",A2:"A2.[mp3|ogg]",A4:"A4.[mp3|ogg]","A#3":"As3.[mp3|ogg]",C3:"C3.[mp3|ogg]"},tuba:{"A#1":"As1.[mp3|ogg]","A#2":"As2.[mp3|ogg]",D2:"D2.[mp3|ogg]",D3:"D3.[mp3|ogg]","D#1":"Ds1.[mp3|ogg]",F0:"F0.[mp3|ogg]",F1:"F1.[mp3|ogg]",F2:"F2.[mp3|ogg]","A#0":"As0.[mp3|ogg]"},violin:{A3:"A3.[mp3|ogg]",A4:"A4.[mp3|ogg]",A5:"A5.[mp3|ogg]",A6:"A6.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]",C6:"C6.[mp3|ogg]",C7:"C7.[mp3|ogg]",E4:"E4.[mp3|ogg]",E5:"E5.[mp3|ogg]",E6:"E6.[mp3|ogg]",G4:"G4.[mp3|ogg]",G5:"G5.[mp3|ogg]",G6:"G6.[mp3|ogg]"},xylophone:{C7:"C7.[mp3|ogg]",G3:"G3.[mp3|ogg]",G4:"G4.[mp3|ogg]",G5:"G5.[mp3|ogg]",G6:"G6.[mp3|ogg]",C4:"C4.[mp3|ogg]",C5:"C5.[mp3|ogg]",C6:"C6.[mp3|ogg]"}};export default SampleLibrary;