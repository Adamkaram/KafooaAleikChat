// const sqlite3 = require('sqlite3');
const mysql = require('mysql');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const Config = require("../config");


var con = mysql.createConnection({
    host: Config.HostDB,
    user: Config.UserDB,
    password: Config.PassDB,
    database: Config.DBDB,
	charset : 'utf8mb4'
});



class AppDataBase {
    constructor() {
    con.connect(function(err) {
	if (err) throw err;
	console.log("Connected database!");
});
    }
	
DatabaseTable(){
  con.query("CREATE DATABASE IF NOT EXISTS "+Config.DBDB, function (err, result) {
    if (err) throw err;
  });
};

ExportDatabase(data){
	if(data){
    const users = fs.readFileSync(data).toString();
  con.query(users,  (err, result) => {
        if (err){
             throw err;
        }else{
            res.send("Query run successfully");
        }
    
        });

	};
};


DeleteTable(){
  con.query("DROP DATABASE "+Config.DBDB, function (err, result) {
    if (err) throw err;
  });
};	

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
           con.query(sql, params, function (err,result) {
                if (err) {
                    console.log('Error running sql ' + sql);
                    reject(err)
                } else {
                    resolve({id:result.insertId})
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
           con.query(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    reject(err)
                } else {
                    resolve(JSON.parse(JSON.stringify(result))[0])
                }
            })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
           con.query(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    reject(err)
                } else {
                    resolve(JSON.parse(JSON.stringify(rows)))
                }
            })
        })
    }
}

module.exports = AppDataBase;
