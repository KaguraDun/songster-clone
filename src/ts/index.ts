import '../styles/index.scss';
import SheetMusicPage from './SheetMusicPage';

const sheetMusicContainer = document.createElement('div');
sheetMusicContainer.classList.add('sheet-music__container');
document.body.append(sheetMusicContainer);

const sheetMusicPage = new SheetMusicPage(sheetMusicContainer);
sheetMusicPage.render();
