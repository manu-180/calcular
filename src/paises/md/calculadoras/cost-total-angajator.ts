import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPTIUNI_SCUTIRE, parametri, REQ_SALARIU, salariu } from "../lib/fiscal";

export default definirCalculadora({
  id: "md.cost-total-angajator",
  mercado: "md",
  concepto: "costo-empleador",
  slug: "cost-total-angajator",
  estado: "publicado",
  requiere: REQ_SALARIU,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salariul brut lunar", min: 0, porDefecto: 15000 },
    { id: "scutire", tipo: "opcion", etiqueta: "Scutirea personală a angajatului", opciones: OPTIUNI_SCUTIRE, porDefecto: "personala", ayuda: "Schimbă doar netul angajatului, nu costul firmei." },
  ],
  calcular(e, v) {
    if (e.brut <= 0) throw new ErrorEntrada("Introduceți un salariu brut mai mare decât zero.", "brut");
    const s = salariu(e.brut, { scutire: e.scutire, intretinuti: 0, intretinutiDizabilitate: 0 }, parametri(v));
    const statul = s.cas + s.prima + s.impozit;
    return {
      cost: s.cost,
      cas: s.cas,
      net: s.net,
      prima: s.prima,
      impozit: s.impozit,
      costAnual: Number((s.cost * 12).toFixed(2)),
      pondere: Number(((statul / s.cost) * 100).toFixed(2)),
    };
  },
  resultado: [
    { clave: "cost", etiqueta: "Costul total lunar pentru angajator", formato: "moneda", destacada: true },
    { clave: "cas", etiqueta: "Contribuția de asigurări sociale (CNAS)", formato: "moneda" },
    { clave: "net", etiqueta: "Salariul net al angajatului", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima medicală reținută din brut", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozitul pe venit reținut", formato: "moneda" },
    { clave: "costAnual", etiqueta: "Costul total pe an", formato: "moneda" },
    { clave: "pondere", etiqueta: "Partea statului din costul total", formato: "porcentaje", decimales: 1 },
  ],
});
