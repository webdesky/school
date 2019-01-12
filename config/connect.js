
var mysql = require('mysql');

module.exports= mysql.createConnection({
    host : "localhost",
	user : "root",
 	password : "Webdesky@2017",
	database : "node_school_rajendra"
});