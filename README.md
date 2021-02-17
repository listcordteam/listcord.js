# Listcord.js

An official wrapper for listcord api!

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

Not a big work, just some few methods!

```js
await client.getBot('801976787264471120'); // Returns you the information of the bot!
await client.getBotReviews('801976787264471120'); // Returns you array of reviews of the bot!
await client.getReview('user id', 'bot id'); // Returns the review details by the discord id of the reviewer and the bot which was reviewed!
await client.hasVoted('user id', 'bot id'); // Verify if particular user has voted a paticular bot by id!
await client.search('shaz'); // Returns you the array of the bots which matches your query!
```

## Events

There are some events of the client such as `serverError`, `rateLimit`, `error`!

```js
client.on('serverError', () => console.log('Looks like the server has got some error! 500!')); // Event fires when our server gets an error and we could not send you the response!
client.on('rateLimit', () => console.log('Looks like we have sent so much requests! So its 429!')); // Event fires when you have been rate limited by our api!
client.on('error', console.log); // Event fires when an unknown error occurs!
```

## Contact

- [Join our discord server](https://discord.gg/cMGAyhZXwW)
- [Website](https://listcord.xyz)