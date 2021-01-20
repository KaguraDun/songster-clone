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

    buttonLogin.innerHTML=`<svg width="512" height="513" viewBox="0 0 512 513" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M252.352 246.633C286.234 246.633 315.574 234.48 339.547 210.504C363.52 186.531 375.672 157.199 375.672 123.312C375.672 89.4375 363.52 60.1016 339.543 36.1211C315.566 12.1523 286.23 0 252.352 0C218.465 0 189.133 12.1523 165.16 36.125C141.188 60.0977 129.031 89.4336 129.031 123.312C129.031 157.199 141.188 186.535 165.164 210.508C189.141 234.477 218.477 246.633 252.352 246.633V246.633Z" fill="#F5F5F5"/>
    <path d="M468.129 393.703C467.438 383.727 466.039 372.844 463.98 361.352C461.902 349.773 459.227 338.828 456.023 328.824C452.715 318.484 448.215 308.273 442.652 298.488C436.879 288.332 430.098 279.488 422.488 272.211C414.531 264.598 404.789 258.477 393.523 254.012C382.297 249.57 369.855 247.32 356.547 247.32C351.32 247.32 346.266 249.465 336.504 255.82C330.496 259.738 323.469 264.27 315.625 269.281C308.918 273.555 299.832 277.559 288.609 281.184C277.66 284.727 266.543 286.523 255.57 286.523C244.598 286.523 233.484 284.727 222.523 281.184C211.312 277.562 202.227 273.559 195.527 269.285C187.758 264.32 180.727 259.789 174.629 255.816C164.879 249.461 159.82 247.316 154.594 247.316C141.281 247.316 128.844 249.57 117.621 254.016C106.363 258.473 96.6172 264.594 88.6523 272.215C81.0469 279.496 74.2617 288.336 68.4961 298.488C62.9375 308.273 58.4375 318.48 55.125 328.828C51.9258 338.832 49.25 349.773 47.1719 361.352C45.1133 372.828 43.7148 383.715 43.0234 393.715C42.3438 403.512 42 413.68 42 423.949C42 450.676 50.4961 472.312 67.25 488.27C83.7969 504.016 105.691 512.004 132.316 512.004H378.848C405.473 512.004 427.359 504.02 443.91 488.27C460.668 472.324 469.164 450.684 469.164 423.945C469.16 413.629 468.813 403.453 468.129 393.703V393.703Z" fill="#F5F5F5"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="512" height="512.002" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `;

  }
}
