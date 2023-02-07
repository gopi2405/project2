var express = require('express');
global.app = express();
var bodyParser = require('body-parser');
var PORT = 3000;
var path = require('path');


global.app.set('view engine', 'ejs');
app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({ extended: false }));
global.app.use(express.static(path.join(__dirname, 'css')));



(() => {
    require('./routes/db')();
    require('./routes/sign_up')();
    require('./routes/Route')();
    require('./routes/login')();
    require('./routes/forget')();
    require('./routes/theater')();
    require('./routes/movie')();
    require('./routes/booktickets')();
    require('./routes/manage')();
    require('./routes/costmer')();

})();

global.app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT)
});