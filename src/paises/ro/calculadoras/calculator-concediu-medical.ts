import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ro.calculator-concediu-medical",
  mercado: "ro",
  concepto: "propio",
  slug: "calculator-concediu-medical",
  estado: "borrador",
  requiere: {
    "ro.concediu-medical-procente": "mapa",
    "ro.concediu-medical-plafon": "numero",
    "ro.salariu-minim": "numero",
  },
  campos: [
    { id: "venit", tipo: "moneda", etiqueta: "Venitul brut mediu lunar din ultimele 6 luni", min: 0, porDefecto: 6000 },
    { id: "zile6", tipo: "entero", etiqueta: "Zile lucrătoare în cele 6 luni", min: 1, max: 140, porDefecto: 126 },
    { id: "zile", tipo: "entero", etiqueta: "Zile lucrătoare de concediu medical în certificat", min: 1, max: 183, porDefecto: 5 },
    { id: "cardiovascular", tipo: "si-no", etiqueta: "Boală cardiovasculară (procent fix)", porDefecto: false },
    { id: "oZiMinus", tipo: "si-no", etiqueta: "Se scade o zi din episod (certificate din 2026)", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.venit <= 0) throw new ErrorEntrada("Introduceți venitul brut mediu.", "venit");
    const p = v["ro.concediu-medical-procente"];
    const cheie = e.cardiovascular ? "cardiovascular" : e.zile <= 7 ? "max-7" : e.zile <= 14 ? "8-14" : "peste-14";
    const procent = enMapa(p, cheie);
    const plafon = v["ro.concediu-medical-plafon"] * v["ro.salariu-minim"];
    const baza = Math.min(e.venit, plafon);
    const mediaZilnica = redondear((baza * 6) / e.zile6);
    const zilePlatite = Math.max(0, e.zile - (e.oZiMinus ? 1 : 0));
    const indemnizatie = redondear((mediaZilnica * procent * zilePlatite) / 100);
    return { indemnizatie, procent, mediaZilnica, zilePlatite };
  },
  resultado: [
    { clave: "indemnizatie", etiqueta: "Indemnizația de concediu medical (brut)", formato: "moneda", destacada: true },
    { clave: "procent", etiqueta: "Procentul aplicat", formato: "porcentaje", decimales: 0 },
    { clave: "mediaZilnica", etiqueta: "Media zilnică a bazei de calcul", formato: "moneda" },
    { clave: "zilePlatite", etiqueta: "Zile plătite", formato: "numero", decimales: 0 },
  ],
});
