import '../styles/index.scss';
import SheetMusicPage from './SheetMusicPage';
import song from '../../public/songs/1.json';
import { Track } from '../models/TrackDisplayType';
import Store, { EVENTS } from './Store';

const store = new Store();
store.init();

const sheetMusicContainer = document.createElement('div');
sheetMusicContainer.classList.add('sheet-music__container');
document.body.append(sheetMusicContainer);

const track: Track = song.Tracks[0];
const sheetMusicPage = new SheetMusicPage(sheetMusicContainer, song, store);

sheetMusicPage.render();

store.eventEmitter.addEvent(EVENTS.TIME_MARKER_POSITION_CHANGED, () => {
  console.log(store.songTime);
});
