
# 通化夜市導覽平台 - 產品需求文件 (PRD)

## 一、產品目標
建置一個具備 Adaptive Web Design (AWD) 的 Vue3 導覽平台，提供使用者依裝置獲得最佳體驗。

## 二、主要功能
- 地圖導覽：展示通化夜市的攤位分布
- 美食推薦：介紹必吃攤位、攤位資料
- 即時資訊：營業時間、交通路線
- 收藏分享：使用者可收藏攤位與分享

## 三、使用者角色
- 夜市遊客：查詢美食與地圖導航
- 當地居民：分享與收藏夜市資訊
- 後台管理者（未來擴充）

## 四、裝置佈局策略
- Mobile (<768px)：MobileLayout，底部導航、單欄資訊
- Tablet (768~1023px)：TabletLayout，雙欄
- Desktop (1024~1439px)：DesktopLayout，完整功能
- Large (≥1440px)：LargeLayout，多視窗多圖表展示

## 五、技術選型
- 前端框架：Vue 3 + Vite + TypeScript
- UI 框架：Vant 4（Mobile）、Element Plus（Desktop）
- 地圖：Google Maps API 或 OpenStreetMap API
- 狀態管理：Pinia
- 樣式：SCSS + PostCSS

## 六、資料來源
- 官方地圖與交通資料：台北旅遊網、Google Maps
- 美食資訊：部落格懶人包整理
