const axios = require('axios');
const { EventEmitter } = require('events');

const isSupportedLib = (pkg, client) => {
    try{
        return client instanceof require(pkg).Client
    }catch(e){
        return false;
    }
}

class AutoPoster extends EventEmitter{

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

    stop(){
        this.emit('stop');
        this.stopped = true;
        clearInterval(this._id);
    }

}

module.exports = AutoPoster;