module.exports = (() => {
    global.app.post('/costmer', (req, res) => {
        var theaterid = req.body.t_id;
        var movieid = req.body.m_id;
        var moviename = req.body.m_name;
        var language = req.body.m_lang;
        var upperclass = req.body.seatupno;
        var lowerclass = req.body.seatlowno;
        if (theaterid != "") {
            if (movieid != "") {
                if (moviename != "") {
                    if (language != "") {
                        global.db_con.query("SELECT * FROM manager", function (err, result) {
                            global.db_con.query("SELECT * FROM movies", function (err, result1) {
                                global.db_con.query("SELECT * FROM theater", function (err, result2) {
                                    global.db_con.query("SELECT * FROM ticket", function (err, result3) {
                                        global.db_con.query("SELECT * FROM hall_seats", function (err, result4) {
                                            let obj = result.filter(user => user);
                                            let obj1 = result1.filter(user => user);
                                            let obj2 = result2.filter(user => user);
                                            let obj3 = result3.filter(user => user);
                                            let obj4 = result4.filter(user => user);
                                            global.db_con.query("SELECT * FROM costmerup", function (err, result3) {
                                                global.db_con.query("SELECT * FROM costmerlow", function (err, result3) {
                                                    let up = result.find(user => user.upperclass == upperclass);
                                                    let low = result.find(user => user.lowerclass == lowerclass);

                                                    if (upperclass == "" && lowerclass == "") {
                                                        res.render('costmer', { alert: 'uplow', movie: obj1, theater: obj2, seat: obj4 });
                                                    } else if (lowerclass == "") {
                                                        if (typeof up !== 'undefined') {
                                                            res.render('costmer', { alert: 'e1', movie: obj1, theater: obj2, seat: obj4 });
                                                        } else {
                                                            var sql = `insert into costmerup values ("${theaterid}","${movieid}","${moviename}","${language}","${upperclass}")`;
                                                            global.db_con.query(sql, (err, result) => {
                                                                if (err) throw err.sqlMessage;
                                                                console.log(result);
                                                                res.render('costmer', { alert: 's1', movie: obj1, theater: obj2, seat: obj4 });
                                                            })
                                                        }
                                                    } else if (upperclass == "") {
                                                        if (typeof low !== 'undefined') {
                                                            res.render('costmer', { alert: 'e2', movie: obj1, theater: obj2, seat: obj4 });
                                                        } else {
                                                            var sql = `insert into costmerlow values ("${theaterid}","${movieid}","${moviename}","${language}","${lowerclass}")`;
                                                            global.db_con.query(sql, (err, result) => {
                                                                if (err) throw err.sqlMessage;
                                                                console.log(result);
                                                                res.render('costmer', { alert: 's1', movie: obj1, theater: obj2, seat: obj4 });
                                                            })
                                                        }
                                                    } else if (upperclass != "" && lowerclass != "") {
                                                        res.render('costmer', { alert: 'uplow_er', movie: obj1, theater: obj2, seat: obj4 });
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    } else {
                        res.render('costmer', { alert: 'lang1', movie: obj1, theater: obj2, seat: obj4 });
                    }
                } else {
                    res.render('costmer', { alert: 'mn1', movie: obj1, theater: obj2, seat: obj4 });
                }
            } else {
                res.render('costmer', { alert: 'm1id', movie: obj1, theater: obj2, seat: obj4 });
            }
        } else {
            res.render('costmer', { alert: 't1id', movie: obj1, theater: obj2, seat: obj4 });
        }

    })
})