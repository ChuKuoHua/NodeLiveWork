// NOTE - 跨網域設定
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}

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