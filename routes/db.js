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
        console.log("users table:", result);
    });
    //tablename : theater
    // global.db_con.query("drop table theater");

    let theater_table = "CREATE TABLE theater (theaterid VARCHAR(255), class VARCHAR(255), seats VARCHAR(20))";
    global.db_con.query(theater_table, (err) => {
        if (err == null) {
            console.log("theater Table created !");
        } else {
            console.log("tablename 'theater' already existed");
        }
    })
    global.db_con.query("SELECT * FROM theater", function (err, result) {
        if (err) throw err;
        console.log("theater table:", result);
    });

    //tablename : movie
    // global.db_con.query("drop table movies");
    var sql_movies = "create table movies (movieid varchar(200),moviename varchar(200),language varchar(200), start_time varchar(200), end_time varchar(200) )";
    global.db_con.query(sql_movies, (err, result) => {
        if (err == null) {
            console.log("theater Table created !");
        } else {
            console.log("tablename 'movies' already existed");
        }
    })

    global.db_con.query("SELECT * FROM movies", function (err, result) {
        if (err) throw err;
        console.log("movies table:", result);
    });
});


