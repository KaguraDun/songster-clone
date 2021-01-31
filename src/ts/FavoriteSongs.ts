import {serverUrl} from '../models/Constants'

export default class FavoriteSonsAddOrDelete {

  private FavButton: HTMLElement;
  private songId: string;
  private userId: string;
  private songDelUrl: string;
  private songAddUrl: string;

  constructor(FavButton: HTMLElement) {
    this.songAddUrl = 'favorite-songs-add';
    this.songDelUrl = 'favorite-songs-delete';
    this.FavButton = FavButton;
    this.init = this.init.bind(this);
    this.buttonOnClick = this.buttonOnClick.bind(this);
  }

  init() {
    this.FavButton.addEventListener('click', this.buttonOnClick);
    this.songId = window.localStorage.getItem('songID');
    this.userId = window.localStorage.getItem('user');
  }

  buttonOnClick() {
    if (!this.FavButton.classList.contains('added')) {
      this.sendRequest(this.songAddUrl);
      this.FavButton.classList.add('added');
    } else {
      this.sendRequest(this.songDelUrl);
      this.FavButton.classList.remove('added');
    }
  }

  async sendRequest(url: string, e?: Event) {

    if(!this.songId || !this.userId) throw new Error()

    const res = await fetch(`${serverUrl}/${url}`, {
      method: 'POST',
      body: JSON.stringify({ songId: this.songId, userId: this.userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }
}