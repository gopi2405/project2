module.exports = (() => {
    global.app.post("/login_api", (req, res) => {
        var user_email = req.body.name;
        var psw = req.body.Password;
        global.db_con.query("SELECT * FROM users", function (err, result) {
            let user_arr = result.find(user => user.email == user_email);
            if (user_email == user_arr.uname && psw == user_arr.psw) {
                console.log("login successful");
                res.render('theater');
            } else if (user_email == user_arr.email && psw == user_arr.psw) {
                console.log("login successful");
                res.render('theater', { alert1: '' });
            }
            else {
                res.render('login', { alert: 'msg' })
            }

        });
    })
})
