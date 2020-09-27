module.exports = function(app) {
    app.get('/', function(req, res) {
        res.redirect('/blog')
    })
    app.use('/user', require('./user'))
    app.use('/blog', require('./blog'))
    app.use('/board', require('./board'))
    app.use('/manager', require('./manager'))
    app.use('/comment', require('./comment'))
}
