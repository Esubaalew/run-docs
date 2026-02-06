from __future__ import annotations

from datetime import datetime, timezone
import gzip
from pathlib import Path
import re
from xml.etree import ElementTree as ET

_PAGES = []


def on_post_page(output, page, config):
    _PAGES.append(page)
    return output


def _extract_date(value):
    if not value:
        return None
    text = re.sub(r"<[^>]+>", "", str(value))
    match = re.search(r"\\d{4}-\\d{2}-\\d{2}", text)
    if match:
        return match.group(0)
    return None


def _date_from_file(path: Path) -> str:
    timestamp = path.stat().st_mtime
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).date().isoformat()


def _canonical_url(site_url: str, page) -> str:
    if page.canonical_url:
        return page.canonical_url
    if page.url:
        return f"{site_url}/{page.url}"
    return f"{site_url}/"


def on_post_build(config):
    site_url = (config.get("site_url") or "").rstrip("/")
    if not site_url:
        return

    site_dir = Path(config["site_dir"])
    url_entries = []
    seen = set()

    for page in _PAGES:
        loc = _canonical_url(site_url, page)
        if not loc.startswith(site_url):
            loc = f"{site_url}/{loc.lstrip('/')}"

        lastmod = _extract_date(page.meta.get("git_revision_date_localized"))
        if not lastmod:
            lastmod = _extract_date(page.meta.get("git_creation_date_localized"))
        if not lastmod:
            try:
                src_path = Path(page.file.abs_src_path)
                if src_path.exists():
                    lastmod = _date_from_file(src_path)
            except Exception:
                lastmod = None

        if not lastmod:
            lastmod = datetime.now(timezone.utc).date().isoformat()

        if loc in seen:
            continue
        seen.add(loc)
        url_entries.append((loc, lastmod))

    url_entries.sort(key=lambda entry: entry[0])

    urlset = ET.Element("urlset", {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"})
    for loc, lastmod in url_entries:
        url = ET.SubElement(urlset, "url")
        ET.SubElement(url, "loc").text = loc
        ET.SubElement(url, "lastmod").text = lastmod

    try:
        ET.indent(urlset, space="  ")
    except AttributeError:
        pass

    xml_bytes = ET.tostring(urlset, encoding="utf-8", xml_declaration=True)
    sitemap_path = site_dir / "sitemap.xml"
    sitemap_path.write_bytes(xml_bytes)

    gzip_path = site_dir / "sitemap.xml.gz"
    with gzip.open(gzip_path, "wb") as handle:
        handle.write(xml_bytes)
