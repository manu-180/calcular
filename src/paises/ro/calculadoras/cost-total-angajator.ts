import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { fluturas, leuSus } from "../lib/fiscal";
import { parametriSalariu, REQ_SALARIU } from "../lib/parametri";

export default definirCalculadora({
  id: "ro.cost-total-angajator",
  mercado: "ro",
  concepto: "costo-empleador",
  slug: "cost-total-angajator",
  estado: "publicado",
  requiere: { ...REQ_SALARIU, "ro.cam": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salariul brut lunar", min: 0, porDefecto: 6000 },
    { id: "angajati", tipo: "entero", etiqueta: "Număr de angajați cu acest salariu", min: 1, max: 1000, porDefecto: 1 },
    { id: "minim", tipo: "si-no", etiqueta: "Salariul de bază este egal cu salariul minim", porDefecto: false },
  ],
  calcular(e, v) {
    if (e.brut <= 0) throw new ErrorEntrada("Introduceți un salariu brut mai mare decât zero.", "brut");
    const p = parametriSalariu(v);
    const f = fluturas(e.brut, { persoane: 0, sub26: false, copiiScoala: 0, laSalariulMinim: e.minim }, p);
    const cam = leuSus(((e.brut - f.sumaNeimpozabila) * v["ro.cam"]) / 100);
    const cost = e.brut + cam;
    const n = Math.max(1, Math.floor(e.angajati));
    return {
      cost,
      cam,
      net: f.net,
      contributiiAngajat: f.cas + f.cass + f.impozit,
      costLunarTotal: Number((cost * n).toFixed(2)),
      costAnual: Number((cost * n * 12).toFixed(2)),
      observaciones: ["Netul este calculat pentru un angajat fără persoane în întreținere și fără alte deduceri."],
    };
  },
  resultado: [
    { clave: "cost", etiqueta: "Cost total lunar pentru un angajat", formato: "moneda", destacada: true },
    { clave: "cam", etiqueta: "CAM plătită de angajator", formato: "moneda" },
    { clave: "net", etiqueta: "Salariul net al angajatului", formato: "moneda" },
    { clave: "contributiiAngajat", etiqueta: "CAS, CASS și impozit reținute angajatului", formato: "moneda" },
    { clave: "costLunarTotal", etiqueta: "Cost lunar pentru toți angajații", formato: "moneda" },
    { clave: "costAnual", etiqueta: "Cost anual (12 luni)", formato: "moneda" },
  ],
});
