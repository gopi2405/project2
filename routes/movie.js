module.exports = (() => {
    global.app.post("/movies", (req, res) => {
        var movieid = req.body.movieid;
        var moviename = req.body.moviename;
        var language = req.body.language;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var st = new Date(start_time);
        var et = new Date(end_time);
        if (movieid != "") {
            if (moviename != "") {
                if (language != "") {
                    if (st != "") {
                        if (et != "") {
                            global.db_con.query("select * from movies", (err, result) => {
                                if (result == null || result == "") {
                                    var sql = `insert into movies (movieid,moviename,language,start_time,end_time) values ("${movieid}","${moviename}","${language}","${st}","${et}")`;
                                    global.db_con.query(sql, (err, result) => {
                                        if (err) throw err
                                        console.log(result);
                                        res.render('movie', { alert: 'a1' });
                                    })
                                } else {
                                    let user_arr = result.find(user => user.movieid == movieid);
                                    if (typeof user_arr !== "undefined") {
                                        if (user_arr.language == language) {
                                            res.render('movie', { alert: 'r1' });
                                        } else {
                                            var sql = `insert into movies (movieid,moviename,language,start_time,end_time) values ("${movieid}","${moviename}","${language}","${st}","${et}")`;
                                            global.db_con.query(sql, (err, result) => {
                                                if (err) throw err
                                                console.log(result);
                                                res.render('movie', { alert: 'a1' });
                                            })
                                        }
                                    } else {
                                        var sql = `insert into movies (movieid,moviename,language,start_time,end_time) values ("${movieid}","${moviename}","${language}","${st}","${et}")`;
                                        global.db_con.query(sql, (err, result) => {
                                            if (err) throw err
                                            console.log(result);
                                            res.render('movie', { alert: 'a1' });
                                        })
                                    }
                                }
                            })

                        } else {
                            res.render('movie', { alert: 'm1' });
                        }
                    } else {
                        res.render('movie', { alert: 'm2' });
                    }
                }
                else {
                    res.render('movie', { alert: 'm3' });
                }
            } else {
                res.render('movie', { alert: 'm4' });
            }
        } else {
            res.render('movie', { alert: 'm5' })
        }
    })
})