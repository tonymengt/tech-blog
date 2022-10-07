const router = require('express').Router();
const {User, Post, Comment} = require('../models');

router.get("/", (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: ['id','title', 'content', 'created_at'],
        order:[
          ['created_at', 'DESC']
        ],
        include: [{
            model:User,
            attributes: ['username']
        }]
    })
    .then(dbPostData =>  {
        const post = dbPostData.map((post) => post.get({plain: true}));
        res.render("homepage", {
            post,
            loggedIn:req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
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

        const post = dbPostData.get({ plain: true });
        // console.log(post)
        res.render('single-post', { 
            post,
            loggedIn:req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
})

router.get('/signup', (req,res) => {
    res.render('signup');
})
module.exports = router;