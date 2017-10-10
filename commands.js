const DBConnector = require('./dbconnector');


module.exports = class Commands {

	static UseCommands(message) {
		if (this.Match(message)) {
            this.Action(message);
            if (message.deletable) {
                message.delete();
            }

			return true;
		}
		return false;

	}

	static Match(message) {


	}


	static Action(message) {
			

    }

    static DisplayEvent(eventId, channel) {
        DBConnector.SeeEvent(eventId, function (event, players, unplayers) {
            if (event) {
                var res = "\nEvènement " + event.id + " : ";
                let date = new Date(event.date*1);

                res += "\n" + event.name + " le " + date.getDate().pad(2) + "/" + (date.getMonth() + 1).pad(2) + "/" + date.getFullYear() + " à " +
                    date.getHours().pad(2) + ":" + date.getMinutes().pad(2) + " crée par " + event.creator;
                res += "\nParticipants [" + players.length + "]: ";
                players.forEach((player) => {
                    res += player.name + ",";
                });
                res += "\nNe peut pas Participer [" + unplayers.length + "]: ";
                unplayers.forEach((player) => {
                    res += player.name + ",";
                });

                res += "\n";
                channel.send(res);
            } 
        });
    }
}