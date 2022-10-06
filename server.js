const sequelize = require('./config/connection');
const express = require('express');
const controller = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');

const hbs = exphbs.create({});

// this is for port connection
const app = express();
const PORT = process.env.PORT || 3002;
// this is being able to use put methods
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// importing the routes within the controllers
app.use(controller);
// set handlebars as default tempalte engine
app.engine('handlbars', hbs.engine);
app.set('view engine', 'handlbars');

app.use(express.static(path.join(__dirname, 'public')));



sequelize.sync({force : false}).then(() => {
    app.listen(PORT, () => {
        console.log("now connected and listening!!!")
    })
})