const fs = require('fs');
const {Collection} = require('discord.js');
module.exports = {
    setCommands(client) {

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        const commandData = [];
        console.log(client.application.commands)

        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            commandData.push(command.data)
        }
        console.log(commandData)
        client.application.commands.set(commandData);
        console.log(client.application.commands)
    }
}