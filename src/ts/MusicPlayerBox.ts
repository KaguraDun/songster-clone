import renderElement from "./helpers/renderElements";
import Store from "./Store";

export default class MusicPlayerBox{
    parentElement: HTMLElement;
    store: Store;
    audio : HTMLAudioElement;
  
    
    constructor(parentElement: HTMLElement, store: Store){
        this.parentElement = parentElement;
    }


    render(){
    }
}



