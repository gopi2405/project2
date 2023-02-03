module.exports = (() => {
    global.app.post("/movies", (req, res) => {
        var movieid = req.body.movieid;
        var moviename = req.body.moviename;
        var language = req.body.language;
        var start_time = req.body.start_time;
        var end_time = req.body.end_time;
        var st = new Date(start_time);
        var et = new Date(end_time);
        if (movieid != "" || movieid != null) {
            if (moviename != "" || moviename != null) {
                if (language != "" || language != null) {
                    if (st != "" || st != null) {
                        if (et != "" || et != null) {
                            var sql = `insert into movies (movieid,moviename,language,start_time,end_time) values ("${movieid}","${moviename}","${language}","${st}","${et}")`;
                            global.db_con.query(sql, (err, result) => {
                                if (err) throw err
                                console.log(result);
                                res.render('movie', { alert: 'a1' });
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