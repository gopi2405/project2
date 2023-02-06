module.exports = (() => {
    global.app.post('/ticket', (req, res) => {
        var ticketno = req.body.tickno;
        var showid = req.body.showid;
        var seatno = req.body.seatno;
        if (ticketno != "") {
            if (showid != "") {
                if (seatno != "") {

                    global.db_con.query("select * from Ticket", (err, result) => {
                        if (result == null || result == "") {
                            var sql = `insert into Ticket values ("${ticketno}","${showid}","${seatno}")`;
                            global.db_con.query(sql, (err, result) => {
                                if (err == null) {
                                    console.log(result);
                                    res.render('booktickets', { alert: 's1' });
                                } else {
                                    console.log(err.sqlMessage);
                                    res.render('booktickets', { alert: 'ei' })
                                }
                            })
                        } else {
                            let user_arr = result.find(user => user.ticketno == ticketno);
                            if (typeof user_arr !== "undefined") {
                                if (user_arr.seatno == seatno) {
                                    res.render('booktickets', { alert: 'r1' });
                                } else {
                                    var sql = `insert into Ticket values ("${ticketno}","${showid}","${seatno}")`;
                                    global.db_con.query(sql, (err, result) => {
                                        if (err == null) {
                                            console.log(result);
                                            res.render('booktickets', { alert: 's1' });
                                        } else {
                                            console.log(err.sqlMessage);
                                            res.render('booktickets', { alert: 'ei' })
                                        }
                                    })
                                }
                            } else {
                                var sql = `insert into Ticket values ("${ticketno}","${showid}","${seatno}")`;
                                global.db_con.query(sql, (err, result) => {
                                    if (err == null) {
                                        console.log(result);
                                        res.render('booktickets', { alert: 's1' });
                                    } else {
                                        console.log(err.sqlMessage);
                                        res.render('booktickets', { alert: 'ei' })
                                    }
                                })
                            }

                        }
                    })

                } else {
                    res.render('booktickets', { alert: 'e1' })
                }
            } else {
                res.render('booktickets', { alert: 'e2' })
            }
        } else {
            res.render('booktickets', { alert: 'e3' })
        }
    })
})