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

  global.app.get('/manager', function (req, res) {
    res.render('manage', { alert: '' });
  });

  global.app.get('/project', function (req, res) {
    res.render('movie', { alert: '' })
  })
  // global.app.get('/ticket', function (req, res) {
  //   res.render('booktickets', { alert: '' })
  // })
  global.app.get('/costmer', function (req, res) {
    res.render('costmer', { alert: '', movie: obj1, theater: obj2, seat: obj4, name: obj5, ticket: obj3 })
  })
  global.app.get('/receipt', function (req, res) {
    res.render('receipt', { alert: '', alert: 's1', costmer: '', user: '' })
  })
})