const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);


const app = express();

app.use(bodyParser.json());

//Set cookie
app.use(
    cookieSession({
        maxAge: 30* 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey]
    }));

//Authentication
app.use(passport.initialize());
app.use(passport.session());
//end set cookie

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like our main.js file, or main.css file

       app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    // If express didn't find any route matches listed above,
    // will try to find in client/build
    const path = require('path');
    app.get('*', (req, res)=>{
        console.log('__dirname', __dirname);
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ));
    });
}





const PORT = process.env.PORT || 5000;
app.listen(PORT);