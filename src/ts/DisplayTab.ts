export default class DisplayTab{
    parentElement: HTMLElement;

    constructor (parentElement : HTMLElement){
        this.parentElement = parentElement;

    }

    render(){
        const displayContent = document.createElement('section');
        displayContent.className = "display__tab";
        displayContent.style.background = 'orange';
        displayContent.style.height = '100px';
        displayContent.textContent = 'THERE WILL BE TABS';
        this.parentElement.appendChild(displayContent);
    }
}