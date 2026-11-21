/* اخترنامه — ترسیم دایرهٔ زایچه (SVG) */
(function (G) {
  'use strict';
  const KB = G.KB, E = G.AstroEngine, fa = G.Interpret.fa;
  const D2R = Math.PI / 180;
  const VS = '︎';
  const EL_COLOR = { fire: 'var(--hard)', earth: 'var(--good)', air: 'var(--brass)', water: 'var(--lapis)' };

  function drawWheel(chart, opts) {
    opts = opts || {};
    const S = 600, c = S / 2;
    const R1 = 292, R2 = 252, R3 = 244, RP = 212, RD = 182, R4 = 160, R5 = 132;
    const asc = chart.asc;
    const ang = lon => Math.PI + (lon - asc) * D2R;
    const X = (r, lon) => (c + r * Math.cos(ang(lon))).toFixed(1);
    const Y = (r, lon) => (c - r * Math.sin(ang(lon))).toFixed(1);
    const st = (stroke, w, extra) => 'style="stroke:' + stroke + ';stroke-width:' + w + ';fill:none' + (extra || '') + '"';
    let s = '<svg class="wheel" viewBox="-14 -14 ' + (S + 28) + ' ' + (S + 28) + '" role="img" aria-label="' + (opts.label || 'دایرهٔ زایچه') + '">';
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + R1 + '" style="fill:var(--surface);stroke:var(--brass);stroke-width:2.5"/>';
    // بروج
    for (let i = 0; i < 12; i++) {
      const a0 = i * 30, a1 = a0 + 30;
      const large = 0;
      const p = 'M' + X(R1, a0) + ' ' + Y(R1, a0) + ' A' + R1 + ' ' + R1 + ' 0 ' + large + ' 0 ' + X(R1, a1) + ' ' + Y(R1, a1) +
        ' L' + X(R2, a1) + ' ' + Y(R2, a1) + ' A' + R2 + ' ' + R2 + ' 0 ' + large + ' 1 ' + X(R2, a0) + ' ' + Y(R2, a0) + ' Z';
      s += '<path d="' + p + '" style="fill:' + (i % 2 ? 'var(--sunk)' : 'var(--surface)') + ';stroke:var(--line);stroke-width:1"/>';
      const sg = KB.SIGNS[i];
      s += '<text x="' + X((R1 + R2) / 2, a0 + 15) + '" y="' + Y((R1 + R2) / 2, a0 + 15) + '" text-anchor="middle" dominant-baseline="central" font-size="22" style="fill:' + EL_COLOR[sg.el] + '">' + sg.glyph + VS + '<title>' + sg.name + '</title></text>';
    }
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + R2 + '" ' + st('var(--brass)', 1.2) + '/>';
    // درجه‌ها
    let ticks = '';
    for (let d = 0; d < 360; d++) {
      const len = d % 10 === 0 ? 10 : d % 5 === 0 ? 6 : 3;
      ticks += 'M' + X(R2, d) + ' ' + Y(R2, d) + 'L' + X(R2 - len, d) + ' ' + Y(R2 - len, d);
    }
    s += '<path d="' + ticks + '" ' + st('var(--muted)', 0.6) + '/>';
    // خانه‌ها
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + R4 + '" ' + st('var(--line)', 1) + '/>';
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + R5 + '" style="fill:var(--paper);stroke:var(--line);stroke-width:1"/>';
    for (let i = 1; i <= 12; i++) {
      const L = chart.cusps[i], angular = i === 1 || i === 4 || i === 7 || i === 10;
      s += '<line x1="' + X(R3 - 8, L) + '" y1="' + Y(R3 - 8, L) + '" x2="' + X(R5, L) + '" y2="' + Y(R5, L) + '" ' + st(angular ? 'var(--lapis)' : 'var(--line)', angular ? 2 : 1) + '/>';
      const next = chart.cusps[i % 12 + 1];
      const mid = L + E.norm(next - L) / 2;
      s += '<text x="' + X((R4 + R5) / 2, mid) + '" y="' + Y((R4 + R5) / 2, mid) + '" text-anchor="middle" dominant-baseline="central" font-size="13" style="fill:var(--muted);font-family:var(--font-body)">' + fa(i) + '</text>';
    }
    // برچسب طالع و وسط‌السماء
    [['طالع', chart.asc], ['وسط', chart.mc]].forEach(([nm, L]) => {
      s += '<text x="' + X(R1 + 0, L) + '" y="' + Y(R1 + 0, L) + '" text-anchor="middle" dominant-baseline="central" font-size="12" style="fill:var(--surface);font-family:var(--font-body);paint-order:stroke;stroke:var(--lapis);stroke-width:7;stroke-linejoin:round">' + nm + '</text>';
    });
    // سیارات با پخش برای جلوگیری از هم‌پوشانی
    const keys = E.ALL.concat(['node']).filter(k => chart.planets[k]);
    const items = keys.map(k => ({ k, lon: chart.planets[k].lon, pos: chart.planets[k].lon }));
    if (chart.lots && opts.lots !== false) items.push({ k: 'fortune', lon: chart.lots.fortune, pos: chart.lots.fortune });
    items.sort((a, b) => a.lon - b.lon);
    const MIN = 7.5;
    for (let iter = 0; iter < 60; iter++) {
      let moved = false;
      for (let i = 0; i < items.length; i++) {
        const a = items[i], b = items[(i + 1) % items.length];
        const d = E.norm(b.pos - a.pos);
        if (d < MIN && items.length > 1) { const push = (MIN - d) / 2; a.pos = E.norm(a.pos - push); b.pos = E.norm(b.pos + push); moved = true; }
      }
      if (!moved) break;
    }
    // نظرات
    const pos = {}; items.forEach(it => { pos[it.k] = it.lon; });
    (chart.aspects || []).forEach(a => {
      if (KB.PLANETS[a.a].modern || KB.PLANETS[a.b].modern || a.aspect.angle === 0) return;
      const col = a.aspect.nature === 'easy' ? 'var(--turq)' : 'var(--hard)';
      const op = Math.max(0.35, 1 - a.orb / 8).toFixed(2);
      s += '<line x1="' + X(R5 - 4, pos[a.a]) + '" y1="' + Y(R5 - 4, pos[a.a]) + '" x2="' + X(R5 - 4, pos[a.b]) + '" y2="' + Y(R5 - 4, pos[a.b]) + '" style="stroke:' + col + ';stroke-width:1.3;opacity:' + op + (a.applying ? '' : ';stroke-dasharray:4 3') + '"/>';
    });
    items.forEach(it => {
      const isLot = it.k === 'fortune';
      const pl = isLot ? null : chart.planets[it.k];
      const P = isLot ? { glyph: '⊗', name: 'سهم‌السعاده' } : KB.PLANETS[it.k];
      const modern = P.modern || it.k === 'node';
      s += '<line x1="' + X(R3, it.lon) + '" y1="' + Y(R3, it.lon) + '" x2="' + X(R3 - 9, it.lon) + '" y2="' + Y(R3 - 9, it.lon) + '" ' + st('var(--ink)', 1.4) + '/>';
      if (E.sep(it.pos, it.lon) > 1) s += '<line x1="' + X(R3 - 9, it.lon) + '" y1="' + Y(R3 - 9, it.lon) + '" x2="' + X(RP + 14, it.pos) + '" y2="' + Y(RP + 14, it.pos) + '" ' + st('var(--line)', 0.8) + '/>';
      const col = isLot ? 'var(--brass)' : modern ? 'var(--muted)' : 'var(--ink)';
      const deg = Math.floor(it.lon % 30);
      s += '<g><title>' + P.name + ' ' + G.Interpret.fmtLon(it.lon) + (pl && pl.retro ? ' (راجع)' : '') + '</title>';
      s += '<text x="' + X(RP, it.pos) + '" y="' + Y(RP, it.pos) + '" text-anchor="middle" dominant-baseline="central" font-size="' + (modern || isLot ? 18 : 23) + '" style="fill:' + col + '">' + P.glyph + VS + '</text>';
      s += '<text x="' + X(RD, it.pos) + '" y="' + Y(RD, it.pos) + '" text-anchor="middle" dominant-baseline="central" font-size="11" style="fill:var(--muted);font-family:var(--font-body)">' + fa(deg) + '°' + (pl && pl.retro ? '℞' : '') + '</text></g>';
    });
    s += '</svg>';
    return s;
  }
  G.Wheel = { drawWheel };
})(typeof window !== 'undefined' ? window : globalThis);
