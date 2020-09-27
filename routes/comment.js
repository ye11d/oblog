const express = require('express')
const router = express.Router()
const { Comment } = require('../models/model')


router.post('/new/:blogid', function (req, res) {
    if (req.session.user == undefined) {
        return res.send('未登录/注册')
    }
    req.fields.userid = req.session.user._id
    req.fields.blogid = req.params.blogid
    Comment.insertMany(req.fields, function (err) {
        if (err) {
            res.send('404 error')
        } else {
            res.redirect(`/blog/${req.params.blogid}`)
        }
    })
})

module.exports = router