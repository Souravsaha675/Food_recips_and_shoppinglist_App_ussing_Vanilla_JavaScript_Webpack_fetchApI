import Search from "./models/Search"
import {elements,renderLoader,clearLoader} from "./views/base"
import * as searchView from "./views/searchView"

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    
    if(query){
        state.search = new Search(query);

        //console.log(search);
        searchView.clearInput();

        searchView.clearResults();

        renderLoader(elements.searchResult);

        await state.search.getResults();

        clearLoader();
        //console.log(state.search.result);
        searchView.renderResults(state.search.result);
    }
} 

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPage.addEventListener("click", e => {

    const btn = e.target.closest(".btn-inline");

    if(btn) {
        const gotoPage = parseInt(btn.dataset.goto,10);

        searchView.clearResults();

        searchView.renderResults (state.search.result,gotoPage);
    }
})

 