const sequelize = require('./config/connection');
const express = require('express');
const controller = require('./controllers');



const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(controller);

sequelize.sync({force : false}).then(() => {
    app.listen(PORT, () => {
        console.log("now connected and listening!!!")
    })
})