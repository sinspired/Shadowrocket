// 返回一个透明1x1像素 PNG
const transparentPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

$done({
  body: atob(transparentPngBase64),
  headers: {
    'Content-Type': 'image/png'
  },
  status: 200
});
