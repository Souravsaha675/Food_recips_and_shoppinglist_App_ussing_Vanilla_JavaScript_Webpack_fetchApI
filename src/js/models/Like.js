export default class Likes{
    constructor(){
        this.Likes=[];
    }

    addLikes(id,title,author,image_url){
        const like={
            id,
            title,
            author,
            image_url
        };

        this.Likes.push(like);

        return like;
    }

    deleteLike(id){
        const index=this.Likes.findIndex(item => item.id===id);

        this.Likes.splice(index,1);
    }

    isLiked(id){
        return this.Likes.findIndex(like => like.id===id) !== -1;
    }

    getNumberOfLikes(){
        return this.Likes.length;
    }
}
