import {serverUrl} from '../models/Constants'
import store from './Store'

export default class FavoriteSonsAddOrDelete {

  private FavButton: HTMLElement;
  private songId: string;
  private userId: string;
  private songDelUrl: string;
  private songAddUrl: string;
  private store: store;

  constructor(FavButton: HTMLElement, store: store) {
    this.songAddUrl = 'favorite-songs-add';
    this.songDelUrl = 'favorite-songs-delete';
    this.FavButton = FavButton;
    this.store = store
    this.init = this.init.bind(this);
    this.buttonOnClick = this.buttonOnClick.bind(this);
  }

  init() {
    this.FavButton.addEventListener('click', this.buttonOnClick);
    this.songId = this.store.selectedSongId;
    this.userId = window.localStorage.getItem('user');
  }

  buttonOnClick() {
    if (!this.FavButton.classList.contains('added')) {
      this.sendRequest(this.songAddUrl);
      this.FavButton.classList.toggle('added');
      this.FavButton.children[0].classList.toggle('gold');
    } else {
      this.sendRequest(this.songDelUrl);
      this.FavButton.classList.toggle('added');
      this.FavButton.children[0].classList.toggle('gold');
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