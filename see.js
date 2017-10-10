const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class See extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/see ');

	}


	static Action(message) {
		let args = message.content.split(' ');
		if (args.length != 2) {
			message.reply('Mauvaise syntaxe : /see EventId');
        } else {
            this.DisplayEvent(args[1], message.author);
		}
	}



}