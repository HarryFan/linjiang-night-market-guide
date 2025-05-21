
# 通化夜市導覽平台 (Tonghua Night Market Guide)

本專案是使用 Vue 3 + Vite + TypeScript 實作的 Adaptive Web Design 平台，針對不同裝置自動切換對應版型，提供夜市導覽、美食推薦與互動功能。

## 功能特色
- 地圖導覽與美食推薦
- 收藏與分享攤位
- 手機 / 平板 / 桌機 多版型切換
- 資料來源整合台北旅遊與部落客資訊

## 技術棧
- Vue 3 + Vite + TypeScript
- Vant 4 + Element Plus
- Google Maps API 或 OSM
- Pinia, Vue Router, SCSS

## 使用方式
```bash
npm install
npm run dev
```

## 專案結構
- `/layouts`：四種裝置版型
- `/pages`：主頁、地圖、美食列表、關於
- `/composables/useDeviceLayout.ts`：自動裝置偵測 hook
