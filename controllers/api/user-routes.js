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

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
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
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})


router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({message: 'username does not exist.'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password)

        if(!validPassword){
            res.status(400).json({message: 'incorrect password'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user: dbUserData, message:'you are not logged in'});
        });
    });
});


router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})
module.exports = router