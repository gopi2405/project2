module.exports = (() => {
    var mysql = require('mysql');

    global.db_con = mysql.createConnection({
        host: 'localhost', // Define host name
        user: 'root', // Define database username
        password: 'Gopi098@', // Define database password
        database: 'db_p1'
    })

    global.db_con.connect((err) => {
        if (err) {
            console.log("Database Connection Failed !!!", err);
        } else {
            console.log("connected to Database");
        }
    });

    // declaring Databse name
    let databaseName = "db_p1";
    let createQuery = `CREATE DATABASE ${databaseName}`;
    // use the query to create a Database.
    global.db_con.query(createQuery, (err) => {
        if (err == null) {
            console.log("Database Created Successfully !");
        } else
            if (err.sqlMessage == "Can't create database 'db_p1'; database exists") {
                console.log("database already exist");
            }
            else {
                throw (err);
            }
    });
    // global.db_con.query("drop table users");
    // Creating table
    let sign_upTable = "CREATE TABLE users (uname VARCHAR(255), email VARCHAR(255), psw VARCHAR(20), cpsw VARCHAR(20))";
    global.db_con.query(sign_upTable, (err) => {
        if (err == null) {
            console.log("users Table created !");
        } else {
            console.log("tablename 'users' already existed");
        }
    })
    global.db_con.query("SELECT * FROM users", function (err, result) {
        if (err) throw err;
        console.log(result);
    });

});


