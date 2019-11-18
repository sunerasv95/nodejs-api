const express       = require('express');
const middleware    = require('./middleware/appMiddleware');
const config        = require('./config/config');
const appConfig     = require('./config/appConfig');
const api           = require('./api/routes/');
const auth          = require('./api/auth/authRoutes');

const app = express();

//setup middleware
middleware(app);


//setup app routes
app.use('/api', api);
app.use('/auth', auth);
app.use('/api/test', function(req, res){
    res.send('test pass!');
})

//global error handling

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

//start server
app.listen(appConfig.app.port, function(error){
    if(error){
        console.log(error);
    }else{

        console.log('Server started at PORT', appConfig.app.port);
    }
});

