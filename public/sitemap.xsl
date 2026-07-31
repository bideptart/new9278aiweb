<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap &#8212; 9278.ai</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex, follow"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=Instrument+Serif:ital@0;1&amp;family=Geist+Mono:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Inter', system-ui, sans-serif;
            background: #ffffff;
            color: #171717;
            font-size: 16px;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }

          .wrapper {
            max-width: 1100px;
            margin: 0 auto;
            padding: 48px 32px 64px;
          }

          /* ── Logo (matches 9278.ai wordmark colors) ── */
          .logo {
            display: inline-flex;
            align-items: baseline;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 30px;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin-bottom: 32px;
          }
          .logo .n1 { color: #e40014; }
          .logo .n2 { color: #171717; }
          .logo .n3 { color: #e40014; }
          .logo .n4 { color: #171717; }
          .logo .tld { color: #737373; font-size: 15px; font-weight: 600; margin-left: 2px; }

          /* ── Title &amp; Subtitle ── */
          h1 {
            font-family: 'Instrument Serif', Georgia, serif;
            font-weight: 400;
            font-size: 40px;
            letter-spacing: -0.5px;
            color: #171717;
            margin-bottom: 10px;
          }
          .subtitle {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 15px;
            color: #737373;
            margin-bottom: 32px;
          }
          .subtitle strong {
            color: #171717;
            font-weight: 700;
          }

          /* ── Table ── */
          .table-wrap {
            overflow-x: auto;
            border-radius: 16px;
            border: 1px solid #e5e5e5;
            box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 14px;
          }

          thead th {
            background: #f5f5f5;
            padding: 14px 20px;
            font-family: 'Inter', system-ui, sans-serif;
            font-weight: 600;
            color: #737373;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
            text-align: left;
            border-bottom: 1px solid #e5e5e5;
          }
          thead th.center { text-align: center; }
          thead th.num { text-align: center; width: 48px; }

          tbody tr { transition: background .12s; }
          tbody tr:hover { background: #f5f5f5; }
          tbody td {
            padding: 13px 20px;
            border-bottom: 1px solid #e5e5e5;
            vertical-align: middle;
            color: #171717;
          }
          tbody tr:last-child td { border-bottom: none; }
          tbody td.num {
            text-align: center;
            color: #737373;
            font-family: 'Geist Mono', ui-monospace, monospace;
            font-weight: 500;
            font-size: 13px;
          }
          tbody td.center {
            text-align: center;
            font-family: 'Geist Mono', ui-monospace, monospace;
            font-weight: 600;
            color: #171717;
          }

          /* ── URL links ── */
          tbody td a {
            font-family: 'Geist Mono', ui-monospace, monospace;
            font-size: 13px;
            color: #171717;
            text-decoration: none;
            font-weight: 400;
            word-break: break-all;
          }
          tbody td a:hover { color: #e40014; text-decoration: underline; }

          /* ── Frequency badge (matches 9278.ai pill/eyebrow style) ── */
          .freq-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-family: 'Geist Mono', ui-monospace, monospace;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            padding: 4px 12px;
            border-radius: 999px;
            background: rgba(228,0,20,.06);
            color: #e40014;
            border: 1px solid rgba(228,0,20,.18);
          }

          /* ── Last modified ── */
          .lastmod {
            color: #737373;
            font-family: 'Geist Mono', ui-monospace, monospace;
            font-size: 12px;
            white-space: nowrap;
          }

          /* ── Responsive ── */
          @media (max-width: 768px) {
            .wrapper { padding: 28px 16px 40px; }
            .logo { font-size: 26px; }
            h1 { font-size: 30px; }
            thead th, tbody td { padding: 10px 12px; }
          }
        </style>
      </head>

      <body>
        <div class="wrapper">

          <!-- Logo -->
          <div class="logo">
            <span class="n1">9</span><span class="n2">2</span><span class="n3">7</span><span class="n4">8</span><span class="tld">.ai</span>
          </div>

          <!-- Title -->
          <h1>XML Sitemap</h1>

          <!-- Subtitle -->
          <p class="subtitle">
            A machine-readable sitemap for search engines, listing
            <xsl:choose>
              <xsl:when test="sitemap:sitemapindex">
                <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></strong> sitemaps
              </xsl:when>
              <xsl:otherwise>
                <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> pages
              </xsl:otherwise>
            </xsl:choose>
            on 9278.ai.
          </p>

          <!-- Table -->
          <xsl:apply-templates/>

        </div>
      </body>
    </html>
  </xsl:template>

  <!-- ── Sitemap Index ── -->
  <xsl:template match="sitemap:sitemapindex">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th class="num">#</th>
            <th>URL</th>
            <th class="center">LAST MODIFIED</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:sitemap">
            <xsl:variable name="loc"><xsl:value-of select="sitemap:loc"/></xsl:variable>
            <tr>
              <td class="num"><xsl:value-of select="position()"/></td>
              <td><a href="{$loc}"><xsl:value-of select="sitemap:loc"/></a></td>
              <xsl:choose>
                <xsl:when test="sitemap:lastmod">
                  <td class="center lastmod"><xsl:value-of select="substring(sitemap:lastmod,1,10)"/></td>
                </xsl:when>
                <xsl:otherwise><td class="center lastmod">&#8212;</td></xsl:otherwise>
              </xsl:choose>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <!-- ── URL Set ── -->
  <xsl:template match="sitemap:urlset">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th class="num">#</th>
            <th>URL</th>
            <xsl:if test="sitemap:url/sitemap:priority">
              <th class="center">PRIORITY</th>
            </xsl:if>
            <xsl:if test="sitemap:url/sitemap:changefreq">
              <th class="center">FREQUENCY</th>
            </xsl:if>
            <xsl:if test="sitemap:url/sitemap:lastmod">
              <th class="center">LAST MODIFIED</th>
            </xsl:if>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:url">
            <xsl:variable name="loc"><xsl:value-of select="sitemap:loc"/></xsl:variable>
            <tr>
              <td class="num"><xsl:value-of select="position()"/></td>
              <td>
                <a href="{$loc}"><xsl:value-of select="sitemap:loc"/></a>
              </td>
              <xsl:if test="../sitemap:url/sitemap:priority">
                <xsl:choose>
                  <xsl:when test="sitemap:priority">
                    <td class="center"><xsl:value-of select="sitemap:priority"/></td>
                  </xsl:when>
                  <xsl:otherwise><td class="center">&#8212;</td></xsl:otherwise>
                </xsl:choose>
              </xsl:if>
              <xsl:if test="../sitemap:url/sitemap:changefreq">
                <xsl:choose>
                  <xsl:when test="sitemap:changefreq">
                    <td class="center"><span class="freq-badge"><xsl:value-of select="sitemap:changefreq"/></span></td>
                  </xsl:when>
                  <xsl:otherwise><td class="center">&#8212;</td></xsl:otherwise>
                </xsl:choose>
              </xsl:if>
              <xsl:if test="../sitemap:url/sitemap:lastmod">
                <xsl:choose>
                  <xsl:when test="sitemap:lastmod">
                    <td class="center lastmod"><xsl:value-of select="substring(sitemap:lastmod,1,10)"/></td>
                  </xsl:when>
                  <xsl:otherwise><td class="center lastmod">&#8212;</td></xsl:otherwise>
                </xsl:choose>
              </xsl:if>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <!-- ── Suppress raw text nodes ── -->
  <xsl:template match="sitemap:loc|sitemap:lastmod|sitemap:changefreq|sitemap:priority|image:loc|image:caption|video:*"/>

</xsl:stylesheet>
