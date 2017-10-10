const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class MyEvent extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/myEvents');

	}


    static Action(message) {
        let date = new Date();

        DBConnector.GetEventOf(date.getTime(), message.author, function (events) {
            events.forEach((event) => {

                Commands.DisplayEvent(event.id, message.author);

            })

		});		
	}



}

///createEvent Tournois_Battlefly 24/10/2017 21:00