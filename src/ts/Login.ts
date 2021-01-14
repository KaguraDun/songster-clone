export default class Login{
    parentElement: HTMLElement;

    constructor(parentElement: HTMLElement){
        this.parentElement = parentElement;
    }

    render(){
        const loginButton = document.createElement('button');
        loginButton.className = 'header__wrapper-user-login';
        loginButton.style.width = '30px';
        loginButton.style.background= 'white';
        loginButton.innerText= "LI";
        this.parentElement.appendChild(loginButton);
        
        
    }
}