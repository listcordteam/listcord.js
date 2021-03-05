# Listcord.js

An official wrapper for listcord api! As this library lacks in documentation kindly make an issue or contact us on discord for doubts!

> View https://listcord.xyz/apidocs to view the raw api documentation!

## Installation

```sh
npm i listcord.js
```

## Getting started

> Get your api token from https://listcord.xyz/me. Listcord api is currently only available only for those who has bots registered in our botlist! After getting your token, make sure you save it in `.env` file!

```js
const Listcord = require('listcord.js');
const client = new Listcord.Client(process.env.LISTCORD_API_TOKEN);

client.getBot('some bot id').then(x => console.log(x));
```

## Methods

Basic methods of listcord api!

```js
await client.getBot('801976787264471120'); // Returns you the information of the bot!
await client.getBotReviews('801976787264471120'); // Returns you array of reviews of the bot!
await client.getReview('user id', 'bot id'); // Returns the review details by the discord id of the reviewer and the bot which was reviewed!
await client.getPack('featuredfun'); // Returns the bot packs information which has id 'featuredfun'
await client.getPacks(); // Returns all packs in a object refer Listcord.APITypes.Botpacks for types!
await client.hasVoted('user id', 'bot id'); // Verify if particular user has voted a paticular bot by id!
```

## Post stats

You can either post stats using `Listcord.AutoPoster` or either `Listcord.Client.prototype.postStats`!

```js
const { success, message } = await client.postStats('801976787264471120', 100 /** Server count. */ );
console.log(success ? 'Success' : `Failed: ${message}`);
```

### AutoPoster

Autoposter supports `eris` and `discord.js` libraries!

```js
const poster = client.createAutoPoster(client, /** Discord client */ {
    interval: 900000, // Default
    startOnInitiate: true // Default
})

poster.on('post', (response) => console.log(response)); // Emits when on successful post
poster.on('error', (error) => console.log(error)); // Emits on error!

poster.stop(); // Stops posting...
poster.start(); // Starts posting...
```

## Events

There are some events of the client such as `serverError`, `rateLimit`, `invalidToken`,  `error`!

```js
client.on('serverError', () => console.log('Looks like the server has got some error! 500!')); // Event fires when our server gets an error and we could not send you the response!
client.on('rateLimit', () => console.log('Looks like we have sent so much requests! So its 429!')); // Event fires when you have been rate limited by our api!
client.on('invalidToken', () => console.log('Looks like your token you have sent to the listcord api is invalid! 40!')); // This happens when your token is been invalid and you are making requests to the api!
client.on('error', console.log); // Event fires when an unknown error occurs!
```

## Contact

- [Join our discord server](https://discord.gg/cMGAyhZXwW)
- [Website](https://listcord.xyz)
- [GitHub](https://github.com/listcordteam/listcord.js)