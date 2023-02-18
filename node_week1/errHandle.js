// NOTE - 跨網域設定
const headers = require('./headers')

exports.errHandle = (res) => {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      "status": "false",
      "message": "未填寫正確欄位，或沒有此 todo ID",
    })
  )
  res.end();
}

exports.notHandle = (res) => {
  res.writeHead(404, headers);
  res.write(
    JSON.stringify({
      "status": "error",
      "message": "查無此網址",
    })
  )
  res.end();
}