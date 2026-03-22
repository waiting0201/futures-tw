# 股票／期貨 計算表單 — Angular 21

## 專案規則

- **框架**：Angular 21 + TypeScript strict mode
- **UI 框架**：Bootstrap 5（透過 npm 安裝）
- **架構**：純前端 SPA，不使用後端
- **語言**：繁體中文介面
- **樣式**：CSS（非 SCSS）

## 參考來源

原始系統位於 `D:\websystems\futures` (ASP.NET Core MVC)，本專案為其 Angular 重建版本。

| 原始檔案 | 說明 |
|----------|------|
| `futures\Views\Home\Index.cshtml` | UI 結構 |
| `futures\wwwroot\js\site.js` | 計算邏輯 |
| `futures\wwwroot\css\site.css` | 自訂樣式 |
| `futures\Controllers\AjaxController.cs` | TWSE 即時股價 API（已停用） |

## 開發指令

```bash
npm start       # 啟動開發伺服器 (ng serve)
npm run build   # 建置生產版本 (ng build)
```
