const Bot = require('./structures/Bot');
const Review = require('./structures/Review');
const Client = require('./managers/Client');
const AutoPoster = require('./managers/AutoPoster');

module.exports = {
    Client,
    AutoPoster,
    Bot,
    Review,
    default: Client,
    version: require('../package.json').version
}