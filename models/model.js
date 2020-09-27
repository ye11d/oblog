const mongoose = require('./dbconnect')

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String , required: true },
    headimg: { type: String , default: "headimg.jpg" },
    saying: { type: String, default: "这个人很懒,什么也没留下" },
    ct : { type: String, default: Date.now() },
    ut : { type: String, default: Date.now() },
})

module.exports.User = mongoose.model('User', userSchema)

const blogSchema = mongoose.Schema({
    userid: { type: String, required: true },
    boardid: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, require: true },
    ct: { type: String, default: Date.now() },
    ut: { type: String, default: Date.now() },
    clicknum: { type: Number, default: 0 },
})
blogSchema.methods.findUser = async function(userid){
    let user = await mongoose.model('User').findOne({ _id: userid })
    return user
}
blogSchema.methods.findBoard = async function(boardid) {
    let board = await mongoose.model('Board').findOne({ _id: boardid })
    return board
}

module.exports.Blog = mongoose.model('Blog', blogSchema)


const boardSchema = mongoose.Schema({
    name: { type: String, required: true },
})

module.exports.Board = mongoose.model('Board', boardSchema)


const commentSchema = mongoose.Schema({
    userid: { type: String, required: true },
    blogid: { type: String, required: true },
    content: { type: String, required: true },
    ct: { type: String, default: Date.now() },
    ut: { type: String, default: Date.now() },
})

module.exports.Comment = mongoose.model('Comment', commentSchema)
