module.exports = (() => {


  global.app.get('/', function (req, res) {
    res.render('login', { alert: '' });
  })

  global.app.get('/signup', function (req, res) {
    res.render('signup', { msg: '' })
    // { msg: 'name field is blank' }
  })
  global.app.get('/forget', function (req, res) {
    res.render('forget', { alert: '' })
  })
  global.app.get('/theater', function (req, res) {
    res.render('theater', { alert1: '' })
  })
})