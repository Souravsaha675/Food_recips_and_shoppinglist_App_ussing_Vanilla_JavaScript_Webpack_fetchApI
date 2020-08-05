export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResultsList: document.querySelector(".results__list"),
    searchResult : document.querySelector(".results"),
    searchResultPage : document.querySelector(".results__pages"),
    recipes : document.querySelector(".recipe"),
    shoppingList : document.querySelector(".shopping__list"),
    likesMenu : document.querySelector(".likes__field"),
    likesList : document.querySelector(".likes__list") 
}

export const elementString = {
    loader: "loader"
};

export const renderLoader = parent =>{
    
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div> 
    `;

    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}