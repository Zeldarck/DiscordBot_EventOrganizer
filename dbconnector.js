const sqlite3 = require('sqlite3').verbose();


module.exports = class DBConnector {

	static ConnectDB() {

		let db = new sqlite3.Database('./dbDiscordBot.db', sqlite3.OPEN_READWRITE, (err) => {
			if (err) {
				console.error(err.message);
			}
			console.log('Connected to the database.');
        });

        db.run('PRAGMA foreign_keys=on');

		return db;

	}


	static DisconnectDB(db) {
		db.close();
		console.log('Disconnected from database.');

	}



	static SeeEventsAfter(date, callback) {
		let db = this.ConnectDB();
		let sql = `SELECT ID id ,Name name, Date date, Creator creator FROM Event WHERE Date >= ? ORDER BY date `;
		db.all(sql, [date], (err, rows) => {
			if (err) {
				return console.error(err.message);
			}
			callback(rows);

		});

		this.DisconnectDB(db);
    }


    static GetEventOf(date, user,callback) {
        let db = this.ConnectDB();
        let sql = `SELECT ID id FROM Event JOIN Player ON EventID = ID WHERE Date >= ? AND UserID = ? AND Statut = 1 ORDER BY date  `;
        db.all(sql, [date, user.id], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);

        });

        this.DisconnectDB(db);
    }

    static GetUsersToAlert(date, callback) {
        let db = this.ConnectDB();

        let sql = `SELECT ID id, UserID userId, Date date, DmID dmId, AlertID alertId FROM Event JOIN Player ON EventID = ID WHERE Date >= ? AND Statut = 1 ORDER BY date  `;
        db.all(sql, [date], (err, rows) => {
            if (err) {
                return console.error(err.message);
            }
            callback(rows);

        });

        this.DisconnectDB(db);
    }

    static SetAlertID(userId, eventId,alertId) {
        let db = this.ConnectDB();
        let sql = `UPDATE  Player SET AlertID = ? WHERE EventID == ? AND UserID == ? `;
        db.run(sql, [alertId,eventId,userId], (err) => {
            if (err) {
                return console.error(err.message);
            }
        });

        this.DisconnectDB(db);
    }

	
	static CreateEvent(name,date,author,callback){
		 let db = this.ConnectDB();
		  db.run(`INSERT INTO Event(Name,Date,Creator,CreatorID) VALUES(?,?,?,?)`, [name,date,author.tag,author.id], function(err) {
			if (err) {
			  return console.log(err.message);
			}
			// get the last insert id
			var id = this.lastID ;
			console.log(`A row has been inserted with rowid ${this.lastID}`);
			callback(id);
		  });
		  this.DisconnectDB(db);
	}


    static DeleteEvent(eventID, author, callback) {
        let db = this.ConnectDB();
        db.run(`DELETE FROM Event WHERE ID = ? AND Event.CreatorID = ?`, [eventID,author.id], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            callback();
        });
        this.DisconnectDB(db);
    }


	static JoinEvent(eventID, player, dm, callback) {
        let db = this.ConnectDB();

  
    //    db.run(`INSERT INTO Player(Name,EventID,UserID) VALUES(?,?,?)`, [player.tag, eventID,dm.id ], function (err) {
        db.run(`REPLACE INTO Player (Name,EventID,DmID,UserID,Statut) VALUES (?,?,?,?,?) `, [player.tag, eventID,dm.id,player.id ,1], function (err) {
			if (err) {
				return console.log(err.message);
			}
			// get the last insert id
            console.log('A player have join ' + eventID);

            callback(eventID);

		});
		this.DisconnectDB(db);
	}


	static QuitEvent(eventID, player, callback) {
		let db = this.ConnectDB();
		//db.run(`DELETE FROM Player WHERE Name = ? AND EventID =? `, [player, eventID], function (err) {
        db.run(`REPLACE INTO Player (Name,EventID,UserID,Statut) VALUES (?,?,?,?) `, [player.tag, eventID,player.id,0], function (err) {
			if (err) {
				return console.log(err.message);
			}
			// get the last insert id
			console.log('A player have quit ' + eventID);
			callback(eventID);
		});
		this.DisconnectDB(db);
	}



	static SeeEvent(EventID, callback) {
		let db = this.ConnectDB();
		let sql = `SELECT ID id ,Name name, Date date, Creator creator FROM Event WHERE id == ? `;
		db.get(sql, [EventID], (err, event) => {
			if (err) {
				return console.error(err.message);
			}

			let sql2 = `SELECT Name name FROM Player WHERE Eventid == ? AND Statut == 1`;
			db.all(sql2, [EventID], (err, players) => {
				if (err) {
					return console.error(err.message);
                }

                let sql3 = `SELECT Name name FROM Player WHERE Eventid == ? AND Statut == 0`;
                db.all(sql3, [EventID], (err, unplayers) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    callback(event, players, unplayers);
                });

			});


		});

		this.DisconnectDB(db);
    }





}