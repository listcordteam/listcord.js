const axios = require('axios');
const { EventEmitter } = require('events');

const isSupportedLib = (pkg, client) => {
    try{
        return client instanceof require(pkg).Client
    }catch(e){
        return false;
    }
}

/**
 * Easy to use autoposter!
 */
class AutoPoster extends EventEmitter{

    /**
     * It might be difficult to post server count manually so autoposter makes it easy with many utility methods!
     * 
     * @param {string} token Your listcord token
     * @param {*} client Your discord.js or eris client!
     * @param {object} options You options
     * @extends new Listcord.AutoPoster('token', client);
     */
    constructor(token, client, options = { interval: 900000, startOnInitiate: true }){
        super();
        
        if(typeof token != 'string') throw new TypeError('[Listcord => AutoPoster] Invalid listcord token provided!');
        this.token = token;

        if(isSupportedLib('discord.js', client)) this.library = 'discord.js';
        else if(isSupportedLib('eris', client)) this.library = 'eris';
        else throw new TypeError('[Listcord => AutoPoster] Invalid client has been provided!');
        
        Object.defineProperties(this, {
            client: { value: client },
            baseURL: { value: 'https://listcord.xyz/api' }
        });

        this._id = null;
        if(options.interval && !isNaN(options.interval) && options.interval < 900000) throw new TypeError('[Listcord => AutoPoster] Invalid interval duration!');
        this.interval = options.interval || 1.2e+6;

        if(options.startOnInitiate){
            this.stopped = false;
            this.start();
        } else this.stopped = true;
    }

    /**
     * Starts posting only if it was stopped previously or was stopped from first using options.startOnInititae
     * @example poster.start();
     */
    start(){
        if(!this.stopped) return;
        this.emit('start');
        if(this.library == 'discord.js'){
            this.post(this.client.user.id, this.client.guilds.cache.size);
            this._id = setInterval(() => { this.post(this.client.user.id, this.client.guilds.cache.size); }, this.interval);
        }else if(this.library == 'eris'){
            this.post(this.client.user.id, this.client.guilds.size);
            this._id = setInterval(() => { this.post(this.client.user.id, this.client.guilds.size); }, this.interval);
        }
    }

    /**
     * You can use this method in client.postStats instead of using this!
     * 
     * @param {string} id Your discord bot id
     * @param {number} count Your server count to post
     * @example await poster.post('123456789', 200)
     */
    async post(id, count){
        try{
            const { data } = await axios({
                method: 'POST',
                url: this.baseURL + '/bot/' + id + '/stats',
                headers: { Authorization: this.token },
                data: { server_count: count }
            });

            this.emit('post', data);
        }catch(e){
            this.emit('error', e);
        }
    }

    /**
     * Stops posting
     * @example poster.stop()
     */
    stop(){
        this.emit('stop');
        this.stopped = true;
        clearInterval(this._id);
    }

}

module.exports = AutoPoster;