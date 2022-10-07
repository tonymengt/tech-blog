const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const auth = require('../utils/auth');

router.get("/", auth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    order:[
        ['created_at', 'DESC']
      ],
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
  .then(dbPostData => {
    const post = dbPostData.map(post => post.get({plain:true}));
    res.render('dashboard', {post, loggedIn: true})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/edit/:id', auth, (req, res) => {
    Post.findOne({
        where: {
            id:req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
          ],
          include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [ 'id', 'comment', 'post_id', 'created_at'],
                order:[
                    ['created_at', 'DESC']
                  ],
                include:[{
                    model:User,
                    attributes: ['username']
                }]
            }
          ],
          order:[
            [Comment, 'created_at', 'DESC']
          ],
        })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
        const post = dbPostData.get({plain:true});
        res.render('edit-post', { 
            post,
            loggedIn:req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

module.exports = router;
