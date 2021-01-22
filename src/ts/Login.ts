import { SVG_SPRITE } from './helpers/svg_sprites';
import renderElement from './helpers/renderElements';

const LOGGED_IN = 'loggedIn';
const SHOW = '--show';

export default class Login {
  parentElement: HTMLElement;
  formContainer: HTMLElement;
  formOverlay: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.renderFormLogin = this.renderFormLogin.bind(this);
    this.logOut = this.logOut.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.formContainer;
    this.formOverlay;
  }

  renderInput(parentElement: HTMLElement, name: string, labelText: string, type?: string) {
    const label = renderElement(parentElement, 'label', [], labelText) as HTMLLabelElement;
    label.htmlFor = name;

    const input = renderElement(parentElement, 'input', []) as HTMLInputElement;
    input.name = name;
    input.type = type;
    input.required = true;

    return input;
  }

  async sendRequest(url: string, email: string, password: string, e?: Event) {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    return data;
  }

  renderForm() {
    this.formContainer.innerHTML = '';

    const form = renderElement(this.formContainer, 'form', []) as HTMLFormElement;
    form.action = '/signup';

    const email = this.renderInput(form, 'email', 'Email', 'text');
    email.setAttribute('value', 'Enter email...');
    email.innerText = 'Enter email...';

    email.addEventListener('focus', () => {
      email.removeAttribute('value');
    });

    const emailError = renderElement(form, 'div', ['form_email-error']);

    const password = this.renderInput(form, 'password', 'Password', 'password');
    password.setAttribute('value', 'Enter...');

    password.addEventListener('focus', () => {
      password.removeAttribute('value');
    });

    const passwordError = renderElement(form, 'div', ['form_password-error']);

    return {
      form,
      email,
      emailError,
      password,
      passwordError,
    };
  }

  async handleLogin(form: any) {
    form.emailError.textContent = '';
    form.passwordError.textContent = '';

    const data = await this.sendRequest(
      'http://localhost:3000/login',
      form.email.value,
      form.password.value,
    );

    if (data.errors) {
      form.emailError.textContent = data.errors.email;
      form.passwordError.textContent = data.errors.password;
      return;
    }

    if (data.user) {
      localStorage.setItem(LOGGED_IN, 'true');
      localStorage.setItem('user', `${data.user}`);
      location.assign('/');
    }
  }

  async handleSignIn(form: any) {
    form.emailError.textContent = '';
    form.passwordError.textContent = '';

    const data = await this.sendRequest(
      'http://localhost:3000/signup',
      form.email.value,
      form.password.value,
    );

    if (data.errors) {
      form.emailError.textContent = data.errors.email;
      form.passwordError.textContent = data.errors.password;
      return;
    }

    if (data.user) {
      location.assign('/');
    }
  }

  renderFormLogin() {
    this.formOverlay.classList.add(SHOW);
    this.formContainer.classList.add(SHOW);

    const form = this.renderForm();

    const buttonLogin = renderElement(this.formContainer, 'button', ['button-login'], 'Log in');
    const buttonSignup = renderElement(this.formContainer, 'button', ['button-signup'], 'Sign up');
    const logSocialBox = renderElement(this.formContainer, 'div', ['social']);

    const ggButton = renderElement(logSocialBox, 'button', ['gg-button']);
    const fbButton = renderElement(logSocialBox, 'button', ['fb-button']);
    fbButton.innerHTML = SVG_SPRITE.FACEBOOK;
    ggButton.innerHTML = SVG_SPRITE.GOOGLE;

    buttonLogin.addEventListener('click', () => this.handleLogin(form));
    buttonSignup.addEventListener('click', () => this.handleSignIn(form));
  }

  async logOut() {
    try {
      await fetch('http://localhost:3000/logout/', { method: 'GET', credentials: 'same-origin' });
    } catch (err) {
      console.log(err);
    }

    localStorage.clear();
    location.assign('/');
  }

  hideForm() {
    this.formOverlay.classList.remove(SHOW);
    this.formContainer.classList.remove(SHOW);
  }

  render() {
    this.formContainer = renderElement(this.parentElement, 'div', ['wrapper-user__form-container']);
    this.formOverlay = renderElement(this.parentElement, 'div', ['wrapper-user__form-overlay']);

    this.formOverlay.addEventListener('click', this.hideForm);

    if (localStorage.getItem(LOGGED_IN)) {
      const buttonLogOut = renderElement(this.parentElement, 'button', ['button-log-out']);
      buttonLogOut.title = 'Log Out';
      buttonLogOut.addEventListener('click', this.logOut);
      return;
    }

    const buttonLogin = renderElement(this.parentElement, 'button', ['button-user-login']);
    buttonLogin.addEventListener('click', this.renderFormLogin);
    buttonLogin.title = 'Log in';

    buttonLogin.innerHTML = SVG_SPRITE.LOGIN;
  }
}
