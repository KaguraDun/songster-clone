import '../styles/index.scss';
import SheetMusicPage from './SheetMusicPage';
import song from '../../public/songs/4.json';
import { Track } from '../models/TrackDisplayType';

const sheetMusicContainer = document.createElement('div');
sheetMusicContainer.classList.add('sheet-music__container');
document.body.append(sheetMusicContainer);

const track: Track = song.Tracks[0];
const sheetMusicPage = new SheetMusicPage(sheetMusicContainer,track);
sheetMusicPage.render();
