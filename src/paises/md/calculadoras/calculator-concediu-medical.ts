import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { bazaPlafonata, NOTA_PLAFON, REQ_PLAFON } from "../lib/cnas";

export default definirCalculadora({
  id: "md.calculator-concediu-medical",
  mercado: "md",
  concepto: "propio",
  slug: "calculator-concediu-medical",
  estado: "publicado",
  requiere: { ...REQ_PLAFON, "md.itm": "mapa" },
  campos: [
    { id: "venit", tipo: "moneda", etiqueta: "Venitul mediu lunar asigurat din ultimele 12 luni", min: 0, porDefecto: 15000, ayuda: "Salariul brut mediu din care s-au plătit contribuții." },
    {
      id: "stagiu",
      tipo: "opcion",
      etiqueta: "Stagiul de cotizare sau cauza",
      opciones: [
        { valor: "sub5", etiqueta: "Până la 5 ani de stagiu" },
        { valor: "intre-5-8", etiqueta: "Între 5 și 8 ani de stagiu" },
        { valor: "peste8", etiqueta: "Peste 8 ani de stagiu" },
        { valor: "special", etiqueta: "Tuberculoză, SIDA, boală oncologică sau accident de muncă" },
      ],
      porDefecto: "peste8",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.venit <= 0) throw new ErrorEntrada("Introduceți un venit mai mare decât zero.", "venit");
    const procent = enMapa(v["md.itm"], e.stagiu);
    const procentAngajator = enMapa(v["md.itm"], "angajator");
    const b = bazaPlafonata(e.venit, v);
    const observaciones = ["Sumele sunt pentru o lună calendaristică întreagă de concediu medical."];
    if (b.plafonat) observaciones.push(NOTA_PLAFON);
    return {
      lunarCnas: redondear((b.baza * procent) / 100),
      procent,
      lunarAngajator: redondear((e.venit * procentAngajator) / 100),
      procentAngajator,
      baza: b.baza,
      plafon: b.plafon,
      observaciones,
    };
  },
  resultado: [
    { clave: "lunarCnas", etiqueta: "Indemnizația pe o lună, plătită de CNAS", formato: "moneda", destacada: true },
    { clave: "procent", etiqueta: "Procent din baza de calcul", formato: "porcentaje", decimales: 0 },
    { clave: "lunarAngajator", etiqueta: "La rata zilelor plătite de angajator, pe o lună", formato: "moneda" },
    { clave: "procentAngajator", etiqueta: "Procent pentru zilele plătite de angajator", formato: "porcentaje", decimales: 0 },
    { clave: "baza", etiqueta: "Baza de calcul", formato: "moneda" },
    { clave: "plafon", etiqueta: "Plafonul lunar al venitului asigurat", formato: "moneda" },
  ],
});
