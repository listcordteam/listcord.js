/**
 * Bot structure object!
 */
class Bot{

    /**
     * Create a bot object easy and fast!
     * 
     * @param {*} data 
     * @param {Client} client 
     * @example new Listcord.Bot(data, client);
     */
    constructor(data, client){
        Object.defineProperties(this, {
            data: { value: data },
            client: { value: client }
        })

        this.id = data.id;
        this.username = data.name;
        this.avatarURL = data.avatar;
        this.description = data.description;
        this.developers = data.developers;
        this.requiredPermissions = data.required_permissions;
        this.upvotes = data.upvotes;
        this.supportServer = data.support_server;
        this.website = data.website;
        this.tags = data.tags;
        this.prefix = data.prefix;
        this.submittedTimestamp = data.submitted_at;
        this.serverCount = data.servers || 0;
        this.isApproved = data.approved;

        if(data.certified){
            this.isCertified = data.certified;
            this.vanityID = data.vanity;
        }
    }

    /**
     * Return a date object when the bot was submitted at!
     * @readonly
     */
    get submittedAt(){
        return this.submittedTimestamp ? new Date(this.submittedTimestamp) : null;
    }

    /**
     * Returns listcord vanity url only if its exists!
     * @readonly
     */
    get vanityURL(){
        return this.vanityID ? `https://listcord.gg/x/${this.vanityID}` : null;
    }

    /**
     * Return all the reviews of the bot!
     * @example bot.getReviews();
     */
    async getReviews(){
        return await this.client.getBotReviews(this.id);
    }

    /**
     * Post server count to the listcord
     * @param {number} count Server count of your bot!
     */
    async postStats(count){
        return await this.client.postStats(this.id, count);
    }

    async edit({
        description = this.description.short,
        serverCount = this.serverCount,
        status = this.status
    })

}

module.exports = Bot;
