// NOTE - 跨網域設定
const headers = require('./headers')

function successHandle(res, msg) {
  res.writeHead(200, headers);
  res.write(
    JSON.stringify({
      "status": "success",
      "data": msg
    })
  )
  res.end();
}

module.exports = successHandle