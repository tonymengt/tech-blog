const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes:req.body,
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes:['comment']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.get('/:id', (req, res) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        attributes:req.body,
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes:['comment']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'post id not found'});
            return;
        }
        res.json(dbPostData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})




router.post('/', auth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.put('/:id',auth, (req, res) => {
    Post.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'post id not found'});
            return;
        }
        res.json(dbPostData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/:id', auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'post id not found'});
            return;
        }
        res.json(dbPostData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;