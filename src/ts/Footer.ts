export default class Footer {
    parentElement : HTMLElement;


    constructor(parentElement: HTMLElement ){
        this.parentElement = parentElement;
    }

    render(){
        const footerDiv = document.createElement('div');
        const schoolLogo = document.createElement('div');
        schoolLogo.className = 'school__logo';
        schoolLogo.innerHTML = 'Im FOOTER';
        schoolLogo.style.background='red';
        footerDiv.appendChild(schoolLogo);
        this.parentElement.appendChild(footerDiv);

    }
}