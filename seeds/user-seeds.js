const sequelize = require('../config/connection');
const {User} = require('../models');

const data = [
    {
        username: 'hello',
        password: 'password'
    },
    {
        username: 'goodbye',
        password: 'password'
    },
    {
        username: 'morning',
        password: 'password'
    },
    {
        username: 'evening',
        password: 'password'
    },
    {
        username: 'afternoon',
        password: 'password'
    }
]

const seedUser = () => User.bulkCreate(data, {individualHooks: true});

module.exports = seedUser;