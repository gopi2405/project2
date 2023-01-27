module.exports = (() => {
    global.app.post('/forget', (req, res) => {
        var email = req.body.email;
        var psw = req.body.psw;
        var cpsw = req.body.cpsw;
        global.db_con.query("SELECT * FROM users", function (err, result) {
            let user_arr = result.find(user => user.email == email);
            if (user_arr.email == email) {
                user_arr.psw = psw;
                user_arr.cpsw = psw;
                res.send('password changed successfully')
            } else {
                throw err;
            }
        })

    })
})