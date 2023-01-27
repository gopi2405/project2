module.exports = (() => {
    global.app.post("/login_api", (req, res) => {
        var user_email = req.body.name;
        var psw = req.body.Password;
        let uname;
        let email;
        global.db_con.query("SELECT * FROM users", function (err, result) {
            let user_arr = result.find(user => user.email == user_email);
            if (user_email == user_arr.uname && psw == user_arr.psw) {
                console.log("login successful");
                res.send('login complete');
            } else if (user_email == user_arr.email && psw == user_arr.psw) {
                console.log("login successful");
                res.send('login complete');
            }
            else {
                res.render('login', { alert: 'login failed' })
            }

        });
    })
})
