const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')


const url = 'http://zkzs.gdhsc.edu.cn/plus/view.php?aid= '
console.log('开始爬取图片。。。。')
for (let i = 1; i < 10; i++) {
    startSpider(url + i)
}
console.log('爬取结束。。。。。')





function startSpider (url) {
    request(url, (err, res) => {
        if (err) {
            return console.log(err)
        }
        const $ = cheerio.load(res.body)
        $('.newsconts img').each((index, item) => {
            saveImg('http://zkzs.gdhsc.edu.cn' + $(item).attr('src'))
            console.log($(item).attr('src').split('/')[4])
        })




    })
}

function saveImg (img_src) {
    request.head(img_src, (err, res, body) => {
        if (err) {
            return console.log(err)
        }
    })
    request(img_src).pipe(fs.createWriteStream('./img/' + img_src.split('/')[6] + '.jpg'))
}