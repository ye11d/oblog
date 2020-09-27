//分页
//获取原始url
var originurl = document.location.pathname + document.location.search
let boardpos = originurl.indexOf("board=")
let pagepos = originurl.indexOf("page=")
//选择的板块高亮
var boardhref
if (boardpos == -1) {
    boardhref = "/blog"
} else {
    if (pagepos == -1) {
        boardhref = document.location.search
    } else {
        boardhref = document.location.search.slice(0, pagepos - 6)
    }
}
$(".boarditem a").each(function (index, element) {
    if ($(element).attr('href') == boardhref) {
        console.log('success')
        $(element).parent().addClass('select')
    }
})

if (pagepos == -1) {
    if (boardpos == -1) {
        originurl += "?page="
    } else {
        originurl += "&page="
    }
} else {
    originurl = originurl.slice(0, pagepos + 5)
}
console.log("originurl", originurl)
//获取当前页码, 板块页码总数
let maxpage = parseInt($('.pageMax').html())
let currentpage = parseInt($('.pagelist .select').html())

//去重
if (maxpage === currentpage || maxpage == 0) {
    $('.pageMax').remove()
}
//设置最后一页的页码
$('.pageMax').attr('href', originurl + maxpage)

//插入当前页左边页码
if (currentpage - 3 > 0) {
    //第一页
    $('.pagelist .select').before(`<a class="pageitem pagehead" href="/blog?page=1"><<</a>`)
    //省略点
    let text = `<a class="pageitem">...</a>`
    $('.pagelist .select').before(text)
    //前一页
    $('.pagelist .select').before(`<a class="pageitem" href="${originurl}${currentpage - 2}">${currentpage - 2}</a>`)
    $('.pagelist .select').before(`<a class="pageitem" href="${originurl}${currentpage - 1}">${currentpage - 1}</a>`)
} else {
    for (let i = 1; i < currentpage; i++) {
        let text = `<a class="pageitem" href="${originurl}${i}">${i}</a>`
        $('.pagelist .select').before(text)
    }
}

// 插入当前页右边页码
if (maxpage - currentpage > 3) {
    //最后一页
    $('.pagelist .pageMax').html('>>')
    //省略点
    let text = `<a class="pageitem">...</a>`
    $('.pagelist .select').after(text)
    //后两页
    $('.pagelist .select').after(`<a class="pageitem" href="${originurl}${currentpage + 2}">${currentpage + 2}</a>`)
    $('.pagelist .select').after(`<a class="pageitem" href="${originurl}${currentpage + 1}">${currentpage + 1}</a>`)
} else {
    for (let i = maxpage - 1; i > currentpage; i--) {
        let text = `<a class="pageitem" href="${originurl}${i}">${i}</a>`
        $('.pagelist .select').after(text)
    }
}

//时间
var time1 = function (timestamp) {
    var d = new Date(timestamp)
    var nm = d.getFullYear()
    var yt = d.getMonth() + 1
    var ri = d.getDate()
    return `${nm}/${yt}/${ri}`
}
var time2 = function (timestamp) {
    var d = new Date(timestamp)
    var nm = d.getFullYear()
    var yt = d.getMonth() + 1
    var ri = d.getDate()
    var ui = d.getHours()
    var ff = d.getMinutes()
    var mc = d.getSeconds()
    return `${nm}/${yt}/${ri} ${ui}:${ff}:${mc}`
}
$('.blogtime').each(function () {
    let timestamp = parseInt($(this).html())
    $(this).html(time1(timestamp))
})