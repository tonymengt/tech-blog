const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: req.body,
        include: [
            {
                model: Post,
                attributes: req.body,
                include: [
                    {
                        model: Comment,
                        attributes: req.body
                    }
                ]
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.post('/', (req, res) => {
    User.create(req.body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router