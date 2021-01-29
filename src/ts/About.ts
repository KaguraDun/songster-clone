import renderElement from "./helpers/renderElements";

export default class About{
    parentElement: HTMLElement;

    constructor(parentElement: HTMLElement){
        this.parentElement  = parentElement;
    }

render(){

}

createButton(){
 const buttonAbout = renderElement(this.parentElement, 'button', ['about__button']);
 buttonAbout.addEventListener('click', this.renderAboutData);
}

createForm(){

}

renderAboutData(){

}

createLinks(){
    
}


}