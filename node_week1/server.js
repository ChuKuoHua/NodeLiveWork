const http = require('http')
const {v4: uuidv4 } = require('uuid')
const err = require('./errHandle')
const successHandle = require('./successHandle')
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
    successHandle(res, todos)
  } else if (req.url === "/todos" && req.method === 'POST') {
    // NOTE - 新增代辦
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title
        const todo = {
          id: uuidv4(),
          title: title
        }
        todos.push(todo)
        if(title) {
          successHandle(res, todos)
        } else {
          err.errHandle(res)
        }
      } catch (error) {
        err.errHandle(res)
      }
    })
  } else if (req.url === "/todos" && req.method === 'PATCH') {
    // TODO - 更新代辦
    successHandle(res, "更新成功")
  } else if (req.url === "/todos" && req.method === 'DELETE') {
    // TODO - 刪除全部代辦
    todos.length = 0 // 清空全部 todo
    successHandle(res, todos)
  } else if (req.url.startsWith("/todos/") && req.method === 'DELETE') {
    // TODO - 刪除單筆代辦
    const id = req.url.split('/').pop() // 取得 todo id
    const index = todos.findIndex(element => element.id === id) // 找出 id 位置

    if(index !== -1) {
      todos.splice(index, 1) // 移除此 id 資料
      successHandle(res, todos)
    } else {
      err.errHandle(res)
    }
  } else if (req.method === 'OPTIONS') {
    // NOTE - OPTIONS 檢查機制
    res.writeHead(200, headers);
    res.end();
  } else {
    // NOTE - 404 錯誤顯示
    err.notHandle(res)
  }
}
const server = http.createServer(requestListener);
server.listen(3001);