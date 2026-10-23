/* CalcularYa: ajusta el alto de las calculadoras embebidas (<iframe src=".../embed/...">) a su
   contenido. Es opcional: sin este script el iframe queda con el alto fijo que trae el código. */
(function () {
  "use strict";
  // Los nombres de los mensajes y los topes están repetidos de src/motor/embed/mensajes.ts: este
  // archivo no pasa por el bundler, así que si cambian allá hay que cambiarlos acá.
  var ALTO = "calcularya:alto";
  var PEDIR = "calcularya:pedir-alto";
  var LISTO = "calcularya:listo";
  var MIN = 80;
  var MAX = 12000;

  var script = document.currentScript || document.querySelector('script[src*="/embed.js"]');
  var origen;
  try {
    origen = new URL(script.src).origin;
  } catch (e) {
    return;
  }

  // Solo se le hace caso a un mensaje que viene del origen de este script Y de uno de los iframes de
  // esta página: así otra ventana, otro sitio o un iframe ajeno no pueden tocar el alto de nada.
  window.addEventListener("message", function (ev) {
    if (ev.origin !== origen) return;
    var d = ev.data;
    if (!d || d.tipo !== ALTO || typeof d.alto !== "number" || !isFinite(d.alto)) return;
    var marcos = document.getElementsByTagName("iframe");
    for (var i = 0; i < marcos.length; i++) {
      if (marcos[i].contentWindow === ev.source) {
        marcos[i].style.height = Math.min(MAX, Math.max(MIN, Math.ceil(d.alto))) + "px";
        // Le avisa al iframe que alguien va a ajustarlo, para que oculte su barra de scroll.
        ev.source.postMessage({ tipo: LISTO }, origen);
        return;
      }
    }
  });

  // El iframe puede haber cargado antes que este script (es async): se le pide el alto de nuevo.
  function pedir() {
    var marcos = document.getElementsByTagName("iframe");
    for (var i = 0; i < marcos.length; i++) {
      var m = marcos[i];
      try {
        if (m.src && new URL(m.src, location.href).origin === origen && m.contentWindow) m.contentWindow.postMessage({ tipo: PEDIR }, origen);
      } catch (e) {}
    }
  }
  pedir();
  window.addEventListener("load", pedir);
})();
