# 代码地图

> 最后更新：2026-10-27

## 总体结构

```text
travel-planner-mcp/
├─ index.html                 # 页面结构、SVG 地图和内容容器
├─ styles.css                 # 视觉系统与响应式布局
├─ app.js                     # 行程数据、日期切换和地图联动
├─ test-ui.py                 # 浏览器验收
├─ mcp_settings.example.json  # 高德 MCP 配置样例
├─ screenshots/               # 桌面和手机截图
└─ docs/                      # MCP 配置和交接文档
```

## 逐文件核心内容

### `app.js`

- 用途：保存三天行程数据并渲染天气、景点、打车段和地图节点。
- 关键函数：`makeArt`、`renderWeather`、`renderDayTabs`、`renderItinerary`、`renderMap`、`setSpot`、`setDay`。
- 数据流：行程数组 → 当日卡片 → SVG 路线和标记。
- 注意：景点与地图共用同一份坐标和 ID。

### `index.html`

- 用途：页面骨架、SVG 地图底盘和所有静态区域。
- 注意：没有外部脚本、字体、图片或 CDN。

### `styles.css`

- 用途：金陵手账视觉、路线地图、景点卡和移动端适配。
- 注意：地图与插画颜色由 CSS 变量控制。
