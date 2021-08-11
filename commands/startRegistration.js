const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

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

		const setOfPlayersId = new Set();
		// setOfPlayersId.add(interaction.user.id)
		const gameChannelId = interaction.channel.id;
		
		const registrationMessage = await interaction.channel.send({ content: `Для регистрации на игру нажмите соответствующую кнопку на этом сообщении. Игра начнётся через минуту.\nЗарегистрированные игроки:`, components: [row] })
		let contentOfRegistrationMessage = registrationMessage.content;

		const collector = registrationMessage.createMessageComponentCollector({ time: 60000 });

		collector.on('collect', async interaction => {
			switch (interaction.customId) {
				case 'registration':
					if (setOfPlayersId.has(interaction.user.id)) return;

					setOfPlayersId.add(interaction.user.id)

					contentOfRegistrationMessage = contentOfRegistrationMessage + `\n${interaction.user.username}`
					interaction.update(contentOfRegistrationMessage)
					

					console.log('Добавлен новый игрок')
					break;
			}
		});

		collector.on('end', async collected =>{
			await registrationMessage.channel.send('Регистрация окончена');
			await registrationMessage.delete();

			console.log(setOfPlayersId);
		});
	},
};