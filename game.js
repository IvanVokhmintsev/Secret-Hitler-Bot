const { User, DMChannel } = require('discord.js');

const ROLE_DECK = ['Hitler', 'Fascist', 'Liberal', 'Liberal', 'Liberal', 'Liberal', 'Fascist', 'Liberal', 'Fascist', 'Liberal'];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};

function roleDistributor(arrayOfPlayers, arrayOfRoles) {
    for (let i = 0; i < arrayOfPlayers.size; i++) { // выведет 0, затем 1, затем 2
        arrayOfPlayers[i].role = arrayOfRoles[i];
        arrayOfPlayers[i].party = (arrayOfPlayers[i].role === 'Liberal') ? 'Liberal' : 'Fascist';

        arrayOfPlayers[i].createDM()
            .then(channel => {
                channel.send(`Игра началась, твоя роль: ${arrayOfPlayers[i]}`)
            });
      };
};

module.exports = {
    //Ещё в процессе написания

    async game(channel, setOfPlayers) {
        await channel.send('Для досрочной остановки игры просто напишите в чат !shstop');

        const orderOfPlayers = shuffleArray(Array.from(setOfPlayers));
        const arrayOfRoles = ROLE_DECK.slice(0, orderOfPlayers.length - 1);

        roleDistributor(orderOfPlayers, arrayOfRoles);
    }
};