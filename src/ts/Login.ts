import renderElement from './helpers/renderElements';

export default class Login {
  parentElement: HTMLElement;
  login: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.renderFormLogin = this.renderFormLogin.bind(this);
    this.renderFormSingUp = this.renderFormSingUp.bind(this);
    this.login;
  }

  // Нужно отрефакторить

  renderFormLogin() {
    this.login.innerHTML = `<form action="/signup">
      <h2>Login</h2>
      <label for="email">Email</label>
      <input type="text" name="email" required />
      <div class="email error"></div>
      <label for="password">Password</label>
      <input type="password" name="password" required />
      <div class="password error"></div>
      <button>login</button>
    </form>;`;

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

  renderFormSingUp() {
    this.login.innerHTML = `
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
        console.log({ email, password });
        const res = await fetch('http://localhost:3000/signup/', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log({ email, password });
        const data = await res.json();
        console.log('user', data.user);
        console.log('date', data);
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

    try {
      await fetch('http://localhost:3000/logout/', { method: 'GET', credentials: 'same-origin' });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const loginButton = document.createElement('button');
    loginButton.className = 'wrapper-user-login';
    this.parentElement.appendChild(loginButton);

    this.login = renderElement(this.parentElement, 'div', ['login']);

    const buttonLogin = renderElement(this.login, 'button', ['nav__list'], 'Login');
    buttonLogin.addEventListener('click', this.renderFormLogin);

    const buttonSingUp = renderElement(this.login, 'button', ['nav__list'], 'Sing Up');
    buttonSingUp.addEventListener('click', this.renderFormSingUp);

    const buttonLogOut = renderElement(this.login, 'button', ['nav__list'], 'Log out');
    buttonLogOut.addEventListener('click', this.logOut);
  }
}
