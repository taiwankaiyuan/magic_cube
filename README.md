# 3D 3x3 魔術方塊互動遊戲

> 個人開源專案

## 專案目標
- 在網頁上呈現可自由旋轉的 3D 3x3 魔術方塊
- 提供打亂與自動還原機制，讓使用者練習還原流程

## 功能
1. **打亂按鈕**：隨機生成並依序執行魔術方塊的打亂步驟
2. **恢復按鈕**：根據打亂序列反向逐步還原魔術方塊
3. **互動控制**：
   - 滑鼠懸停方塊時，游標變為手型
   - 滑鼠拖曳可旋轉整個模型，檢視各面顏色

## 技術細節

1. **模組匯入（提示詞）**：請在 `src/js/main.js` 檔案最上方，匯入 `three`、`OrbitControls`（`three/examples/jsm/controls/OrbitControls`）及 `cube.js`，以便使用相關模組與函式。
2. **全螢幕黑底（提示詞）**：請在 `src/css/style.css` 檔案中，設定 `html, body, #container, canvas` 為寬高 100% 並背景為黑色，以實現全螢幕黑底樣式。
3. **Renderer 設定（提示詞）**：請在 `src/js/main.js` 檔案中，初始化 `WebGLRenderer`，並設定尺寸為 `window.innerWidth` x `window.innerHeight`、像素比為 `window.devicePixelRatio` 以及背景色為黑色，以初始化渲染器。
4. **鏡頭與阻尼（提示詞）**：請在 `src/js/main.js` 檔案中，實例化 `PerspectiveCamera` 並呼叫 `camera.lookAt(0,0,0)`，再啟用 `OrbitControls.enableDamping` 以提供更流暢的互動體驗。
5. **互動控制（提示詞）**：請在 `src/js/main.js` 檔案中，初始化 `OrbitControls`，並設定滑鼠拖曳以旋轉整個 3D 模型的交互邏輯。
6. **響應式視窗（提示詞）**：請在 `src/js/main.js` 檔案中，監聽 `window.resize` 事件，並在回調中更新相機的 `aspect`、呼叫 `camera.updateProjectionMatrix()` 及 `renderer.setSize()`，以保持畫面隨視窗調整。
7. **方塊動畫邏輯（提示詞）**：請在 `src/js/cube.js` 檔案中，定義並匯出 `shuffle()` 與 `restore()` 函式，並實作步驟紀錄邏輯，以便打亂與還原序列能正確儲存與執行。
8. **打亂按鈕（提示詞）**：請在 `src/js/main.js` 檔案中，匯入 `shuffle` 函式（來源：`src/js/cube.js`），並實作綁定 `#shuffleBtn` 的 `click` 事件，以呼叫 `shuffle()` 進行隨機打亂魔術方塊的邏輯。
9. **恢復按鈕（提示詞）**：請在 `src/js/main.js` 檔案中，匯入 `restore` 函式（來源：`src/js/cube.js`），並實作綁定 `#restoreBtn` 的 `click` 事件，以呼叫 `restore()` 進行反向還原魔術方塊的邏輯。

## 使用技術
- HTML5 & CSS3
- JavaScript (ES6+)
- [Three.js](https://threejs.org/)：3D 渲染引擎
- Three.js OrbitControls：滑鼠交互控制
- Webpack：前端模組打包工具
- Node.js & npm：套件管理與開發環境

## 目錄結構
GameTest/
├── README.md
├── CHANGELOG.md
├── package.json
├── webpack.config.js
├── index.html
├── src/
│   ├── js/
│   │   ├── main.js
│   │   └── cube.js
│   └── css/
│       └── style.css
└── node_modules/

## 開源協議
- MIT License
