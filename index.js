const Discord = require('discord.js');
const bot = new Discord.Client();

const DBConnector = require('./dbconnector');
const CreateEvent = require('./createevent');
const SeeEvents = require('./seeevents');
const Join = require('./join');
const Quit = require('./quit');
const See = require('./see');
const Delete = require('./deleteevent');
const MyEvents = require('./myevents');
const Help = require('./help');
const Variable = require('./variable');

bot.login(Variable.GetToken());
var BreakException = {};


Number.prototype.pad = function (width) {
        width -= this.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(this) ? 2 : 1)).join('0') + this;
        }
        return this + ""; 
}

bot.on('message', function (message) {
    if (message.author != bot.user) { }

   let data = CreateEvent.UseCommands(message) ||
        SeeEvents.UseCommands(message) ||
        Join.UseCommands(message) ||
        Quit.UseCommands(message) ||
        See.UseCommands(message) ||
        Delete.UseCommands(message) ||
        MyEvents.UseCommands(message) ||
        Help.UseCommands(message);
})

setInterval(function () {
    let date = new Date();
    DBConnector.GetUsersToAlert(date, function (rows) {
        rows.forEach((row) => {
            let dateEvent = new Date(row.date * 1);
            let diff = dateEvent - date;
            let channel = bot.channels.get(row.dmId);
            if (!channel) {
                try {

                    bot.guilds.forEach((guild) => {
                        channel = guild.members.get(row.userId);
                        if (channel) {
                            throw BreakException;
                        }
                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                }

            }

            if (diff < 1000 * 60 * 60 * 24 && row.alertId < 4) {
                channel.send("L'évènement " + row.id + " se déroule dans moins de 24h");
                DBConnector.SetAlertID(row.userId, row.id, 4);
            } else if (diff < 1000 * 60 * 60 * 24 * 3 && row.alertId < 3) {
                channel.send("L'évènement " + row.id + " se déroule dans moins de 3 jours");
                DBConnector.SetAlertID(row.userId, row.id, 3);
            } else if (diff < 1000 * 60 * 60 * 24 * 7 && row.alertId < 2) {
                channel.send("L'évènement " + row.id + " se déroule dans moins d'une semaine");
                DBConnector.SetAlertID(row.userId, row.id, 2);
            }
        });
    });
}, 1000 * 60 * 60 * 12);



//cluster par guilds

//delete avec alerte de delete + cascade ?

//pm2 pour start