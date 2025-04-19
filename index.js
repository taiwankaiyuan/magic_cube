const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// 提供靜態檔案
app.use(express.static(path.join(__dirname, 'dist')));

// 所有請求都導向 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`伺服器運行於 http://localhost:${PORT}`);
});
