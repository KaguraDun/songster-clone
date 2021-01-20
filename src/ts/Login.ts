import renderElement from './helpers/renderElements';
import request from './request';

export default class Login {
  parentElement: HTMLElement;
  formContainer: HTMLElement;
  login: HTMLElement;
  user: string;
  cookie: string;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.renderFormLogin = this.renderFormLogin.bind(this);
    this.renderFormSingUp = this.renderFormSingUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.cookie;
    this.formContainer;
    this.login;
    this.user;
  }

  // Нужно отрефакторить

  renderFormLogin() {
    this.formContainer.style.display = 'block';

    this.formContainer.innerHTML = `<form action="/signup">
      <h2>Login</h2>
      <label for="email">Email</label>
      <input type="text" name="email" required />
      <div class="email error"></div>
      <label for="password">Password</label>
      <input type="password" name="password" required />
      <div class="password error"></div>
      <button>login</button>
    </form>`;

    const form = document.querySelector('form');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      emailError.textContent = '';
      passwordError.textContent = '';

      // get values
      const email = form.email.value;
      const password = form.password.value;

      try {
        const res = await fetch('http://localhost:3000/login/', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();

        if (data.errors) {
          emailError.textContent = data.errors.email;
          passwordError.textContent = data.errors.password;
        }

        if (data.user) {
          console.log(data);
          this.user = data.user;
          console.log(document.cookie);
          //location.assign('/');
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  renderFormSingUp() {
    this.formContainer.innerHTML = `
    <form action="/signup">
      <h2>Sign up</h2>
      <label for="email">Email</label>
      <input type="text" name="email" required />
      <div class="email error"></div>
      <label for="password">Password</label>
      <input type="password" name="password" required />
      <div class="password error"></div>
      <button>Sign up</button>
    </form>`;

    const form = document.querySelector('form');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // reset errors
      emailError.textContent = '';
      passwordError.textContent = '';

      // get values
      const email = form.email.value;
      const password = form.password.value;

      try {
        const res = await fetch('http://localhost:3000/', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        console.log(data);

        if (data.errors) {
          emailError.textContent = data.errors.email;
          passwordError.textContent = data.errors.password;
        }
        if (data.user) {
          location.assign('/');
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  async logOut() {
    // Починить logout
    //document.cookie = this.cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    try {
      await fetch('http://localhost:3000/logout/', { method: 'GET', credentials: 'same-origin' });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    this.cookie = document.cookie;
    this.formContainer = renderElement(this.parentElement, 'div', ['wrapper-user__formContainer']);

    console.log(this.user);
    console.log(document.cookie);

    if (this.cookie) {
      const buttonLogOut = renderElement(this.parentElement, 'button', ['wrapper-user__log-out']);

      buttonLogOut.addEventListener('click', this.logOut);
      return;
    }

    const buttonLogin = renderElement(this.parentElement, 'button', ['wrapper-user-login']);
    buttonLogin.addEventListener('click', this.renderFormLogin);

    const buttonSingUp = renderElement(this.parentElement, 'button', [], 'Sing Up');
    buttonSingUp.addEventListener('click', this.renderFormSingUp);
  }
}
