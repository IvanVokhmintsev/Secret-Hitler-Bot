const fs = require('fs');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

const { game } = require('./../game.js');

const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('registration')
					.setLabel('Зарегистрироваться')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('startTheGame')
					.setLabel('Начать игру')
					.setStyle('SUCCESS')
			);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shstart')
		.setDescription('Начинает регистрацию на игру'),

	async startRegistration(interaction) {
		await interaction.reply('Начинаю регистрацию')

		const gameChannel = interaction.channel;
		const setOfPlayers = new Set();
		const setOfPlayersId = new Set();
		
		const registrationMessage = await interaction.channel.send({ content: `Для регистрации на игру нажмите соответствующую кнопку на этом сообщении. Игра начнётся через минуту.\nЗарегистрированные игроки:`, components: [row] })
		let contentOfRegistrationMessage = registrationMessage.content;

		const collector = registrationMessage.createMessageComponentCollector({ time: 60000 });

		collector.on('collect', async interaction => {
			switch (interaction.customId) {
				case 'registration':
					if (setOfPlayersId.has(interaction.user.id)) {
						interaction.reply({ content: 'Вы уже зарегистрованы на эту игру', ephemeral: true });
						return;
					} else if (setOfPlayers.size === 10) {
						interaction.reply({ content: 'В игре нет мест', ephemeral: true });
						return;
					}

					setOfPlayers.add(interaction.user);
					setOfPlayersId.add(interaction.user.id);

					contentOfRegistrationMessage += `\n${interaction.user.username}`; 
					interaction.update(contentOfRegistrationMessage); //Добавляет ник зарегистрированного игрока в registrationMessage
					

					console.log('Добавлен новый игрок');
					break;

				case 'startTheGame':
					if (false) {
					} else if (setOfPlayers.size < 5) {
						interaction.reply({ content: 'Недостаточно игроков для начала игры.\nМинимальное количество: 5', ephemeral: true });
					} else {
						collector.stop();
					};
			};
		});

		collector.on('end', async collected =>{
			if (setOfPlayers.size < 5) {
				await registrationMessage.channel.send('Недостаточно игроков для начала игры.\nМинимальное количество: 5');
				await registrationMessage.delete();

				const activeSessions = JSON.parse(fs.readFileSync('./activeSessions.json'))
						const index = activeSessions.indexOf(interaction.channel.id);
						activeSessions.splice(index, 1)
						fs.writeFileSync('./activeSessions.json', JSON.stringify(activeSessions))
			} else {
				await registrationMessage.channel.send('Игра начинается!');
				await registrationMessage.delete();
				game(gameChannel, setOfPlayers);
			};
			
		});
	},
};