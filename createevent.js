const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class CreateEvent extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/createEvent');

	}


	static Action(message) {
		let args = message.content.split(' ');
		if (args.length != 4) {
			message.reply('Mauvaise syntaxe : /createEvent nom jj/mm/aaaa hh:mm');
		} else {
			let main = args[2].split('/');
			let extension = args[3].split(':');
            let date = new Date(main[2], main[1]-1, main[0], extension[0], extension[1]);
            DBConnector.CreateEvent(args[1], date.getTime(), message.author, function (id) {
                message.channel.send("@everyone, nouvel évènement "+ id);
                Commands.DisplayEvent(id, message.channel);

			});
		}
	}



}

///createEvent Tournois_Battlefly 24/10/2017 21:00