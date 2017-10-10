const Commands = require('./commands');
const DBConnector = require('./dbconnector');

module.exports = class CreateEvent extends Commands {


    static Match(message) {
        return message.content.startsWith('/seeEvents');

    }


    static Action(message) {
        let date = new Date();
        DBConnector.SeeEventsAfter(date.getTime(), function (rows) {
            var res = "Evènements à venir : ";
            message.author.send(res);
            rows.forEach((row) => {

                Commands.DisplayEvent(row.id, message.author);
            });
        });
    }

}