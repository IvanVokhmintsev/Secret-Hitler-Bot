const { startRegistration } = require('./commands/startRegistration.js')
const { getActiveSessions, updateActiveSessions } = require('./jsonHandler.js')

module.exports = {
    commandHandler(client) {
        client.on('interactionCreate', async interaction => { // Command handler
            if (!interaction.isCommand() || !interaction.inGuild()) return;
        
            try {
                switch(interaction.commandName) {
                    case 'shstart':
                        const activeSessions = getActiveSessions();
        
                        if (!activeSessions.includes(interaction.channel.id)) {
                            activeSessions.push(interaction.channel.id);
        
                            updateActiveSessions(activeSessions);
                            startRegistration(interaction);
                        } else {
                            interaction.reply({ content: 'Невозможно начать две игры в одном канале', ephemeral: true })
                        }
                        break;
                }
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Ошибка', ephemeral: true });
            }
        });
    }
}