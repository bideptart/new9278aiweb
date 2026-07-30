<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex, follow"/>
        <title>9278.ai — XML Sitemap</title>
        <style>
          :root {
            --primary:#E31B23;
            --primary-dark:#D90416;
            --primary-light:#FF2D3A;
            --text:#1A1A1A;
            --text-secondary:#6B7280;
            --background:#FFFFFF;
            --surface:#FAF7F6;
            --border:#E5E7EB;
            --grid:#EAE5E2;
            --primary-tint:rgba(227,27,35,0.07);
            --primary-edge:rgba(227,27,35,0.22);
          }
          * { box-sizing:border-box; margin:0; padding:0; }
          html { -webkit-text-size-adjust:100%; }
          body {
            background:var(--surface);
            color:var(--text);
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
            font-size:14px;
            line-height:1.6;
            -webkit-font-smoothing:antialiased;
          }
          .wrap { max-width:1080px; margin:0 auto; padding:44px 24px 72px; }

          /* Header */
          header { margin-bottom:28px; }
          .brand { font-size:30px; font-weight:800; letter-spacing:-0.02em; line-height:1.2; margin-bottom:14px; }
          .brand .name { color:var(--text); }
          .brand .tld  { color:var(--primary); }
          h1 { font-size:22px; font-weight:700; letter-spacing:-0.01em; margin:0 0 6px; }
          .sub { color:var(--text-secondary); font-size:14px; margin:0; }
          .sub strong { color:var(--text); font-weight:700; }

          /* Card + Table */
          .card {
            margin-top:24px;
            background:var(--background);
            border:1px solid var(--border);
            border-radius:14px;
            overflow:hidden;
            box-shadow:0 1px 4px rgba(26,26,26,0.05);
          }
          table { width:100%; border-collapse:collapse; font-size:13.5px; }
          thead th {
            text-align:left;
            background:var(--surface);
            border-bottom:1px solid var(--border);
            color:var(--text-secondary);
            font-weight:600;
            text-transform:uppercase;
            letter-spacing:0.055em;
            font-size:11px;
            padding:13px 16px;
            white-space:nowrap;
          }
          .th-num { width:52px; padding-left:22px !important; }
          .th-pri  { width:100px; }
          .th-freq { width:140px; }
          .th-mod  { width:150px; }

          tbody td { padding:12px 16px; border-top:1px solid var(--grid); vertical-align:middle; }
          tbody tr:hover { background:var(--surface); }

          .td-num {
            padding-left:22px !important;
            color:var(--text-secondary);
            font-variant-numeric:tabular-nums;
            width:52px;
            text-align:right;
          }
          .td-url a {
            color:var(--primary);
            text-decoration:none;
            font-weight:500;
            word-break:break-all;
          }
          .td-url a:hover { color:var(--primary-dark); text-decoration:underline; }
          .td-pri {
            color:var(--text);
            font-weight:700;
            font-variant-numeric:tabular-nums;
          }
          .pill {
            display:inline-block;
            padding:2px 11px;
            border-radius:999px;
            font-size:12px;
            background:var(--primary-tint);
            color:var(--primary);
            border:1px solid var(--primary-edge);
            text-transform:capitalize;
            white-space:nowrap;
            line-height:1.5;
          }
          .td-mod { color:var(--text-secondary); white-space:nowrap; font-variant-numeric:tabular-nums; }

          /* Footer */
          .foot { margin-top:20px; font-size:13px; color:var(--text-secondary); }
          .foot a { color:var(--primary); text-decoration:none; }
          .foot a:hover { color:var(--primary-dark); text-decoration:underline; }

          /* Responsive */
          @media (max-width:640px) {
            .hide-sm { display:none; }
            h1 { font-size:19px; }
            .brand { font-size:25px; }
            .wrap { padding:30px 15px 52px; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <div class="brand">
              <span class="name">9278</span><span class="tld">.ai</span>
            </div>
            <h1>XML Sitemap</h1>
            <p class="sub">
              A machine-readable sitemap for search engines, listing&#160;
              <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong>&#160;pages on 9278.ai.
            </p>
          </header>

          <div class="card">
            <table>
              <thead>
                <tr>
                  <th class="th-num">#</th>
                  <th>URL</th>
                  <th class="th-pri hide-sm">Priority</th>
                  <th class="th-freq hide-sm">Frequency</th>
                  <th class="th-mod hide-sm">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="s:urlset/s:url">
                  <tr>
                    <td class="td-num"><xsl:value-of select="position()"/></td>
                    <td class="td-url">
                      <a href="{s:loc}" target="_blank" rel="noopener noreferrer">
                        <xsl:value-of select="s:loc"/>
                      </a>
                    </td>
                    <td class="td-pri hide-sm"><xsl:value-of select="s:priority"/></td>
                    <td class="hide-sm"><span class="pill"><xsl:value-of select="s:changefreq"/></span></td>
                    <td class="td-mod hide-sm"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <p class="foot">
            Generated per the <a href="https://www.sitemaps.org/protocol.html" target="_blank" rel="noopener">sitemaps.org protocol</a>.
            This file is intended for search engines.
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
