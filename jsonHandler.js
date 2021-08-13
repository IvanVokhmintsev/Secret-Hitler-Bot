const fs = require('fs');
const JSONFilePath = './JSONFiles/activeSessions.json';

module.exports = {
    getActiveSessions() {
        return JSON.parse(fs.readFileSync(JSONFilePath));
    },
    updateActiveSessions(activeSessions) {
        fs.writeFileSync(JSONFilePath, JSON.stringify(activeSessions));
    }
}