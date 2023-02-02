module.exports = (() => {
    global.app.post('/forget', (req, res) => {
        var email = req.body.email;
        var psw = req.body.psw;
        var cpsw = req.body.cpsw;
        global.db_con.query("SELECT * FROM users", function (err, result) {
            var arr = result.find(user => user.email == email);
            if (typeof arr !== "undefined") {
                if (psw == cpsw) {
                    var update = "update users set psw = ?, cpsw = ? where email = ?";
                    global.db_con.query(update, [psw, cpsw, email], (result) => {
                        console.log(result);
                    });
                    res.render('login', { alert: '' })
                } else {
                    res.render('forget', { alert: 'psw' });
                }
            } else {
                res.render('forget', { alert: 'err' })
            }
        })
    })
})