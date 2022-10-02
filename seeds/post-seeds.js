const sequelize = require('../config/connection');
const {Post} = require('../models');

const data = [
    {
        title: 'hellohello',
        content: 'hello to you. hello hello to you hello.',
        user_id: 1
    },
    {
        title: 'Test',
        content: 'test to you. test test to you test.',
        user_id: 5
    },
    {
        title: 'byebye',
        content: 'byebye to you. byebye byebye to you byebye.',
        user_id: 2
    },
    {
        title: 'hihi',
        content: 'hihi to you. hihi hihi to you hihi.',
        user_id: 3
    },
    {
        title: 'caio',
        content: 'caio to you. caio caio to you caio.',
        user_id: 4
    }
]

const postSeed = () => Post.bulkCreate(data);

module.exports = postSeed;