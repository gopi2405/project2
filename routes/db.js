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
    // create Theater table
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
    // create movies table
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

    // create tickes tables
    // global.db_con.query("drop table ticket");

    // let ticket_table = "CREATE TABLE ticket (ticketno VARCHAR(255), showid VARCHAR(255), seatno VARCHAR(20))";
    // global.db_con.query(ticket_table, (err) => {
    //     if (err == null) {
    //         console.log("Ticket Table created !");
    //     } else {
    //         console.log("tablename 'Ticket' already existed");
    //     }
    // })
    // global.db_con.query("SELECT * FROM ticket", function (err, result) {
    //     if (err) throw err;
    //     console.log("Ticket table:", result);
    // });


    // ("${movieid}","${movie_name}","${theaterid}","${ticketno}","${price}","${st}","${et}")
    // global.db_con.query("drop table manager");

    let manage_table = "CREATE TABLE manager (movieid VARCHAR(255), moviename VARCHAR(255), theaterid VARCHAR(200), classtype VARCHAR(200), price VARCHAR(200), st VARCHAR(200), et VARCHAR(200))";
    global.db_con.query(manage_table, (err) => {
        if (err == null) {
            console.log("manager Table created !");
        } else {
            console.log("tablename 'manager' already existed");
        }
    })
    global.db_con.query("SELECT * FROM manager", function (err, result) {
        if (err) throw err;
        console.log("manager table:", result);
    });

    // create managing login deatails
    let managersignup_table = "CREATE TABLE login_mg (userid VARCHAR(255), password VARCHAR(255))";
    global.db_con.query(managersignup_table, (err) => {
        if (err == null) {
            console.log("managerlogin Table created !");
        } else {
            console.log("tablename 'managerlogin' already existed");
        }
    })


    global.db_con.query("SELECT * FROM login_mg", function (err, result) {
        if (result == "") {
            var sql = "insert into login_mg values('manager', '123456')";
            global.db_con.query(sql);
        } else {
            console.log('credentials already given')
        }
    });
    global.db_con.query("SELECT * FROM login_mg", function (err, result) {
        console.log('login:', result);
    })


    // create costmerup table
    // global.db_con.query("drop table costmerup");
    // global.db_con.query("drop table costmerlow");

    let costmerup_table = "CREATE TABLE costmerup (theaterid VARCHAR(255), movieid VARCHAR(255), moviename VARCHAR(255), language VARCHAR(255),upperclass VARCHAR(20))";
    global.db_con.query(costmerup_table, (err) => {
        if (err == null) {
            console.log("costmer1 Table created !");
        } else {
            console.log("tablename 'costmer1' already existed");
        }
    });
    global.db_con.query("SELECT * FROM costmerup", function (err, result) {
        console.log('costmer1:', result);
    })

    // create costmerlow table
    let costmerlow_table = "CREATE TABLE costmerlow (theaterid VARCHAR(255), movieid VARCHAR(255), moviename VARCHAR(255), language VARCHAR(255), lowerclass VARCHAR(20))";
    global.db_con.query(costmerlow_table, (err) => {
        if (err == null) {
            console.log("costmer2 Table created !");
        } else {
            console.log("tablename 'costmer2' already existed");
        }
    });
    global.db_con.query("SELECT * FROM costmerlow", function (err, result) {
        console.log('costmer2:', result);
    })



    // global.db_con.query("drop table hall_seats");

    let seatno_table = "CREATE TABLE hall_seats (upperclass VARCHAR(255), lowerclass VARCHAR(255))";
    global.db_con.query(seatno_table, (err) => {
        if (err == null) {
            console.log("hall_seats Table created !");
        } else {
            console.log("tablename 'hall_seats' already existed");
        }
    });

    global.db_con.query("SELECT * FROM hall_seats", function (err, result) {
        if (result == "") {
            for (var i = 1, j = 1; i <= 10, j <= 10; j++, i++) {
                var upperclass = i;
                var lowerclass = j;
                var sql = `insert into hall_seats values("${upperclass}","${lowerclass}")`;
                global.db_con.query(sql, (err, result) => {
                    if (err) {
                        console.log(err.sqlMessage);
                    } else {
                        console.log(result);
                    }
                })
            }
        } else {
            console.log('hall_seats:', result);
        }
    })


    // user data
    // global.db_con.query("drop table userdata1");

    let cuser_table = "CREATE TABLE userdata1 (ticketno VARCHAR(255), showid VARCHAR(255), username VARCHAR(255), seatno VARCHAR(20), price VARCHAR(20))";
    global.db_con.query(cuser_table, (err) => {
        if (err == null) {
            console.log("userdata Table created !");
        } else {
            console.log("tablename 'userdata1' already existed");
        }
    });
    global.db_con.query("SELECT * FROM userdata1", function (err, result) {
        console.log('userdata:', result);
    })

    // ticketno,showid,username,seatno
    // let upper_table = "CREATE TABLE hallup_seats (seatno VAR)";
    // global.db_con.query(upper_table, (err) => {
    //     if (err == null) {
    //         console.log("hallup_seats Table created !");
    //     } else {
    //         console.log("tablename 'hallup_seats' already existed");
    //     }
    // });
    // global.db_con.query("SELECT * FROM hallup_seats", function (err, result) {
    //     console.log('hallup_seats:', result);
    // })
    // global.db_con.query("drop table costmer");
});


