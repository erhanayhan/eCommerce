const router = require("express").Router();

const { request } = require("express");
const Favorites = require("../models/Favorites");

router.post("/", (req, res) => {
    const favorites = new Favorites({
        id:req.body.id,
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        userId: req.body.userId,


    })
    favorites.save()
        .then(data => {
            res.json(data)
        })
})

router.get('/', async (req, res) => {
    try {
        const posts = await Favorites.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})



router.get('/:userId', async (req, res) => {
    try {
        const post = await Favorites.find({ userId: req.params.userId })
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})
router.delete('/:title', async (req, res) => {
    try {
        const post = await Favorites.deleteOne({title:req.params.title})
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;