const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class Help extends Commands {
	

	static Match(message) {
		return message.content.startsWith('/help');

	}


	static Action(message) {
        message.author.send("Commandes disponibles : "
            + "\n/join id - pour rejoindre un évènement,"
            + "\n/help - affiche l'aide,"
            + "\n/quit id [raison]- pour dire qu'on peut pas participer à un évènement,"
            + "\n/leave id [raison]- pour dire qu'on peut pas participer à un évènement,"
            + "\n/createEvents dd/mm/yyyy hh:mm nom - pour crée un évènement,"
            + "\n/see id - pour voir les infos d'un évènement,"
            + "\n/seeEvents - pour voir tout les évènement à venir,"
            + "\n/delete id - pour détruire un évènement (seulement si on a crée et fonctionnera pas si des gens on déjà rejoins l'évènement pour le moment),"
            + "\n/myEvents - affiche les évènements auxquels on est inscrit");
	}



}