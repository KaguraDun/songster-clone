export default class Sidebar{
    parentElement : HTMLElement;

    constructor(parentElement : HTMLElement){
        this.parentElement = parentElement;
    }


    render(){
        const sideBarContent = document.createElement('section');
        sideBarContent.style.background = 'green';
        sideBarContent.style.height = '50px';
        sideBarContent.textContent = 'THIS IS SIDEBAR';
        this.parentElement.appendChild(sideBarContent);
    }
}