const express = require('express')
const router = express.Router()
const Board = require('../models/model').Board
const Blog = require('../models/model').Blog

router.get('/board', function (req, res) {
    if (req.session.user.username != 'manager') {
        res.send('404 error')
    }
    Board.find(function (err, boards) {
        if (err) {
            console.log('board find error')
        } else {
            res.render('manager/board', { boards })
        }
    })
})

router.get('/board/delete/:id', function (req, res) {
    if (req.session.user.username != 'manager') {
        res.send('404 error')
    }
    Board.deleteOne({ _id: req.params.id }, function (err, board) {
        if (board.length == 0) {
            console.log('404 error')
        } else {
            res.redirect('/manager/board')
        }
    })
})

router.get('/blog', function (req, res) {
    if (req.session.user.username != 'manager') {
        res.send('404 error')
    }
    Blog.find(function (err, blogs) {
        if (err) {
            console.log('blog find error')
        } else {
            res.render('manager/blog', { blogs })
        }
    })
})

router.get('/blog/delete/:id', function (req, res) {
    if (req.session.user.username != 'manager') {
        res.send('404 error')
    }
    Blog.deleteOne({ _id: req.params.id }, function (err, blog) {
        if (err) {
            console.log('404 error')
        } else {
            res.redirect('/manager/blog')
        }
    })
})

module.exports = router