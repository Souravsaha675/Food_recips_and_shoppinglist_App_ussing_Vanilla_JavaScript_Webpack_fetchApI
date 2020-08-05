import {elements} from './base';
import {limitRecipeTitle} from './searchView'

export const toggleLiked =isLiked =>{
    const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";

    document.querySelector(".recipe__love use") .setAttribute("href",`img/icons.svg#${iconString}`);

};

export const toggleLikeMenu = numlikes =>{
    elements.likesMenu.style.visibility =numlikes >0 ? "visible" :"hidden";

};

export const renderLikke = like=>{
    const MarkUp=`
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.image_url}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;

    elements.likesList.insertAdjacentHTML("beforeend",MarkUp);
}

export const deleteLike=id=>{
    const item= document.querySelector(`.likes__link[href*="${id}"]`).parentElement;

    if(item) item.parentElement.removeChild(item);
}