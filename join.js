const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class Join extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/join');

	}


    static Action(message) {

		let args = message.content.split(' ');
        if (args.length != 2) {
            message.author.send('Mauvaise syntaxe : /join EventId');
        } else {
            message.author.createDM().then(function (dm) {
                DBConnector.JoinEvent(args[1], message.author, dm, function (id) {
                    message.channel.send(message.author.tag + " a rejoint l'évènement " + id);
                    message.author.send("Evènement " + id + " rejoint");
                });
             });
		}
	}



}