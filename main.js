const fs = require('fs');

const { Client, Intents, Interaction } = require('discord.js');
const { token } = require('./config.json');

const { setCommands } = require('./commandSetter.js');
const { startRegistration } = require('./commands/startRegistration.js')

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


client.on('interactionCreate', async interaction => { // Command handler
    if (!interaction.isCommand() || !interaction.inGuild()) return;

    try {
		switch(interaction.commandName) {
			case 'shstart':
				const activeSessions = JSON.parse(fs.readFileSync('./activeSessions.json'))

				if (!activeSessions.includes(interaction.channel.id)) {
					activeSessions.push(interaction.channel.id);

					fs.writeFileSync('./activeSessions.json', JSON.stringify(activeSessions))
					startRegistration(interaction);
				} else {
					interaction.channel.send({ content: 'Невозможно начать две игры в одном канале', ephemeral: true })
				}
				break;
		}
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Ошибка', ephemeral: true });
	}
});

client.login(token);