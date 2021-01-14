export default class SearchBar{
    parentElement : HTMLElement;

    constructor(parentElement : HTMLElement){
        this.parentElement = parentElement;
    }

    render(){
        const searchBarContent = document.createElement('div');
        searchBarContent.className = 'search__content';
        // searchBarContent.textContent='Search...';
        const searchButton = document.createElement('button');
        searchButton.className = 'search__content-button';
        searchBarContent.appendChild(searchButton);
        this.parentElement.appendChild(searchBarContent);
    }
}
