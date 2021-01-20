import { DuoSynth } from 'tone';
import DisplayTab from './DisplayTab';
import Store, { EVENTS } from './Store';


const SVG_SPRITE: any = {
  FULL_SCREEN: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 322.113 322.113" style="enable-background:new 0 0 322.113 322.113;" xml:space="preserve class='btn_fullScreen'">
<g transform="translate(0 -562.36)">
<g>
 <g>
   <path d="M322.043,723.066v-146.5c0-7.9-6.3-14.2-13.7-14.2h-147.1c-18.9-0.5-18.9,28.4,0,27.8h132.9v132.9
     c0,7.9,6.3,14.7,14.2,14.2C316.243,737.266,322.543,730.966,322.043,723.066z"/>
   <path d="M160.743,856.667h-132.9v-132.9c0.6-8-6.3-14.3-14.1-14.3v0c-7.4,0-13.7,6.3-13.7,14.2v147.1c0,7.4,6.3,13.7,14.2,13.7
     h146.5C179.643,884.966,179.643,856.667,160.743,856.667z"/>
   <path d="M209.643,660.566L209.643,660.566c-3.7,0-6.8,1.6-9.5,4.2l-97.7,97.7c-13.7,13.1,6.3,33.6,19.4,19.4l98.2-97.7
     C229.043,675.266,222.743,660.066,209.643,660.566z"/>
 </g>
</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`,
  METRONOME: `<svg height="512pt" viewBox="-41 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m327.820312 292.304688-18.648437 29.433593c9.769531 3.539063 19.207031 7.476563 29.183594 12.570313zm0 0"/><path d="m348.808594 375.96875c-77.804688-59.382812-252.234375-59.613281-330.238282.132812l-16.878906 67.269532c-8.75 34.929687 17.578125 68.628906 53.339844 68.628906h257.347656c35.78125 0 62.082032-33.734375 53.339844-68.628906zm-135.109375 45.652344h-60c-8.28125 0-15-6.710938-15-15 0-8.28125 6.71875-15 15-15h60c8.289062 0 15 6.71875 15 15 0 8.289062-6.710938 15-15 15zm0 0"/><path d="m168.703125 301.527344v-30.527344h-15c-8.285156 0-15-6.714844-15-15s6.714844-15 15-15h15v-30.25h-15c-8.285156 0-15-6.714844-15-15s6.714844-15 15-15h15v-30.25h-15c-8.285156 0-15-6.714844-15-15s6.714844-15 15-15h15v-18.136719c0-8.285156 6.714844-15 15-15s15 6.714844 15 15v18.136719h15c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15h-15v30.25h15c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15h-15v30.25h15c8.285156 0 15 6.714844 15 15s-6.714844 15-15 15h-15v30.53125c5.765625.199219 11.480469.523438 17.152344.953125l82.042969-129.464844-25.820313-102.929687c-9.765625-41.277344-46.089844-70.089844-88.375-70.089844s-78.605469 28.8125-88.375 70.082031l-66.28125 264.230469c41.535156-21.234375 92.253906-31.121094 139.65625-32.785156zm0 0"/><path d="m423.101562 58.988281c-7-4.4375-16.261718-2.359375-20.703124 4.640625l-18.359376 28.972656c-41.382812-9.847656-71.996093 38.566407-45.578124 71.910157l-89.902344 141.859375c10.769531 1.71875 21.28125 3.878906 31.421875 6.46875l83.847656-132.320313c41.359375 9.363281 71.007813-38.609375 45.410156-71.640625l18.5-29.199218c4.441407-6.988282 2.363281-16.257813-4.636719-20.691407zm-49.402343 92.640625c-8.269531 0-15-6.789062-15-15.128906s6.730469-15.121094 15-15.121094c8.230469 0 15 6.753906 15 15.121094 0 8.339844-6.730469 15.128906-15 15.128906zm0 0"/></svg>`,
  GUITAR: `<?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
  <g>
    <g>
      <path d="M463.444,0.874l-26.16,22.581L413.83,0l-21.228,21.228l21.896,21.896l-8.475,7.316l-25.05-25.05l-21.228,21.228
        l23.491,23.491l-25.65,22.141l17.779,17.778l-121.36,121.36l-8.988-5.779c-1.51-0.971-2.206-2.787-1.732-4.518l6.124-22.354
        c4.051-14.786-2.049-30.142-15.18-38.212c-12.928-7.946-29.125-6.479-40.308,3.651c-0.391,0.354-0.762,0.708-1.114,1.059
        c-19.004,19.005-26.974,34.431-34.006,48.041c-6.464,12.511-12.047,23.316-25.785,37.054
        c-9.943,9.943-22.827,14.829-37.746,20.485c-16.611,6.298-35.437,13.437-51.248,29.246
        c-27.272,27.274-36.121,57.247-26.301,89.087c8.645,28.03,30.488,52.36,48.551,70.424c18.063,18.063,42.391,39.906,70.423,48.551
        c8.389,2.587,16.644,3.878,24.759,3.878c22.683-0.001,44.24-10.095,64.329-30.183c15.81-15.811,22.948-34.637,29.246-51.248
        c5.656-14.918,10.541-27.802,20.484-37.745c9.725-9.724,17.438-13.344,26.37-17.537c9.997-4.692,21.328-10.01,34.677-23.359
        c2.973-2.973,6.123-7.268,9.629-13.131c6.408-10.714,6.51-23.58,0.272-34.418c-6.167-10.715-17.66-17.246-30.023-17.119
        l-28.275,0.358c-1.884,0.07-3.535-1.235-4.008-3.063l-1.224-4.73l131.115-131.115l20.124,20.124l63.988-81.948L463.444,0.874z
         M156.125,427.664l-57.947-57.949l21.229-21.228l57.947,57.949L156.125,427.664z M195.028,377.744l-46.929-46.932l21.229-21.228
        l46.929,46.932L195.028,377.744z"/>
    </g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  </svg>
  `,
  PRINTER: `<svg id="Layer" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m414 80h-316c-5.523 0-10-4.477-10-10v-26c0-24.301 19.699-44 44-44h248c24.301 0 44 19.699 44 44v26c0 5.523-4.477 10-10 10z"/><path d="m458 112h-404c-29.776 0-54 24.224-54 54v188c0 29.776 24.224 54 54 54h34v-80c0-39.701 32.299-72 72-72h192c39.701 0 72 32.299 72 72v80h34c29.776 0 54-24.224 54-54v-188c0-29.776-24.224-54-54-54zm-361.98 120c-13.255 0-24.005-10.745-24.005-24s10.74-24 23.995-24h.01c13.255 0 24 10.745 24 24s-10.745 24-24 24z"/><path d="m352 304h-192c-13.255 0-24 10.745-24 24v80 32c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24v-32-80c0-13.255-10.745-24-24-24z"/></svg>`,
};
export default class Sidebar {
  parentElement: HTMLElement;
  sideBarContent: HTMLElement;
  dropDownGithub: HTMLElement;
  functionButtons: HTMLElement;
  extraButtons: HTMLElement;
  fullScreenBtn: HTMLButtonElement;
  store: Store;
  
  

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
  }

  render() {
    this.sideBarContent = document.createElement('section');
    this.sideBarContent.className = 'sidebar';
    this.parentElement.appendChild(this.sideBarContent);
    this.functionButtons = document.createElement('div');
    this.functionButtons.className = 'sidebar__function';
    this.extraButtons = document.createElement('div');
    this.extraButtons.className = 'sidebar__extra';
    this.sideBarContent.append(this.functionButtons, this.extraButtons);
    this.fullScreenBtn = this.createFullScreenButton();
    this.fullScreenBtn.addEventListener('click', this.openfullScreenMode);

    this.createInstrumentButton();
    this.createMetronomeButton();
    this.createPrintButton();
  }


  createFullScreenButton() {
    const fullScreen = document.createElement('button');
    fullScreen.className = 'sidebar__button-fullscreen';
    fullScreen.innerHTML = SVG_SPRITE.FULL_SCREEN;
    console.log(fullScreen.innerHTML);
    return this.functionButtons.appendChild(fullScreen);
  }

  createPlayButton() {
    const playButton = document.createElement('button');
    playButton.className = 'sidebar__button-play';
    this.sideBarContent.appendChild(playButton);

    playButton.addEventListener('click', () => this.store.playSong());

  }

  createMetronomeButton() {
    const metronomeButton = document.createElement('button');
    metronomeButton.className = 'sidebar__button-metronome';
    metronomeButton.innerHTML = SVG_SPRITE.METRONOME;
    this.functionButtons.appendChild(metronomeButton);
  }

  createInstrumentButton() {
    const instrumentButton = document.createElement('button');
    instrumentButton.className = 'sidebar__button-instrument';
    instrumentButton.innerHTML = SVG_SPRITE.GUITAR;
    this.functionButtons.appendChild(instrumentButton);
  }
  createPrintButton() {
    const printButton = document.createElement('button');
    printButton.className = 'sidebar__button-print';

    printButton.innerHTML = SVG_SPRITE.PRINTER;
    this.extraButtons.appendChild(printButton);


  }

  openfullScreenMode() {
    const elem = document.getElementById('data-wrapper');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    
    }
  }
}

