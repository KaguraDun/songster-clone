import { SVG_SPRITE } from "./helpers/svg_sprites";

export default class Login {
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    const loginButton = document.createElement('button');
    loginButton.className = 'wrapper-user-login';
    loginButton.innerHTML = SVG_SPRITE.LOGIN;
    this.parentElement.appendChild(loginButton);
  }
}
