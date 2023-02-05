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
        if (movieid != "" || movieid != null) {
            if (movie_name != "" || movie_name != null) {
                if (hallid != "") {
                    if (ticketno != "") {
                        if (price != "" || price != null) {
                            if (st != "" || st != null) {
                                if (et != "" || et != null) {
                                    global.db_con.query("select * from theater", (err, result) => {
                                        let obj = result.find(user => user.theaterid == hallid);
                                        global.db_con.query("select * from Ticket", (err, result) => {
                                            let obj1 = result.find(user => user.ticketno == ticketno);
                                            global.db_con.query("select * from movies", (err, result) => {
                                                let obj2 = result.find(user => user.movieid == movieid);
                                                if (obj.theaterid == hallid) {
                                                    if (obj1.ticketno == ticketno) {
                                                        if (obj2.movieid == movieid && obj2.moviename == movie_name) {
                                                            var sql = `insert into manager values("${movieid}","${movie_name}","${hallid}","${ticketno}","${price}","${st}","${et}")`;
                                                            global.db_con.query(sql, (err, result) => {
                                                                if (err) throw err
                                                                console.log(result);
                                                                res.render('manage', { alert: 's1' });
                                                            })
                                                        } else {
                                                            res.render('manage', { alert: 'ei1' });
                                                        }
                                                    } else {
                                                        res.render('manage', { alert: 'ei2' });
                                                    }
                                                } else {
                                                    res.render('manage', { alert: 'ei3' });
                                                }
                                            });
                                        });
                                    })
                                } else {
                                    res.render('manager', { alert: 'e1' });
                                }
                            } else {
                                res.render('manager', { alert: 'e2' });
                            }
                        } else {
                            res.render('manager', { alert: 'e3' });
                        }
                    } else {
                        res.render('manager', { alert: 'e7' });
                    }
                } else {
                    res.render('manager', { alert: 'e6' });
                }
            } else {
                res.render('manager', { alert: 'e4' });
            }
        } else {
            res.render('manager', { alert: 'e5' });
        }
    })
})