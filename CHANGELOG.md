# Changelog

## 2025-04-19 19:20:10

### 初始化

- [human]建立README.md、CHANGELOG.md

## 2025-04-19 19:22:47

### 建立專案結構

- [AI] 建立 `package.json`、`webpack.config.js`
- [AI] 建立 `src/index.html`
- [AI] 建立 `src/js/main.js`、`src/js/cube.js`
- [AI] 建立 `src/css/style.css`
- [AI] 建立 `node_modules` 目錄

## 2025-04-19 19:37

### 調整 index.html 位置與更新說明文件

- [human] 將 `index.html` 從 `src/` 移至專案根目錄
- [AI] 同步更新 `README.md` 目錄結構

## 2025-04-19 19:52

### 模組匯入

- [AI] 於 [src/js/main.js](cci:7://file:///c:/Users/taiwa/Desktop/GameTest/src/js/main.js:0:0-0:0) 匯入 `three`、`OrbitControls` 與 `cube.js`，依 README 技術細節說明完成模組載入。

## 2025-04-19 20:11

### 樣式修正

- [AI] 依 README 技術細節，於 [src/css/style.css](cci:7://file:///c:/Users/taiwa/Desktop/GameTest/src/css/style.css:0:0-0:0) 設定 `html, body, #container, canvas` 為寬高 100% 並背景為黑色，實現全螢幕黑底效果。

## 2025-04-19 20:13:46

### 渲染器初始化

- [AI] 於 [src/js/main.js](cci:7://file:///c:/Users/taiwa/Desktop/GameTest/src/js/main.js:0:0-0:0) 新增 WebGLRenderer 初始化程式碼，設定尺寸、像素比及背景色（黑色），並將渲染畫布附加至 `#container`。

## 2025-04-19 20:19:19

### 鏡頭與阻尼功能強化

- [AI] 於 [src/js/main.js](cci:7://file:///c:/Users/taiwa/Desktop/GameTest/src/js/main.js:0:0-0:0) 新增 `PerspectiveCamera` 實例、呼叫 `camera.lookAt(0,0,0)`，並啟用 `OrbitControls.enableDamping`，提升 3D 互動流暢度。

## 2025-04-19 20:20:35

### 互動控制

- [AI] 於 `src/js/main.js` 初始化 `OrbitControls` 並實作動畫循環，結合 `controls.update()` 以啟用滑鼠拖曳旋轉 3D 模型互動邏輯。

## 2025-04-19 20:30:25

### 響應式視窗調整

- [AI] 於 `src/js/main.js` 中新增 `resize` 事件監聽，更新 camera.aspect、呼叫 camera.updateProjectionMatrix() 並設定 renderer 大小，確保視窗調整時畫面自適應。

## 2025-04-19 20:34:20

### 打亂與還原功能實作

- [AI] 於 `src/js/cube.js` 中新增 `shuffle()` 與 `restore()` 函式，並實作步驟紀錄及反向還原邏輯，確保打亂與還原序列能正確儲存及執行。

## 2025-04-19 20:50:00

### 打亂按鈕功能

- [AI] 於 `src/js/main.js` 匯入 `shuffle` 函式，並綁定 `#shuffleBtn` 的 `click` 事件，實現隨機打亂魔術方塊功能。

## 2025-04-19 20:50:00

### 按鈕功能

- [AI] 於 `src/js/main.js` 匯入 `restore` 函式，並綁定 `#restoreBtn` 的 `click` 事件，實現還原魔術方塊功能。