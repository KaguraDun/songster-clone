export default class SignnIn{
    parentElement: HTMLElement;

    constructor(parentElement: HTMLElement){
        this.parentElement = parentElement;
    }

    render(){
        const signInButton = document.createElement('button');
        signInButton.className = 'header__wrapper-user-signin';
        signInButton.style.width = '30px';
        signInButton.style.background= 'white';
        signInButton.innerText='SI';
        this.parentElement.appendChild(signInButton);
        
        
    }
}