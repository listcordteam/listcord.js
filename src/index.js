const { EventEmitter } = require('events');
const axios = require('axios');

/**
 * The main listcord api client class
 */
class Client extends EventEmitter{

    /**
     * The listcord api client class. Make sure to store your token in .env file!
     * 
     * @param {string} token The api token of your listcord profile!
     * @example new Listcord.Client(process.env.LISTCORD_API_TOKEN);
     */
    constructor(token){
        super();

        if(!token) throw new Error('You have not provided your Listcord API Token!');

        this.token = token;
        Object.defineProperty(this, 'baseURL', { value: 'https://listcord.xyz/api' });
    }

    /**
     * Returns the bot information by the bot id!
     * 
     * @param {string} id Bot discord id
     * @example client.getBot('123456789');
     */
    async getBot(id){
        try{
            const { data } = await axios({
                method: 'POST',
                url: this.baseURL + '/bot/' + id,
                headers: { token: this.token }
            });

            return data.message == 'not found' ? null : data;
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Returns an array of reviews of the bot by the bot id!
     * 
     * @param {string} id Bot discord id
     * @example client.getBotReviews('123456789');
     */
    async getBotReviews(id){
        try{
            const { data } = await axios({
                method: 'POST',
                url: this.baseURL + '/bot/' + id + '/reviews',
                headers: { token: this.token }
            });

            return data.message == 'not found' ? [] : data;
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Returns a review information by the discord user id and the discord bot id!
     * 
     * @param {string} userID The discord id of the user who reviewed it
     * @param {string} botID The discord id of the bot which is registered in listcord where the user has reviewed!
     * @example client.getReview('123456789', '987654321');
     */
    async getReview(userID, botID){
        try{
            const { data } = await axios({
                method: 'POST',
                url: this.baseURL + '/bot/' + botID + '/reviews',
                headers: { token: this.token }
            });
            
            for(let i = 0; i < data.length; i++){
                if(data[i].author_id == userID) return data[i];
            }

            return null;
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Verify if a paticular user has voted a paticular bot!
     * 
     * @param {string} userID The discord id of the voter
     * @param {string} botID The discord id of the bot to be voted
     * @example client.hasVoted('123456789', '987654321');
     */
    async hasVoted(userID, botID){
        try{
            const { data } = await axios({
                method: 'POST',
                url: this.baseURL + '/bot/' + botID + '/voted?user_id=' + userID,
                headers: { token: this.token }
            });

            return data.message == 'not found' ? null : data;
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Search bots in the botlist using this method!
     * 
     * @param {string} query Search query to search bots within the botlist!
     * @example client.search('shazam');
     */
    async search(query){
        if(!query) throw new Error('Missing query to search bots!');

        try{
            const { data } = await axios({
                method: 'POST',
                url: this.baseURL + '/bots?q='+ encodeURIComponent(query),
                headers: { token: this.token }
            });

            return data;
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Simple error handler!
     * @protected
     */
    handleError(e){
        if(e.response){
            let data = e.response.data;
            if(data.message == 'rate limited') this.emit('rateLimit', e);
            else if(data.message == 'server error') this.emit('serverError', e);
            else this.emit('error', e);
        } else this.emit('error', e);
    }

};

module.exports.Client = Client;
module.exports.default = Client;
module.exports.version = require('../../../Listcord/package.json').version;