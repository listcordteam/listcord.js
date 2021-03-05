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
        this.username = data.username;
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
    }

    /**
     * Return a date object when the bot was submitted at!
     * @readonly
     */
    get submittedAt(){
        return this.submittedTimestamp ? new Date(this.submittedTimestamp) : null;
    }

}

module.exports = Bot;