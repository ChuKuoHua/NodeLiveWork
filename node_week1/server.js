const http = require('http')
// NOTE - 跨網域設定
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}
// NOTE - createServer 開啟伺服器
const requestListener = (req, res) => {
  let httpStatus, content
  if (req.url === "/" && req.method === 'GET') {
    httpStatus = 200
    content = JSON.stringify({
        "status": "success",
        "data": []
    })
  } else if (req.url === "/" && req.method === 'POST') {
    httpStatus = 200
    content = JSON.stringify({
      "status": "success",
      "data": "新增成功"
    })
  } else if (req.url === "/" && req.method === 'PATCH') {
    httpStatus = 200
    content = JSON.stringify({
      "status": "success",
      "data": "更新成功"
    })
  } else if (req.url === "/" && req.method === 'DELETE') {
    httpStatus = 200
    content = JSON.stringify({
      "status": "success",
      "data": "刪除成功"
    })
  } else {
    httpStatus = 404
    content = JSON.stringify({
      "status": "error",
      "data": "查無此網址"
    })
  }

  res.writeHead(httpStatus, headers);
  res.write(content)
  res.end();
}
const server = http.createServer(requestListener);
server.listen(3001);