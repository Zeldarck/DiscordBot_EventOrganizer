const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class CreateEvent extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/createEvent');

	}


	static Action(message) {
		let args = message.content.split(' ');
		if (args.length < 4) {
            message.author.send('Mauvaise syntaxe : /createEvent dd/mm/aaaa hh:mm nom');
		} else {
            let main = args[1].split('/');
            let extension = args[2].split(':');
            if (extension.length != 2 || main.length != 3) {
                message.author.send('Mauvaise syntaxe : /createEvent dd/mm/aaaa hh:mm nom');
            }
            let date = new Date(main[2], main[1] - 1, main[0], extension[0], extension[1]);

            let name = "";
            for (let i = 3; i < args.length; i++) {
                name += args[i] + " ";
            }


            DBConnector.CreateEvent(name, date.getTime(), message.author, function (id) {
                message.channel.send("@everyone, nouvel évènement "+ id);
                Commands.DisplayEvent(id, message.channel);

			});
		}
	}



}

///createEvent Tournois_Battlefly 24/10/2017 21:00