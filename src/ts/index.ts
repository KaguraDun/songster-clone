import '../styles/index.scss';
import EventEmitter from './EventEmitter';
import SheetMusicPage from './SheetMusicPage';
import song from '../../public/songs/1.json';
import { Track } from '../models/TrackDisplayType';

const eventEmitter = new EventEmitter();

const sheetMusicContainer = document.createElement('div');
sheetMusicContainer.classList.add('sheet-music__container');
document.body.append(sheetMusicContainer);

const track: Track = song.Tracks[0];
const sheetMusicPage = new SheetMusicPage(sheetMusicContainer, song, eventEmitter);
sheetMusicPage.render();
