const express = require('express')
const router = express.Router()
const Board = require('../models/model').Board
const Blog = require('../models/model').Blog

router.post('/new', function (req, res) {
    if (req.session.user.username != 'manager') {
        res.send('404 error')
    }
    Board.insertMany(req.fields, function (err) {
        if (err) {
            throw err
        } else {
            res.redirect('/manager/board')
        }
    })
})

module.exports = router