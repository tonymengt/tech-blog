const {Comment} = require('../models');

const data = [
    {
        comment: 'test',
        user_id: '5',
        post_id: '1'
    },
    {
        comment: 'hello',
        user_id: '5',
        post_id: '2'
    },
    {
        comment: 'badbad',
        user_id: '3',
        post_id: '4'
    },
    {
        comment: 'fun',
        user_id: '2',
        post_id: '5'
    },
    {
        comment: 'cool',
        user_id: '1',
        post_id: '5'
    },
    {
        comment: 'okay',
        user_id: '4',
        post_id: '3'
    },
    {
        comment: 'test',
        user_id: '2',
        post_id: '2'
    },
]

const commentSeed = () => Comment.bulkCreate(data)

module.exports = commentSeed;