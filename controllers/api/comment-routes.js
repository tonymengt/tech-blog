const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

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




router.post('/', (req, res) => {
    Comment.create(req.body)
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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