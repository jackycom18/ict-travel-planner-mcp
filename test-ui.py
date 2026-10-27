from pathlib import Path

from playwright.sync_api import sync_playwright


def main() -> None:
    """功能：验证三日行程、天气、打车、地图联动和响应式布局。输入：无。输出：无，断言失败时抛异常。"""
    external_requests: list[str] = []
    page_errors: list[str] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel="msedge", headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1000})
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.on(
            "request",
            lambda request: external_requests.append(request.url)
            if not request.url.startswith("http://127.0.0.1:8130")
            else None,
        )
        page.goto("http://127.0.0.1:8130", wait_until="domcontentloaded", timeout=30000)
        page.wait_for_timeout(500)

        assert page.title() == "金陵三日 · 智能行程规划"
        assert page.locator(".weather-card").count() == 3
        assert page.locator(".day-tab").count() == 3
        assert page.locator(".spot-card").count() == 3
        assert page.locator(".taxi-leg").count() == 2
        assert page.locator(".map-marker.active").count() == 3
        assert "中山陵" in page.locator(".spot-card").first.inner_text()

        page.locator(".day-tab").nth(1).click()
        page.wait_for_timeout(200)
        assert "5月2日" in page.locator("[data-active-date]").inner_text()
        assert "南京博物院" in page.locator(".spot-card").first.inner_text()
        assert page.locator(".map-marker.active").count() == 3

        page.locator(".spot-card").nth(1).click()
        page.wait_for_timeout(100)
        assert page.locator(".spot-card").nth(1).get_attribute("aria-pressed") == "true"
        assert page.locator(".map-marker.selected").count() == 1

        page.set_viewport_size({"width": 390, "height": 844})
        assert page.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
        assert not external_requests, "external requests: " + ", ".join(external_requests)
        assert not page_errors, "page errors: " + "; ".join(page_errors)

        screenshot_dir = Path("screenshots")
        screenshot_dir.mkdir(exist_ok=True)
        page.screenshot(path=str(screenshot_dir / "mobile.png"), full_page=True)
        page.set_viewport_size({"width": 1440, "height": 1000})
        page.locator(".map-panel").scroll_into_view_if_needed()
        page.screenshot(path=str(screenshot_dir / "desktop.png"), full_page=False)
        browser.close()


if __name__ == "__main__":
    main()
