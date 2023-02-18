// NOTE - 功能引入 
const http = require('http')
const {v4: uuidv4 } = require('uuid')
const err = require('./errHandle')
const successHandle = require('./successHandle')
const headers = require('./headers')

const todos = []
// SECTION - createServer 開啟伺服器
const requestListener = (req, res) => {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
  })

  if (req.url === "/todos" && req.method === 'GET') {
    // NOTE - 讀取代辦
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
  } else if (req.url === "/todos" && req.method === 'DELETE') {
    // NOTE - 刪除全部代辦
    todos.length = 0 // 清空全部 todo
    successHandle(res, todos)
  } else if (req.url.startsWith("/todos/") && req.method === 'DELETE') {
    // NOTE - 刪除單筆代辦
    const id = req.url.split('/').pop() // 取得 todo id
    const index = todos.findIndex(element => element.id === id) // 找出 id 位置

    if(index !== -1) {
      todos.splice(index, 1) // 移除此 id 資料
      successHandle(res, todos)
    } else {
      err.errHandle(res)
    }
  } else if (req.url.startsWith("/todos/") && req.method === 'PATCH') {
    // NOTE - 更新代辦
    req.on('end', () => {
      try {
        const todo = JSON.parse(body).title
        const id = req.url.split('/').pop()
        const index = todos.findIndex(element => element.id === id)
        if (todo && index !== -1) {
          todos[index].title = todo
          successHandle(res, todos)
        } else {
          err.errHandle(res)
        }
      } catch (error) {
        err.errHandle(res)
      }
    })
  } else if (req.method === 'OPTIONS') {
    // NOTE - OPTIONS 檢查機制(跨網域請求)
    res.writeHead(200, headers);
    res.end();
  } else {
    // NOTE - 404 錯誤顯示
    err.notHandle(res)
  }
}
const server = http.createServer(requestListener);
server.listen(3001);