const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class Quit extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/quit');

	}


	static Action(message) {
		let args = message.content.split(' ');
		if (args.length < 2) {
			message.reply('Mauvaise syntaxe : /quit EventId');
		} else {
            DBConnector.QuitEvent(args[1], message.author, function (id) {
                let why = "";
                for (let i = 2; i < args.length; i++) {
                    why += args[i] + " ";
                }
                let raison = ((why == "") ? "" : (" - raison : " + why));
                message.channel.send(message.author.tag + " a quitté l'évènement " + id + raison );
                Commands.DisplayEvent(id,message.channel);
			});
		}
	}



}