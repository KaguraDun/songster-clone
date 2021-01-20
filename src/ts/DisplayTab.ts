
import { Player } from "tone";
// import { AudioGenerator } from "./AudioGenerator";
// import SheetMusicPage from "./SheetMusicPage";
import Sidebar from "./Sidebar";
import Store from "./Store";
import { AudioGenerator } from "./AudioGenerator/AudioGenerator";
import RenderSong from './RenderSong';




export default class DisplayTab {
  parentElement: HTMLElement;
  displayContent: HTMLElement;
  notesContent: HTMLElement;
  store: Store;

  constructor(parentElement: HTMLElement,store: Store) {
    this.parentElement = parentElement;
    this.store = store;
  }

  render() {
    this.displayContent = document.createElement('section');
    this.displayContent.className = 'display__tab';
    // this.displayContent.setAttribute('id', 'printable');
    this.parentElement.appendChild(this.displayContent);
    this.renderSongTitle();
    const dataWrapper = document.createElement('div');
    dataWrapper.className = 'display__data';
    this.notesContent = document.createElement('div');
    this.notesContent.setAttribute('id', 'data-wrapper');
    this.notesContent.className = 'tab__content';

    dataWrapper.appendChild(this.notesContent);
    this.displayContent.appendChild(dataWrapper);
    new Sidebar(dataWrapper, this.store).render();
    this.renderSongContent();
    this.renderPlayer();

    // this.displayContent.appendChild(this.notesContent);
    //this.renderSongContent();

  }

  renderSongTitle() {
    const titleComponents = document.createElement('div');
    titleComponents.className = 'title';
    const artistName = document.createElement('div');
    artistName.className = 'title__tab-artist';
    artistName.textContent = 'Nirvana';
    const trackTitle = document.createElement('div');
    trackTitle.className = 'title__tab-track';
    trackTitle.textContent = 'Smells like Teen Spirit';
    // const iconBox = document.createElement('div');
    // iconBox.className = 'title__tab-icons';
   
    const favButton = document.createElement('button');
    favButton.className = 'title__tab-fav';
    // iconBox.appendChild(favButton);
    const titleBox = document.createElement('div');
    titleBox.className = 'title__box';
    titleBox.append(trackTitle, favButton);
    const subTitle = document.createElement('div');
    subTitle.className = 'title__sub';
    subTitle.textContent = 'Kurt Cobain - Intro/Verse Guitar - Electric Guitar (clean)';
    titleComponents.append(artistName, titleBox, subTitle);
   


    this.displayContent.appendChild(titleComponents); // коробка заголовка
  }

  renderPlayer(){
    const player = document.createElement('div'); //container
    player.className = 'player';
    const playerComponents = document.createElement('div');
    playerComponents.className = 'player__components'; //butons
    
const speedButton = document.createElement('button');
speedButton.className = 'player__btn';

const playerButtons = document.createElement('div');
playerButtons.className = 'player__buttons';

const playerSound = document.createElement('div');
playerSound.className= 'player__sound';

playerComponents.append(speedButton, playerButtons, playerSound);

// const playerProgress= document.createElement();


// <div class="container">
//   <div class="progress" id="progress"></div>
//   <audio id="audio" src="https://www.freesound.org/data/previews/338/338825_1648170-lq.mp3"></audio>
//   <button class="togglePlay" onClick="togglePlay()">Play/Pause</button>
// </div>

    this.displayContent.appendChild(player);
  }                                                                                              

  async renderSongContent() {
    const responce = await fetch('http://localhost:3000/songs/id/?id=6000521b6a4f1508a4233e03');
    //const responce = await fetch('http://localhost:3000/songs/id/?id=6000a2a200bb3e15e47d4d33');
    const {midiData, converted} = await responce.json();

    //const arrayBuffer = new ArrayBuffer(midiData.data);
    //const midi = new Midi(arrayBuffer);
    const audio = new AudioGenerator(this.notesContent,midiData.data,this.store);
    audio.init();

    const page = new RenderSong(this.notesContent,converted,this.store);
    page.render();
  }
}
