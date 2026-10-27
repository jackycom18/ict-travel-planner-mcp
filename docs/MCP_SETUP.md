# 高德 MCP 接入说明

## 准备

1. 登录高德开放平台。
2. 完成个人开发者认证。
3. 创建应用并添加 Key。
4. 服务平台选择“Web 服务”。

## 码道配置

在码道设置中打开 MCP 配置，将 `mcp_settings.example.json` 的内容写入 `mcp_settings.json`，把占位文本替换为个人 Key。

```json
{
  "mcpServers": {
    "amap-maps-streamableHTTP": {
      "url": "https://mcp.amap.com/mcp?key=YOUR_KEY",
      "type": "streamableHttp"
    }
  }
}
```

保存后等待 MCP 更新，再重新启动码道 Agent。

## 安全要求

- Key 只存在本地配置中。
- 不把 Key 写入页面脚本或公开仓库。
- 本项目的测试和截图全部使用离线演示数据。
