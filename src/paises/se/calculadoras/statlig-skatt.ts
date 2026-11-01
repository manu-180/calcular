import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brytpunkt, grundavdrag, KRAV_SKATT, nedTillHundratal, regler } from "../lib/skatt";

export default definirCalculadora({
  id: "se.statlig-skatt",
  mercado: "se",
  concepto: "impuesto-renta",
  slug: "statlig-skatt",
  estado: "publicado",
  requiere: { ...KRAV_SKATT },
  campos: [
    { id: "inkomst", tipo: "moneda", etiqueta: "Lön före skatt", min: 0, porDefecto: 60000 },
    {
      id: "period",
      tipo: "opcion",
      etiqueta: "Lönen gäller",
      opciones: [
        { valor: "manad", etiqueta: "Per månad" },
        { valor: "ar", etiqueta: "Per år" },
      ],
      porDefecto: "manad",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.inkomst <= 0) throw new ErrorEntrada("Skriv en lön som är större än noll.", "inkomst");
    const r = regler(v);
    const ffi = nedTillHundratal(e.period === "manad" ? e.inkomst * 12 : e.inkomst);
    const ga = grundavdrag(ffi, r);
    const bfi = Math.max(0, ffi - ga);
    const over = bfi - r.skiktgrans;
    const statlig = over >= 200 ? Math.floor((over * r.statligSats) / 100) : 0;
    const bp = brytpunkt(r);
    const observaciones: string[] = [];
    if (statlig === 0) observaciones.push("Din inkomst ligger under brytpunkten. Du betalar bara kommunal inkomstskatt.");
    else observaciones.push("Statlig skatt tas bara ut på den del av inkomsten som ligger över skiktgränsen. Resten av lönen beskattas som vanligt.");
    return {
      statligAr: statlig,
      statligManad: redondear(statlig / 12),
      arsinkomst: ffi,
      grundavdrag: ga,
      beskattningsbar: bfi,
      overSkiktgransen: Math.max(0, over),
      brytpunktAr: bp,
      brytpunktManad: redondear(bp / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "statligAr", etiqueta: "Statlig inkomstskatt per år", formato: "moneda", decimales: 0, destacada: true },
    { clave: "statligManad", etiqueta: "Statlig inkomstskatt per månad i genomsnitt", formato: "moneda" },
    { clave: "arsinkomst", etiqueta: "Årsinkomst", formato: "moneda", decimales: 0 },
    { clave: "grundavdrag", etiqueta: "Grundavdrag", formato: "moneda", decimales: 0 },
    { clave: "beskattningsbar", etiqueta: "Beskattningsbar förvärvsinkomst", formato: "moneda", decimales: 0 },
    { clave: "overSkiktgransen", etiqueta: "Del av inkomsten över skiktgränsen", formato: "moneda", decimales: 0 },
    { clave: "brytpunktAr", etiqueta: "Brytpunkt per år", formato: "moneda", decimales: 0 },
    { clave: "brytpunktManad", etiqueta: "Brytpunkt per månad", formato: "moneda" },
  ],
});
