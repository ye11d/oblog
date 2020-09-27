const express = require('express')
const router = express.Router()
const path = require('path')
const User = require('../models/model').User


router.get('/login', function(req, res) {
    res.render('user/login')
})

router.post('/register', function(req, res) {
    let headimg = req.files.headimg.path.split(path.sep).pop()
    let imgfile = headimg.substring(headimg.lastIndexOf('.') + 1)
    console.log('imgfile', imgfile)
    let imgfiles = ["BMP", "TIFF", "GIF", "PNG", "JPEG", "PSD", "TGA", "JPG",
        "bmp", "tiff", "gif", "png", "jpeg", "psd", "tga", "jpg"]
    console.log('imginimgs', imgfiles.includes(imgfile))
    if (imgfiles.includes(imgfile)) {
        console.log('true')
        req.fields.headimg = headimg
    } else {
        console.log('false')
        req.fields.headimg = "headimg.jpg"
    }
    name = req.fields.username
    pwd = req.fields.password
    User.find({ username: name }, function(err, u) {
        if (err) {
            return res.send('用户名已被注册')
        } else {
            User.create(req.fields, function (err, u) {
                if (err) {
                    throw err
                } else {
                    req.session.user = u
                    res.redirect('/')
                }
            })
        }
    })
})

router.post('/login', function(req, res) {
    var name = req.fields.username
    var pwd = req.fields.password
    User.findOne({ username: name}, function (err, u) {
        if (u.length == 0) {
            res.redirect('/user/login')
        } else {
            if (u.password != pwd) {
                res.redirect('/user/login')
            }
            else {
                req.session.user = u
                res.redirect('/')
            }
        }
    })
})

router.get('/loginout', function(req, res) {
    req.session.user = null
    res.redirect('/')
})

router.get('/edit', async function(req, res) {
    if (req.session.user === undefined) {
        return res.send('404 error')
    }
    res.render('user/edit')
})

router.post('/edit', async function (req, res) {
    if (req.session.user === undefined) {
        return res.send('未登录')
    }
    let headimg = req.files.headimg.path.split(path.sep).pop()
    req.fields.headimg = headimg
    User.findOneAndUpdate( { _id: req.session.user._id }, req.fields, { new: true }, function(err, u) {
        if (err) {
            throw err
        } else {
            req.session.user = u
            res.redirect('/user/edit')
        }
    })
})

router.get('/:id', async function(req, res) {
    let user = await User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log('404 error')
        }
    })
    res.render('user/detail', user)
})

module.exports = router