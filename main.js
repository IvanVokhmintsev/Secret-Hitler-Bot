const fs = require('fs');

const { Client, Intents, Interaction } = require('discord.js');
const { token } = require('./JSONFiles/config.json');

const { setCommands } = require('./commandSetter.js');
const { commandHandler } = require('./commandHandler.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });



client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async message => { 
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
		setCommands(client);
	};
});

commandHandler(client);

client.login(token);