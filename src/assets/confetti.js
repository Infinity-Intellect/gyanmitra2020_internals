/**
 * Minified by jsDelivr using UglifyJS v3.3.21.
 * Original file: /npm/canvas-confetti@0.0.3/dist/confetti.browser.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function(m) {
  var f = {};
  !(function() {
    var M,
      u =
        m.requestAnimationFrame ||
        m.webkitRequestAnimationFrame ||
        m.mozRequestAnimationFrame ||
        m.oRequestAnimationFrame ||
        m.msRequestAnimationFrame ||
        function(t) {
          m.setTimeout(t, 1e3 / 60);
        },
      r = {
        particleCount: 50,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        ticks: 200,
        x: 0.5,
        y: 0.5,
        zIndex: 100,
        colors: [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff"
        ]
      };
    function d() {}
    function p(t, e, o) {
      return (n = t && null != t[e] ? t[e] : r[e]), (i = o) ? i(n) : n;
      var n, i;
    }
    function l(t) {
      return parseInt(t, 16);
    }
    function x(t) {
      (t.width = document.documentElement.clientWidth),
        (t.height = document.documentElement.clientHeight);
    }
    function v(t) {
      var e,
        o,
        n = t.angle * (Math.PI / 180),
        i = t.spread * (Math.PI / 180);
      return {
        x: t.x,
        y: t.y,
        wobble: 10 * Math.random(),
        velocity: 0.5 * t.startVelocity + Math.random() * t.startVelocity,
        angle2D: -n + (0.5 * i - Math.random() * i),
        tiltAngle: Math.random() * Math.PI,
        color:
          ((e = t.color),
          (o = String(e).replace(/[^0-9a-f]/gi, "")),
          o.length < 6 && (o = o[0] + o[0] + o[1] + o[1] + o[2] + o[2]),
          {
            r: l(o.substring(0, 2)),
            g: l(o.substring(2, 4)),
            b: l(o.substring(4, 6))
          }),
        tick: 0,
        totalTicks: t.ticks,
        decay: t.decay,
        random: Math.random() + 5,
        tiltSin: 0,
        tiltCos: 0,
        wobbleX: 0,
        wobbleY: 0
      };
    }
    function w(o, t, n) {
      var i = t.slice(),
        r = o.getContext("2d"),
        l = o.width,
        a = o.height;
      function c() {
        l = a = null;
      }
      var e,
        s =
          ((e = function(e) {
            u(function t() {
              l || a || (x(o), (l = o.width), (a = o.height)),
                r.clearRect(0, 0, l, a),
                (i = i.filter(function(t) {
                  return (function(t, e) {
                    (e.x += Math.cos(e.angle2D) * e.velocity),
                      (e.y += Math.sin(e.angle2D) * e.velocity + 3),
                      (e.wobble += 0.1),
                      (e.velocity *= e.decay),
                      (e.tiltAngle += 0.1),
                      (e.tiltSin = Math.sin(e.tiltAngle)),
                      (e.tiltCos = Math.cos(e.tiltAngle)),
                      (e.random = Math.random() + 5),
                      (e.wobbleX = e.x + 10 * Math.cos(e.wobble)),
                      (e.wobbleY = e.y + 10 * Math.sin(e.wobble));
                    var o = e.tick++ / e.totalTicks,
                      n = e.x + e.random * e.tiltCos,
                      i = e.y + e.random * e.tiltSin,
                      r = e.wobbleX + e.random * e.tiltCos,
                      l = e.wobbleY + e.random * e.tiltSin;
                    return (
                      (t.fillStyle =
                        "rgba(" +
                        e.color.r +
                        ", " +
                        e.color.g +
                        ", " +
                        e.color.b +
                        ", " +
                        (1 - o) +
                        ")"),
                      t.beginPath(),
                      t.moveTo(Math.floor(e.x), Math.floor(e.y)),
                      t.lineTo(Math.floor(e.wobbleX), Math.floor(i)),
                      t.lineTo(Math.floor(r), Math.floor(l)),
                      t.lineTo(Math.floor(n), Math.floor(e.wobbleY)),
                      t.closePath(),
                      t.fill(),
                      e.tick < e.totalTicks
                    );
                  })(r, t);
                })).length
                  ? u(t)
                  : (m.removeEventListener("resize", c), n(), e());
            });
          }),
          f.exports.Promise ? new f.exports.Promise(e) : (e(d, d), null));
      return (
        m.addEventListener("resize", c, !1),
        {
          addFettis: function(t) {
            return (i = i.concat(t)), s;
          },
          canvas: o,
          promise: s
        }
      );
    }
    (f.exports = function(t) {
      for (
        var e,
          o,
          n,
          i = p(t, "particleCount", Math.floor),
          r = p(t, "angle", Number),
          l = p(t, "spread", Number),
          a = p(t, "startVelocity", Number),
          c = p(t, "decay", Number),
          s = p(t, "colors"),
          u = p(t, "ticks", Number),
          d = p(t, "zIndex", Number),
          m =
            (((e = p(t, "origin", Object)).x = p(e, "x", Number)),
            (e.y = p(e, "y", Number)),
            e),
          f = i,
          h = [],
          b = M
            ? M.canvas
            : ((o = d),
              x((n = document.createElement("canvas"))),
              (n.style.position = "fixed"),
              (n.style.top = "0px"),
              (n.style.left = "0px"),
              (n.style.pointerEvents = "none"),
              (n.style.zIndex = o),
              n),
          y = b.width * m.x,
          g = b.height * m.y;
        f--;

      )
        h.push(
          v({
            x: y,
            y: g,
            angle: r,
            spread: l,
            startVelocity: a,
            color: s[f % s.length],
            ticks: u,
            decay: c
          })
        );
      return M
        ? M.addFettis(h)
        : (document.body.appendChild(b),
          (M = w(b, h, function() {
            (M = null), document.body.removeChild(b);
          })).promise);
    }),
      (f.exports.Promise = m.Promise || null);
  })(),
    (m.confetti = f.exports);
})(window);
//# sourceMappingURL=/sm/0a8d62b60f6246400536f80bd03f9a3321bd3a4e3850786fe5a3d70ab2b6e827.map
