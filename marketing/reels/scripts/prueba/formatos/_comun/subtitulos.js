/* Subtítulos premium por palabra (skill `subtitulos-premium`), sacados de marketing/reels/scripts/reel/plantilla/index.html.
   API en _comun/README.md. Sin dependencias además de gsap. */
(function () {
  var ADELANTO = 2 / 30;
  var CLAVE = /\d|[$%€]/;

  var REPOSO = {
    claro: function (tinta) {
      return { color: tinta || "#141210", WebkitTextStrokeColor: "rgba(0,0,0,0)", textShadow: "0 0 2px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.8), 0 0 38px rgba(255,255,255,0.55)" };
    },
    oscuro: function (tinta) {
      return { color: tinta || "#ffffff", WebkitTextStrokeColor: "rgba(6,6,8,0.6)", textShadow: "0 2px 4px rgba(0,0,0,0.55), 0 0 20px rgba(0,0,0,0.45), 0 8px 34px rgba(0,0,0,0.38)" };
    },
  };

  // El resaltador tarda 0,12 s en llegar: el trazo de la palabra activa tiene que seguir separándola del fondo mientras viaja.
  function activa(tono, res) {
    var oscura = res.tinta !== "#ffffff";
    var trazo = tono === "claro" ? "rgba(0,0,0,0)" : oscura ? res.fondo : "rgba(6,6,8,0.6)";
    return { color: res.tinta, WebkitTextStrokeColor: trazo, textShadow: "0 1px 2px rgba(0,0,0,0.18), 0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0)" };
  }

  function lineasDe(spans) {
    var tops = [];
    spans.forEach(function (s) {
      var t = Math.round(s.offsetTop);
      if (tops.every(function (x) { return Math.abs(x - t) > 8; })) tops.push(t);
    });
    return tops.length;
  }

  var ESTILO = document.createElement("style");
  ESTILO.textContent = [
    ".sub-grupo { position: absolute; display: flex; justify-content: center; opacity: 0; pointer-events: none; }",
    ".sub-grupo.izq { justify-content: flex-start; }",
    ".sub-linea { position: relative; padding: 6px 4px 10px; text-wrap: balance; text-align: center; font-family: 'Geist', sans-serif; font-weight: 800; line-height: 1.1; letter-spacing: -0.012em; word-spacing: 0.08em; }",
    ".sub-grupo.izq .sub-linea { text-align: left; }",
    ".sub-grupo.hook .sub-linea { line-height: 1.04; letter-spacing: -0.02em; }",
    ".sub-linea span { position: relative; z-index: 1; display: inline-block; -webkit-text-stroke: 4px rgba(6,6,8,0.6); paint-order: stroke fill; }",
    ".sub-linea span.clave { font-size: 1.12em; }",
    ".sub-resalte { position: absolute; left: 0; top: 0; width: 10px; height: 10px; border-radius: 16px; opacity: 0; box-shadow: 0 8px 22px rgba(0,0,0,0.34), 0 2px 5px rgba(0,0,0,0.28); }",
    ".sub-grupo.claro .sub-resalte { box-shadow: 0 6px 16px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.16); }",
  ].join("\n");
  document.head.appendChild(ESTILO);

  function fuentes() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    // fonts.ready no espera a una fuente que todavía nada usa: sin cargarlas antes, el resaltador y el conteo de líneas se miden con la de reemplazo.
    return Promise.all([
      document.fonts.load('400 72px "Geist"'),
      document.fonts.load('600 72px "Geist"'),
      document.fonts.load('800 72px "Geist"'),
      document.fonts.load('400 36px "Geist"'),
      document.fonts.load('500 36px "Geist"'),
      document.fonts.load('600 36px "Geist"'),
      document.fonts.load('500 36px "Geist Mono"'),
    ]).then(function () { return document.fonts.ready; }).catch(function () {});
  }

  function montar(tl, op) {
    var contenedor = op.contenedor;
    var tono = op.tono === "claro" ? "claro" : "oscuro";
    var res = op.resalte || (tono === "claro" ? { fondo: "#141210", tinta: "#ffffff" } : { fondo: "#f5f3ee", tinta: "#0c0c0e" });
    var reposo = REPOSO[tono](op.tinta);
    var act = activa(tono, res);
    var montados = [];

    (op.grupos || []).forEach(function (g, n) {
      var el = document.createElement("div");
      el.className = "sub-grupo " + tono + (g.hook ? " hook" : "") + (g.alinear === "izq" ? " izq" : "");
      el.id = (op.prefijo || "sub") + "-" + n;
      var izq = g.izquierda != null ? g.izquierda : 70;
      var ancho = g.ancho != null ? g.ancho : 860;
      el.style.left = izq + "px";
      el.style.top = (g.arriba != null ? g.arriba : 1240) + "px";
      el.style.width = ancho + "px";
      var linea = document.createElement("div");
      linea.className = "sub-linea";
      linea.style.maxWidth = ancho + "px";
      el.appendChild(linea);
      var resalte = document.createElement("i");
      resalte.className = "sub-resalte";
      resalte.style.background = res.fondo;
      linea.appendChild(resalte);
      contenedor.appendChild(el);

      var spans = g.palabras.map(function (p, i) {
        if (i > 0) linea.appendChild(document.createTextNode(" "));
        var s = document.createElement("span");
        s.textContent = p.texto;
        if (CLAVE.test(p.texto)) s.className = "clave";
        gsap.set(s, reposo);
        linea.appendChild(s);
        return s;
      });

      // Nunca 3 líneas: se achica hasta que entre en 2.
      var tam = g.tam || (g.hook ? 92 : 72);
      var piso = g.piso || Math.round(tam * (g.hook ? 0.65 : 0.75));
      linea.style.fontSize = tam + "px";
      while (lineasDe(spans) > 2 && tam > piso) { tam -= 4; linea.style.fontSize = tam + "px"; }
      // Sin la fuente real tampoco hay que dejar una tercera línea: se achica el ancho de palabra.
      while (lineasDe(spans) > 2 && tam > 30) { tam -= 4; linea.style.fontSize = tam + "px"; }

      if (g.inicio <= 0) tl.set(el, { opacity: 1 }, 0);
      else tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "power1.out" }, g.inicio);
      if (g.salida !== "ninguna") {
        if (g.hook && g.fin > g.inicio + 0.3) {
          tl.to(el, { opacity: 0, scale: 0.86, y: 28, filter: "blur(6px)", duration: 0.18, ease: "power2.in" }, g.fin - 0.18);
        } else {
          tl.to(el, { opacity: 0, y: -10, duration: 0.12, ease: "power2.in" }, Math.max(g.inicio + 0.2, g.fin - 0.12));
        }
        tl.set(el, { opacity: 0, visibility: "hidden" }, g.fin);
      }

      if (!g.hook) {
        g.palabras.forEach(function (p, k) {
          var t = Math.max(g.inicio, p.inicio - ADELANTO);
          tl.fromTo(spans[k], { opacity: 0, y: 26, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.24, ease: "power3.out" }, t);
          tl.fromTo(spans[k], { scale: 0.8 }, { scale: 1, duration: 0.34, ease: "back.out(2.2)" }, t);
        });
      }

      var previa = null;
      if (g.resaltar !== false) g.palabras.forEach(function (p, k) {
        var s = spans[k];
        var t = Math.max(g.inicio, p.inicio - ADELANTO / 2);
        var h = s.offsetHeight;
        var caja = { x: s.offsetLeft - 12, y: s.offsetTop + h * 0.1, width: s.offsetWidth + 24, height: h * 0.84 };
        var anterior = previa === null ? null : g.palabras[previa];
        var salta = previa === null || Math.abs(spans[previa].offsetTop - s.offsetTop) > 8 || p.inicio - anterior.fin > 0.6;
        if (salta && g.hook && t <= 0.05) {
          // El cuadro 0 es la portada: la palabra activa ya tiene su resaltador puesto (si no, se ve hueca).
          tl.set(resalte, Object.assign({ opacity: 1, scale: 1 }, caja), 0);
        } else if (salta) {
          tl.set(resalte, caja, t);
          tl.fromTo(resalte, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, t);
        } else {
          tl.to(resalte, Object.assign({ duration: 0.12, ease: "power3.out" }, caja), t);
        }
        // La que se deja vuelve a su tinta apenas sale el resaltador y la nueva toma la suya cuando ya la cubre a medias: así ninguna queda en la tinta del resaltador fuera de él.
        if (previa !== null) tl.set(spans[previa], reposo, t);
        tl.set(s, act, salta ? t : t + 0.06);
        previa = k;
      });

      montados.push({ el: el, linea: linea, spans: spans, resalte: resalte, grupo: g, tam: tam });
    });
    return montados;
  }

  window.Subtitulos = { fuentes: fuentes, montar: montar, ADELANTO: ADELANTO };
})();
