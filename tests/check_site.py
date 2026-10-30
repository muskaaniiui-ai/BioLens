"""Browser check of the whole site. Needs:  pip install playwright && playwright install chromium
Run:  python tests/check_site.py
For every tool and window it verifies: every clickable part has an explanation, every explanation is used,
clicking works (a cloud appears), and there are no JavaScript errors."""
import pathlib, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "index.html").as_uri()
problems, shots = [], "--shots" in sys.argv

with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 1500, "height": 900})
    logs = []
    pg.on("console", lambda m: logs.append((m.type, m.text)) if m.type in ("error", "warning") else None)
    pg.on("pageerror", lambda e: logs.append(("pageerror", str(e))))
    pg.goto(URL); pg.wait_for_timeout(600)
    tools = pg.evaluate("BL.tools.map(t=>({id:t.id,wins:t.windows.map(w=>({id:w.id,keys:Object.keys(w.f)}))}))")
    total_f = total_w = 0
    for t in tools:
        for w in t["wins"]:
            total_w += 1
            pg.goto(f"{URL}#/tool/{t['id']}/{w['id']}"); pg.wait_for_timeout(350)
            dom = pg.evaluate("[...new Set([...document.querySelectorAll('#page [data-f]')].map(e=>e.dataset.f))]")
            for k in dom:
                if k not in w["keys"]: problems.append(f"{t['id']}/{w['id']}: clickable '{k}' has NO explanation")
            for k in w["keys"]:
                if k not in dom: problems.append(f"{t['id']}/{w['id']}: explanation '{k}' is never used in the page")
            # click every numbered feature, alternating sides, and check a cloud shows up
            for k in [x for x in dom if x in w["keys"]]:
                ok = pg.evaluate("""k=>{const e=document.querySelector('#page [data-f="'+k+'"]');e.click();
                    return [...document.querySelectorAll('.bubble.show')].some(b=>b.dataset.key===k && b.querySelector('h3').textContent.length>2)}""", k)
                total_f += 1
                if not ok: problems.append(f"{t['id']}/{w['id']}: click on '{k}' did not open a cloud")
            if shots:
                pg.evaluate("document.querySelector('#page [data-f]').scrollIntoView()")
                pg.screenshot(path=f"/tmp/shots/{t['id']}_{w['id']}.png")
    for typ, txt in logs:
        if "fonts.g" in txt or "ERR_NAME_NOT_RESOLVED" in txt or "ERR_INTERNET" in txt: continue
        problems.append(f"console {typ}: {txt[:160]}")
    b.close()
print(f"checked {len(tools)} tools, {total_w} windows, {total_f} features")
print("\n".join(problems) if problems else "ALL GOOD: no missing/orphaned explanations, no errors")
sys.exit(1 if problems else 0)
