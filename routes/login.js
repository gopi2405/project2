module.exports = (() => {
    global.app.post("/login_api", (req, res) => {
        var user_email = req.body.name;
        var psw = req.body.Password;
        var user = "user";
        var manager = "manager";
        global.db_con.query("SELECT * FROM manager", function (err, result) {
            global.db_con.query("SELECT * FROM movies", function (err, result1) {
                global.db_con.query("SELECT * FROM theater", function (err, result2) {
                    global.db_con.query("SELECT * FROM ticket", function (err, result3) {
                        let obj = result.filter(user => user);
                        let obj1 = result1.filter(user => user);
                        let obj2 = result2.filter(user => user);
                        let obj3 = result3.filter(user => user);
                        global.db_con.query("SELECT * FROM users", function (err, result) {
                            let user_arr = result.find(user => user.email == user_email);
                            if (typeof user_arr !== "undefined") {
                                if (user_email == user_arr.uname && psw == user_arr.psw7) {
                                    console.log("login successful");
                                    res.render('costmer', { movie: obj1, theater: obj2 });

                                } else if (user_email == user_arr.email && psw == user_arr.psw) {
                                    console.log("login successful");
                                    res.render('costmer', { movie: obj1, theater: obj2 });
                                } else {
                                    res.render('login', { alert: 'msg' })
                                }

                            }
                            else if (user_email == "manager" && psw == "123456") {
                                res.render('manage', { alert: '' })
                            }
                            else {
                                res.render('login', { alert: 'msg' })
                            }

                        });

                    })
                })
            })
        })

    })
})
