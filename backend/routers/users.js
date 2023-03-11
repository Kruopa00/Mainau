const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({message: 'The user with the given ID was not found!'})
    }

    res.status(200).send(user);
})

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    })
    user = await user.save();

    if (!user)
    return res.status(404).send('the user cannot be created!')

    res.send(user);
})

router.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }
    
})

router.post('/register', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
    })
    user = await user.save();

    if (!user)
    return res.status(404).send('the user cannot be created!')

    res.send(user);
})

router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        userCount: userCount,
    });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            if (user) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: 'the user is deleted!',
                    });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'user not found!' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});

router.put('/review', async (req, res, next) => {

    const { rating, comment, userId} = req.body;

    const userAddedId = await User.findById(req.body.userAddedId);
    if(!userAddedId) return res.status(400).send('Invalid userAddedId')

    const nameWhoAdded = userAddedId.name;

    const review = {
        userAddedId: req.body.userAddedId,
        nameWhoAdded,
        rating: Number(rating),
        comment
    }

    const user = await User.findById(userId);

    const isReviewed = user.reviews.find(
        r => r.userAddedId.toString() === req.body.userAddedId.toString()
    )

    if (isReviewed) {
        user.reviews.forEach(review => {
            if (review.userAddedId.toString() === req.body.userAddedId.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        user.reviews.push(review);
        user.numOfReviews = user.reviews.length
    }

    user.ratings = user.reviews.reduce((acc, item) => item.rating + acc, 0) / user.reviews.length

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })
});

router.get('/reviews/:id', async (req, res) => {
    
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(500).json({message: 'The user with the given ID was not found!'})
    }
    
    res.status(200).json({
        success: true,
        reviews: user.reviews
    });
});

router.get('/reviews/:id/:userAddedId', async (req, res) => {
    
    const user = await User.findById(req.params.id);
    console.log(req.params.userAddedId);
    console.log(JSON.stringify(user.reviews));
    var newArray = user.reviews.filter(function (el) {
        return el.userAddedId == req.params.userAddedId;
      });

    if (!user) {
        res.status(500).json({message: 'The user with the given ID was not found!'})
    }
    
    const returnVal = newArray.length > 0 ? newArray[0] : null;
    res.status(200).json({
        success: true,
        review: returnVal
    });
});


router.delete('/reviews/:userId/:id', async (req, res) => {
    
    const user = await User.findById(req.params.userId);

    if (!user) {
        res.status(500).json({message: 'The user with the given ID was not found!'})
    }

    const reviews = user.reviews.filter(review => review._id.toString() !== req.params.id.toString());

    if (!reviews) {
        res.status(500).json({message: 'The review with the given ID was not found!'})
    }

    var numOfReviews = reviews.length;
    var ratings = user.reviews.reduce((acc, item) => item.rating + acc, 0) / (numOfReviews + 1);
    
    if (reviews.length === 0) {
        numOfReviews = Number(0);
        ratings = Number(0);
    } 
    
    await User.findByIdAndUpdate(req.params.userId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({ success: true });
});

module.exports = router;