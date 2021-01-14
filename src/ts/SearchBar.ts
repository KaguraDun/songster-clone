export default class SearchBar{
    parentElement : HTMLElement;

    constructor(parentElement : HTMLElement){
        this.parentElement = parentElement;
    }

    render(){
        const searchBarContent = document.createElement('div');
        searchBarContent.className = 'search__content';
        searchBarContent.textContent='Search...';
        this.parentElement.appendChild(searchBarContent);
    }
}
