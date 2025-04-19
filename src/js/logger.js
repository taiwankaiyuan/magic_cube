// 記錄除錯資訊並輸出到下載檔案
const logs = [];

/**
 * 將訊息加入紀錄並輸出到 console
 */
export function log(msg) {
	const line = `[${new Date().toISOString()}] ${msg}`;
	logs.push(line);
	console.log(line);
}

/**
 * 下載紀錄為 debug.log 檔案
 */
export function downloadLog() {
	const blob = new Blob([logs.join("\n")], { type: "text/plain" });
	const a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = "debug.log";
	a.click();
}
