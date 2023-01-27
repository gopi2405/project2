module.exports = (() => {
    global.app.post('/sign_up', (req, res) => {
        var uname = req.body.name;
        var email = req.body.email;
        var psw = req.body.psw;
        var cpsw = req.body.cpsw;
        var obj = {
            uname, email, psw, cpsw
        };
        var checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        // var checkPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$/;

        if (uname != "") {
            if (checkEmail.test(email) && email != "") {
                if (psw == cpsw && psw != "") {
                    global.db_con.query("SELECT * FROM users", function (err, result) {
                        if (result == "") {
                            var sql = `insert into users (uname, email, psw, cpsw) values ("${uname}","${email}","${psw}","${cpsw}")`;
                            global.db_con.query(sql, function (err, result) {
                                if (err) throw err
                                console.log(result);
                            })
                            res.render('login', { alert: "" });
                        } else {
                            for (let i = 0; i < result.length; i++)
                                if (result[i].uname == uname) {
                                    if (result[i].email == email) {
                                        res.render('signup', { msg: 'checkemailname' })
                                    } else {
                                        res.render('signup', { msg: 'checkname' })
                                    }
                                } else {
                                    if (result[i].email == email) {
                                        res.render('signup', { msg: 'checkemail' })
                                    } else {
                                        var sql = `insert into users (uname, email, psw, cpsw) values ("${uname}","${email}","${psw}","${cpsw}")`;
                                        global.db_con.query(sql, function (err, result,) {
                                            if (err) throw err
                                            console.log(result);
                                        })
                                        res.render('login', { alert: "" });
                                    }
                                }
                        }
                        // if (err) throw err;
                        // console.log(result);
                    });
                } else {
                    res.render('signup', { msg: 'psw' })
                }
            } else {
                res.render('signup', { msg: 'email' })
            }
        } else if (checkEmail.test(email) && email != "") {
            if (psw == cpsw && psw != "") {
                res.render('signup', { msg: 'name' });
                return true;
            } else {
                res.render('signup', { msg: 'name_email' })
            }
        } else {
            res.render('signup', { msg: 'name_email' })
        }
    })
})
