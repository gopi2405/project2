module.exports = (() => {
    global.app.post("/manager", (req, res) => {
        var movieid = req.body.movieid;
        var movie_name = req.body.movie_name;
        var hallid = req.body.hall_id;
        var ticketno = req.body.tickid;
        var price = req.body.price;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var st = new Date(start_time);
        var et = new Date(end_time);
        if (movieid != "") {
            if (movie_name != "") {
                if (hallid != "") {
                    if (ticketno != "") {
                        if (price != "") {
                            if (st != "") {
                                if (et != "") {
                                    global.db_con.query("select * from theater", (err, result) => {
                                        let obj = result.find(user => user.theaterid == hallid);
                                        if (typeof obj !== "undefined") {
                                            global.db_con.query("select * from Ticket", (err, result) => {
                                                let obj1 = result.find(user => user.ticketno == ticketno);
                                                if (typeof obj1 !== "undefined") {
                                                    global.db_con.query("select * from movies", (err, result) => {
                                                        let obj2 = result.find(user => user.movieid == movieid);
                                                        if (typeof obj2 !== "undefined") {
                                                            if (obj2.moviename == movie_name) {
                                                                global.db_con.query("select * from manager", (err, result) => {
                                                                    if (result == null || result == "") {
                                                                        var sql = `insert into manager values("${movieid}","${movie_name}","${hallid}","${ticketno}","${price}","${st}","${et}")`;
                                                                        global.db_con.query(sql, (err, result) => {
                                                                            if (err) throw err
                                                                            console.log(result);
                                                                            res.render('manage', { alert: 's1' });
                                                                        })
                                                                    } else {
                                                                        let obj3 = result.find(user => user.ticketno == ticketno);
                                                                        if (typeof obj3 !== "undefined") {
                                                                            res.render('manage', { alert: 't1' });
                                                                        } else if (obj3.theaterid == hallid) {
                                                                            var sql = `insert into manager values("${movieid}","${movie_name}","${hallid}","${ticketno}","${price}","${st}","${et}")`;
                                                                            global.db_con.query(sql, (err, result) => {
                                                                                if (err) throw err
                                                                                console.log(result);
                                                                                res.render('manage', { alert: 's1' });
                                                                            })
                                                                        }
                                                                        else {
                                                                            var sql = `insert into manager values("${movieid}","${movie_name}","${hallid}","${ticketno}","${price}","${st}","${et}")`;
                                                                            global.db_con.query(sql, (err, result) => {
                                                                                if (err) throw err
                                                                                console.log(result);
                                                                                res.render('manage', { alert: 's1' });
                                                                            })
                                                                        }
                                                                    }
                                                                })

                                                            } else {
                                                                res.render('manage', { alert: 'm1' });
                                                            }
                                                        } else {
                                                            res.render('manage', { alert: 'ei1' });
                                                        }

                                                    });
                                                } else {
                                                    res.render('manage', { alert: 'ei2' });
                                                }
                                            });
                                        } else {
                                            res.render('manage', { alert: 'ei3' });
                                        }
                                    })
                                } else {
                                    res.render('manage', { alert: 'e1' });
                                }
                            } else {
                                res.render('manage', { alert: 'e2' });
                            }
                        } else {
                            res.render('manage', { alert: 'e3' });
                        }
                    } else {
                        res.render('manage', { alert: 'e7' });
                    }
                } else {
                    res.render('manage', { alert: 'e6' });
                }
            } else {
                res.render('manage', { alert: 'e4' });
            }
        } else {
            res.render('manage', { alert: 'e5' });
        }
    })
})