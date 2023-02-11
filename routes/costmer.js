module.exports = (() => {
    global.app.post('/costmer', (req, res) => {
        var theaterid = req.body.t_id;
        var movieid = req.body.m_id;
        var moviename = req.body.m_name;
        var language = req.body.m_lang;
        var upperclass = req.body.seatupno;
        var lowerclass = req.body.seatlowno;
        var username = req.body.name;
        var show = req.body.show;
        global.db_con.query("SELECT * FROM manager", function (err, result) {
            global.db_con.query("SELECT * FROM movies", function (err, result1) {
                global.db_con.query("SELECT * FROM theater", function (err, result2) {
                    global.db_con.query("SELECT * FROM ticket", function (err, result3) {
                        global.db_con.query("SELECT * FROM hall_seats", function (err, result4) {
                            let obj = result.filter(user => user);
                            let obj1 = result1.filter(user => user.movieid == movieid);
                            let obj2 = result2.filter(user => user.theaterid == theaterid);
                            let obj3 = result3.filter(user => user);
                            let obj4 = result4.filter(seats => seats);
                            let uclass = result4.filter(seats => seats.upperclass == upperclass);
                            let l_class = result4.filter(seats => seats.lowerclass == lowerclass);
                            if (theaterid != "") {
                                if (movieid != "") {
                                    if (moviename != "") {
                                        if (language != "") {
                                            if (show != "") {
                                                global.db_con.query("SELECT * FROM costmerup", function (err, result5) {
                                                    global.db_con.query("SELECT * FROM costmerlow", function (err, result6) {
                                                        let up = result5.find(user => user.upperclass == upperclass);
                                                        let low = result6.find(user => user.lowerclass == lowerclass);

                                                        if (upperclass == "" && lowerclass == "") {
                                                            res.render('costmer', { alert: 'uplow', movie: obj1, theater: obj2, seat: obj4, name: username });
                                                        } else if (lowerclass == "") {
                                                            if (result5 == "") {
                                                                var t_num = '11';
                                                                var ticketno = "23" + t_num;
                                                                var sql = `insert into costmerup values ("${theaterid}","${movieid}","${moviename}","${language}","${upperclass}","${username},"${ticketno}","${show}")`;
                                                                global.db_con.query(sql, (err, result) => {
                                                                    if (err) throw err.sqlMessage;
                                                                    console.log(result);
                                                                    res.render('receipt', { alert: 's1', movie: obj1, theater: obj2, seat: uclass, name: username, u: upperclass, ticket: obj3 });
                                                                })
                                                            } else {
                                                                if (typeof up !== "undefined") {
                                                                    res.render('costmer', { alert: 'e1', movie: obj1, theater: obj2, seat: obj4, name: username });
                                                                } else {
                                                                    var lastelement = result5.slice(-1);
                                                                    var lastelement1 = lastelement.map(({ ticketno }) => ticketno)
                                                                    ticketno1 = Number(lastelement1) + 1;
                                                                    var sql = `insert into costmerup values ("${theaterid}","${movieid}","${moviename}","${language}","${upperclass}","${username},"${ticketno}","${show}")`;
                                                                    global.db_con.query(sql, (err, result) => {
                                                                        if (err) throw err.sqlMessage;
                                                                        console.log(result);
                                                                        res.render('receipt', { alert: 's1', movie: obj1, theater: obj2, seat: uclass, name: username, u: upperclass, ticket: obj3 });
                                                                    })
                                                                }
                                                            }
                                                        } else if (upperclass == "") {

                                                            if (result6 == "") {
                                                                var t_num = '11';
                                                                var ticketno = "23" + t_num;
                                                                var sql = `insert into costmerlow values ("${theaterid}","${movieid}","${moviename}","${language}","${upperclass}","${username},"${ticketno}","${show}")`;
                                                                global.db_con.query(sql, (err, result) => {
                                                                    if (err) throw err.sqlMessage;
                                                                    console.log(result);
                                                                    res.render('receipt', { alert: 's1', movie: obj1, theater: obj2, seat: l_class, name: username, u: upperclass, ticket: obj3 });
                                                                })
                                                            } else {
                                                                if (typeof low !== "undefined") {
                                                                    res.render('costmer', { alert: 'e2', movie: obj1, theater: obj2, seat: obj4, name: username });
                                                                } else {
                                                                    var lastelement = result6.slice(-1);
                                                                    var lastelement1 = lastelement.map(({ ticketno }) => ticketno)
                                                                    ticketno = Number(lastelement1) + 1;
                                                                    var sql = `insert into costmerlow values ("${theaterid}","${movieid}","${moviename}","${language}","${upperclass}","${username},"${ticketno}","${show}")`;
                                                                    global.db_con.query(sql, (err, result) => {
                                                                        if (err) throw err.sqlMessage;
                                                                        console.log(result);
                                                                        res.render('receipt', { alert: 's1', movie: obj1, theater: obj2, seat: l_class, name: username, u: upperclass, ticket: obj3 });
                                                                    })
                                                                }
                                                            }
                                                        } else if (upperclass != "" && lowerclass != "") {
                                                            res.render('costmer', { alert: 'uplow_er', movie: obj1, theater: obj2, seat: obj4, name: username });
                                                        }
                                                    })
                                                })
                                            } else {
                                                res.render('costmer', { alert: 'show', movie: obj1, theater: obj2, seat: obj4, name: username });
                                            }

                                        } else {
                                            res.render('costmer', { alert: 'lang1', movie: obj1, theater: obj2, seat: obj4, name: username });
                                        }
                                    } else {
                                        res.render('costmer', { alert: 'mn1', movie: obj1, theater: obj2, seat: obj4, name: username });
                                    }
                                } else {
                                    res.render('costmer', { alert: 'm1id', movie: obj1, theater: obj2, seat: obj4, name: username });
                                }
                            } else {
                                res.render('costmer', { alert: 't1id', movie: obj1, theater: obj2, seat: obj4, name: username });
                            }
                        })
                    })
                })
            })
        })
    })
})