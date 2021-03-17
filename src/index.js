const Bot = require('./structures/Bot');
const Review = require('./structures/Review');
const Client = require('./managers/Client');
const AutoPoster = require('./managers/AutoPoster');
const RouteBuilder = require('./managers/RouteBuilder');

module.exports = {
    Client,
    AutoPoster,
    Bot,
    Review,
    RouteBuilder,
    default: Client,
    version: require('../package.json').version
}