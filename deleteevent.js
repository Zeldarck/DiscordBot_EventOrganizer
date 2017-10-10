const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class Delete extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/delete');

	}


	static Action(message) {
		let args = message.content.split(' ');
		if (args.length != 2) {
			message.reply('Mauvaise syntaxe : /delete eventID');
        } else {
            //Commands.DisplayEvent(args[1], message.channel);
            DBConnector.DeleteEvent(args[1], message.author, function (id) {
                //message.channel.send("Evènement Supprimé " + args[1]);
			});
		}
	}



}