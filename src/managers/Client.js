const Bot = require('../structures/Bot');
const Review = require('../structures/Review');
const AutoPoster = require('./AutoPoster');
const { EventEmitter } = require('events');
const axios = require('axios');
const RouteBuilder = require('./RouteBuilder');

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

        if(!token) throw new TypeError('[Listcord => Client] You have not provided your Listcord API Token!');

        this.token = token;
        Object.defineProperty(this, 'baseURL', { value: 'https://listcord.xyz/api' });
    }

    /**
     * Returns an routebuilder of the listcord api!
     * 
     * @readonly
     */
    get api(){
        return RouteBuilder(this);
    }

    /**
     * Returns the bot information by the bot id!
     * 
     * @param {string} id Bot discord id
     * @example client.getBot('123456789');
     */
    async getBot(id){
        try{
            return new Bot(await this.api.bot(id).get(), this);
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
            const data = await this.api.bot(id).reviews.get();
            return data.map(x => new Review(x));
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
            const data = await this.api.bot(botID).reviews.get();
            
            for(let i = 0; i < data.length; i++){
                if(data[i].author_id == userID) return new Review(data[i]);
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
            const data = await this.api.bot(botID).voted.get({
                params: { user_id: userID }
            });

            return data.message == 'not found' ? null : {
                voted: data.voted,
                upvotedAt: data.upvoted_at,
                nextAt: data.next_at
            };
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Get a listcord bot pack data!
     * 
     * @param {string} id Listcord pack id
     * @example const pack = client.getPack('featuredfun');
     */
    async getPack(id){
        try{
            return await this.api.pack(id).get();
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Returns all listcord packs in object!
     * 
     * @example const packs = await client.getPacks();
     */
    async getPacks(){
        try{
            return await this.api.packs.get();
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Post server stats on listcord!
     * 
     * @param {string} id ID of your discord bot
     * @param {number} count The server count you want to post
     * @example await client.postStats('123456789', 100);
     */
    async postStats(id, count){
        try{
            if(isNaN(count)) throw new TypeError('[Listcord => Client.postStats] Invalid count type provided');

            return await this.api.bot(id).stats.post({
                body: { server_count: count }
            });
        }catch(e){
            this.handleError(e);
            return null;
        }
    }

    /**
     * Create an auto poster using the client class itself
     * 
     * @param {*} client Your discord.js or spotify client to post! 
     * @param {object} options Your poster options!
     * @example const poster = client.createAutoPoster(client);
     */
    createAutoPoster(client, options){
        return new AutoPoster(this.token, client, options);
    }

    /**
     * Simple error handler!
     * @protected
     */
    handleError(e){
        if(e.response){
            let data = e.response.data;
            if(data.message == 'not found') return;
            else if(data.message == 'rate limited') this.emit('rateLimit', e);
            else if(data.message == 'server error' || !data.message) this.emit('serverError', e);
            else if(data.message == 'invalid token') this.emit('invalidToken', e);
            else this.emit('error', e);
        } else this.emit('error', e);
    }

};

module.exports = Client;