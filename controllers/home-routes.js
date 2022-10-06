const router = require('express.js').Router();
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: ['title', 'content', 'created_at'],
        include: [{
            model:User,
            attributes: ['username']
        }]
    })
    .then(dbPostData =>  {
        const post = dbPostData.map((post) => {post.get({plain: true})});
        res.render("homepage", {post})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;