const express = require('express')
const router = express.Router()
const path = require('path')
const Blog = require('../models/model').Blog
const Board = require('../models/model').Board
const marked = require('marked')
const ejs = require('ejs')
const { User, Comment } = require('../models/model')



async function getBoards(){
    let boards = await Board.find(function (err, boards) {
        if (err) {
            console.log('board find error')
        }
    })
    // console.log('boards', boards)
    return boards
}
async function getBlogs(page, pageblognumber, boardid) {
    if (boardid == undefined){
        return await Blog.find(function (err, blogs) {
            if (err) {
                console.log('blog find error')
            }
        }).sort({ _id: -1 }).limit(pageblognumber).skip((page - 1) * pageblognumber)
    } else {
        return await Blog.find({ "boardid": boardid }, function (err, blogs) {
            if (err) {
                console.log('blog find error')
            }
        }).sort({ _id: -1 }).limit(pageblognumber).skip((page - 1) * pageblognumber)
    }
}

router.get('', async function (req, res) {
    let boards = await getBoards(page)
    //分板块 取board
    let boardid = req.query.board
    //分页所需数据 取博客总数->pageNumber
    const pageblognumber = 20 //单页博客数量 config
    var page = req.query.page
    if (page === undefined) {
        page = 1
    }
    var blogNumber
    if (boardid === undefined){
        blogNumber = await Blog.countDocuments()
    } else {
        blogNumber = await Blog.find({ "boardid": boardid }).countDocuments()
    }
    var pageMax
    if (blogNumber % pageblognumber == 0) {
        pageMax = parseInt(blogNumber / pageblognumber)
    } else {
        pageMax = parseInt(blogNumber / pageblognumber) + 1
    }
    //blog数据部分
    let blogs = await getBlogs(page, pageblognumber, boardid)
    let blogboards = []
    let blogusers = []
    let blogcommentnums = []
    for (let blog of blogs) {
        let board = await blog.findBoard(blog.boardid)
        let user = await blog.findUser(blog.userid)
        let commentnum = await Comment.find({ "blogid": blog._id }).countDocuments()
        blogboards.push(board)
        blogusers.push(user)
        blogcommentnums.push(commentnum)
    }
    res.render('blog/index', { boards, blogs, blogusers, blogboards, pageMax, page, blogcommentnums })
})

router.get('/new',async function(req, res) {
    let boards = await getBoards()
    res.render('blog/new', { boards })
})

router.post('/new', function(req, res) {
    req.fields.userid = req.session.user._id
    Blog.insertMany(req.fields, function(err) {
        if (err) {
            throw err
        } else {
            res.redirect('/')
        }
    })
})

router.get('/:id',async function(req, res) {
    let blog = await Blog.findByIdAndUpdate(req.params.id, { "$inc": {'clicknum': 1} })
    let bloguser = await User.findById(blog.userid)
    let comments = await Comment.find({ blogid: req.params.id })
    let commentnum = await Comment.find({ blogid: req.params.id }).countDocuments()
    let commentusers = []
    var user
    for (let comment of comments) {
        user = await User.findById(comment.userid)
        commentusers.push(user)
    }
    blog.content = marked(blog.content)
    res.render('blog/detail', { blog, bloguser, comments, commentusers, commentnum })
})

module.exports = router