module.exports = (() => {
    global.app.post('/t1', (req, res) => {
        var theaterid = req.body.hallid;
        var class_type = req.body.class;
        var seats = req.body.seats;
        if (theaterid != "" || theaterid != null) {
            if (class_type != "" || class_type != null) {
                if (seats != "" || seats != null) {
                    global.db_con.query("select * from theater", (err, result) => {
                        if (result == null || result == "") {
                            var sql = `insert into theater (theaterid,class,seats) values ("${theaterid}","${class_type}","${seats}")`;
                            global.db_con.query(sql, (err, result) => {
                                if (err) throw err
                                console.log(result);
                                res.render('theater', { alert1: 's1' });
                            })
                        } else {
                            let user_arr = result.find(user => user.theaterid == theaterid);
                            if (user_arr.class != class_type) {
                                var sql = `insert into theater (theaterid,class,seats) values ("${theaterid}","${class_type}","${seats}")`;
                                global.db_con.query(sql, (err, result) => {
                                    if (err) throw err
                                    console.log(result);
                                    res.render('theater', { alert1: 's1' });
                                })
                            } else {
                                res.render('theater', { alert1: 'r1' });
                            }
                        }
                    })

                } else {
                    res.render('theater', { alert1: 'e1' });
                }
            } else {
                res.render('theater', { alert1: 'e2' });
            }
        } else {
            res.render('theater', { alert1: 'e3' });
        }
    })
})