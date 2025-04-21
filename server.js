const express = require('express');
const path = require('path');
const app = express();
// Zeabur 會提供 PORT 環境變數，本地開發則用 3000
const port = process.env.PORT || 3000;

// 指定提供靜態檔案的目錄 (Webpack 的輸出目錄)
app.use(express.static(path.join(__dirname, 'dist')));

// 簡化路由設定，只提供靜態檔案
// 如果需要 SPA 路由支援，可以稍後再加入

app.listen(port, () => {
	console.log(`伺服器已啟動，監聽端口 ${port}`);
	console.log(`請在瀏覽器中訪問 http://localhost:${port}`);
});
