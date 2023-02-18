const http = require('http')
const {v4: uuidv4 } = require('uuid')
// NOTE - 跨網域設定
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}
const todos = []
// SECTION - createServer 開啟伺服器
const requestListener = (req, res) => {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  if (req.url === "/todos" && req.method === 'GET') {
    // TODO - 讀取代辦
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        "status": "success",
        "data": todos
      })
    )
    res.end();
  } else if (req.url === "/todos" && req.method === 'POST') {
    // NOTE - 新增代辦
    req.on('end', () => {
      const title = JSON.parse(body).title
      const todo = {
        id: uuidv4(),
        title: title
      }
      todos.push(todo)

      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          "status": "success",
          "data": todos
        })
      )
      res.end();
    })
  } else if (req.url === "/todos" && req.method === 'PATCH') {
    // TODO - 更新代辦
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        "status": "success",
        "data": "更新成功"
      })
    )
    res.end();
  } else if (req.url === "/todos" && req.method === 'DELETE') {
    // TODO - 刪除代辦
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        "status": "success",
        "data": "刪除成功"
      })
    )
    res.end();
  } else if (req.method === 'OPTIONS') {
    // NOTE - OPTIONS 檢查機制
    res.writeHead(200, headers);
    res.end();
  } else {
    // NOTE - 404 錯誤顯示
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        "status": "error",
        "data": "查無此網址"
      })
    )
    res.end();
  }
}
const server = http.createServer(requestListener);
server.listen(3001);