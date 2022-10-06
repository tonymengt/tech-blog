const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes:req.body,
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes:req.body
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.get('/:id', (req, res) => {
    Comment.findOne({
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
                model: Post,
                attributes:req.body
            }
        ]
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message: 'Comment id not found'});
            return;
        }
        res.json(dbCommentData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.post('/', auth, (req, res) => {
    if(req.session){
        Comment.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    }

})


router.put('/:id', auth, (req, res) => {
    Comment.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message: 'Comment id not found'});
            return;
        }
        res.json(dbCommentData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/:id', auth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message: 'Comment id not found'});
            return;
        }
        res.json(dbCommentData)})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;