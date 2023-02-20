module.exports = (() => {
    global.app.post("/manager", (req, res) => {
        var movieid = req.body.movieid;
        var movie_name = req.body.movie_name;
        var hallid = req.body.hall_id;
        var class_type = req.body.class;
        var price = req.body.price;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var st = new Date(start_time);
        var et = new Date(end_time);
        global.db_con.query("select * from theater", (err, result1) => {
            let obj = result1.filter(user => user);
            global.db_con.query("select * from movies", (err, result3) => {
                let obj2 = result3.filter(user => user);
                if (movieid != "") {
                    if (movie_name != "") {
                        if (hallid != "") {
                            if (class_type != "") {
                                if (price != "") {
                                    if (st != "") {
                                        if (et != "") {
                                            var obj3 = obj2.find(user => user.movieid == movieid)
                                            if (typeof obj3 !== "undefined") {
                                                if (obj3.moviename == movie_name) {
                                                    global.db_con.query("select * from manager", (err, result) => {
                                                        if (result == null || result == "") {
                                                            var sql = `insert into manager values("${movieid}","${movie_name}","${hallid}","${class_type}","${price}","${st}","${et}")`;
                                                            global.db_con.query(sql, (err, result) => {
                                                                if (err) throw err
                                                                console.log(result);
                                                                res.render('manage', { alert: 's1', movie: obj2, theater: obj });
                                                            })
                                                        } else {
                                                            let obj3 = result.find(user => user.theaterid == hallid);
                                                            let movie = result.find(user => user.movieid == movieid);
                                                            if (typeof obj3 !== "undefined" && typeof movie !== "undefined") {
                                                                if (obj3.classtype == class_type && obj3.price == price) {
                                                                    res.render('manage', { alert: 'cl1', movie: obj2, theater: obj });
                                                                } else {
                                                                    var sql = `insert into manager values("${movieid}","${movie_name}","${hallid}","${class_type}","${price}","${st}","${et}")`;
                                                                    global.db_con.query(sql, (err, result) => {
                                                                        if (err) throw err
                                                                        console.log(result);
                                                                        res.render('manage', { alert: 's1', movie: obj2, theater: obj });
                                                                    })
                                                                }

                                                            }
                                                            else {
                                                                var sql = `insert into manager values("${movieid}","${movie_name}","${hallid}","${class_type}","${price}","${st}","${et}")`;
                                                                global.db_con.query(sql, (err, result) => {
                                                                    if (err) throw err
                                                                    console.log(result);
                                                                    res.render('manage', { alert: 's1', movie: obj2, theater: obj });
                                                                })
                                                            }
                                                        }
                                                    })

                                                } else {
                                                    res.render('manage', { alert: 'm1', movie: obj2, theater: obj });
                                                }
                                            }


                                        } else {
                                            res.render('manage', { movie: obj2, theater: obj, alert: 'e1' });
                                        }
                                    } else {
                                        res.render('manage', { movie: obj2, theater: obj, alert: 'e2' });
                                    }
                                } else {
                                    res.render('manage', { movie: obj2, theater: obj, alert: 'e3' });
                                }
                            } else {
                                res.render('manage', { movie: obj2, theater: obj, alert: 'c1' });
                            }
                        } else {
                            res.render('manage', { movie: obj2, theater: obj, alert: 'e6' });
                        }
                    } else {
                        res.render('manage', { movie: obj2, theater: obj, alert: 'e4' });
                    }
                } else {
                    res.render('manage', { movie: obj2, theater: obj, alert: 'e5' });
                }
            })
        })
    })
})