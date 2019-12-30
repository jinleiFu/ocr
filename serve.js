// const request = require('request')
// const http = require('http');

// let server = http.createServer((req, res) => {
//   console.log(req.url);
//   request.post({ url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=24.510624cf02f6b7466b7d40775c7757e1.2592000.1580097278.282335-18091036', form: { image: str } }, function (err, httpResponse, body) {
//     console.log(body)
//     res.write(body, 'utf8')
//     res.end();
//   })
// });

// server.listen(5200);


const http = require('http')
const url = require('url')
const request = require('request')
const querystring = require('querystring')

const server = http.createServer((req, res) => {

  // 定义公共变量，存储请求方法、路径、数据
  const method = req.method
  let path = ''
  let get = {}
  let post = {}

  // 判断请求方法为GET还是POST，区分处理数据
  if (method === 'GET') {
    // 使用url.parse解析get数据
    const { pathname, query } = url.parse(req.url, true)

    path = pathname
    get = query

    complete()
  } else if (method === 'POST') {
    path = req.url
    let arr = []
    req.on('data', (buffer) => {
      // 获取POST请求的Buffer数据
      arr.push(buffer)
    })
    req.on('end', () => {
      // 将Buffer数据合并
      let buffer = Buffer.concat(arr)
      // 处理接收到的POST数据
      post = querystring.parse(buffer.toString())

      complete()
    })
  }

  res.writeHead(200, { "Content-Type": 'text/plain', 'charset': 'utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS' })

  // 在回调函数中统一处理解析后的数据
  function complete() {

    console.log(path);

    if (path === '/discern') {
      request.post({ url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=24.510624cf02f6b7466b7d40775c7757e1.2592000.1580097278.282335-18091036', form: { image: post.image } }, function (err, httpResponse, body) {
        // console.log(body)
        res.write(body)
        res.end();
      })
    }

  }
})

server.listen(5200)
