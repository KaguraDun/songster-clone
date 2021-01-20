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
    this.renderFormSingUp = this.renderFormSingUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.hideForm = this.hideForm.bind(this);
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

  renderForm(name: string) {
    this.formContainer.innerHTML = '';

    const form = renderElement(this.formContainer, 'form', []) as HTMLFormElement;
    form.action = '/signup';

    const heading = renderElement(form, 'h2', [], name);

    const email = this.renderInput(form, 'email', 'Email', 'text');
    const emailError = renderElement(form, 'div', ['form_email-error']);

    const password = this.renderInput(form, 'password', 'Password', 'password');
    const passwordError = renderElement(form, 'div', ['form_password-error']);

    const button = renderElement(form, 'button', [], name);

    return { form, email, emailError, password, passwordError, button };
  }

  renderFormLogin() {
    this.formOverlay.classList.add(SHOW);
    this.formContainer.classList.add(SHOW);

    const form = this.renderForm('Log in');

    form.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      form.emailError.textContent = '';
      form.passwordError.textContent = '';

      // get values
      const email = form.email.value;
      const password = form.password.value;

      const res = await fetch('http://localhost:3000/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

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
    });
  }

  renderFormSingUp() {
    this.formOverlay.classList.add(SHOW);
    this.formContainer.classList.add(SHOW);

    const form = this.renderForm('Sign up');

    form.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      form.emailError.textContent = '';
      form.passwordError.textContent = '';

      // get values
      const email = form.email.value;
      const password = form.password.value;

      const res = await fetch('http://localhost:3000/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      console.log(data);

      if (data.errors) {
        form.emailError.textContent = data.errors.email;
        form.passwordError.textContent = data.errors.password;
        return;
      }

      if (data.user) {
        location.assign('/');
      }
    });
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
      const buttonLogOut = renderElement(this.parentElement, 'button', ['wrapper-user-log-out']);
      buttonLogOut.title = 'Log Out';
      buttonLogOut.addEventListener('click', this.logOut);
      return;
    }

    const buttonLogin = renderElement(this.parentElement, 'button', ['wrapper-user-login']);
    buttonLogin.addEventListener('click', this.renderFormLogin);
    buttonLogin.title = 'Log in';

    const buttonSingUp = renderElement(this.parentElement, 'button', ['wrapper-user-signup']);
    buttonSingUp.addEventListener('click', this.renderFormSingUp);
    buttonSingUp.title = 'Sing up';
  }
}
