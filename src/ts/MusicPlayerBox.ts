import renderElement from "./helpers/renderElements";
import Store, { EVENTS } from "./Store";

export default class MusicPlayerBox{
    parentElement: HTMLElement;
    playButton: HTMLElement;
    store: Store;  
    
    constructor(parentElement: HTMLElement, store: Store){
        this.parentElement = parentElement;
        this.store = store;

        this.playSong = this.playSong.bind(this);
    }

    render(){
        this.renderPlayButton();
    }

    renderPlayButton() {
        this.playButton = renderElement(this.parentElement, 'button', ['player__buttons-play']);
        this.playButton.textContent = 'Play';
        this.playButton.addEventListener('click',this.playSong);
    }

    playSong() {
        this.store.playSong();
    }
}



