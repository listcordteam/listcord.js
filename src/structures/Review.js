/**
 * Review structure object!
 */
class Review{

    /**
     * Create a listcord review object easy and fast!
     * 
     * @param {*} data 
     * @example new Listcord.Review(data);
     */
    constructor(data){
        Object.defineProperties(this, {
            data: { value: data }
        })

        this.authorID = data.author_id;
        this.stars = data.stars;
        this.content = data.content;
        this.sentTimestamp = data.sent_at;
    }

    /**
     * Return a date object when the review was submitted at
     * @readonly
     */
    get sentAt(){
        return new Date(this.sentTimestamp);
    }

}

module.exports = Review;