import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ro.calculator-concediu-de-odihna",
  mercado: "ro",
  concepto: "vacaciones",
  slug: "calculator-concediu-de-odihna",
  estado: "borrador",
  requiere: { "ro.concediu-odihna-minim": "numero" },
  campos: [
    { id: "salariu", tipo: "moneda", etiqueta: "Media lunară a salariului de bază și a sporurilor permanente (ultimele 3 luni)", min: 0, porDefecto: 6000 },
    { id: "zile3", tipo: "entero", etiqueta: "Zile lucrătoare în ultimele 3 luni", min: 1, max: 70, porDefecto: 63 },
    { id: "zileContract", tipo: "entero", etiqueta: "Zile de concediu pe an din contract", min: 1, max: 60, porDefecto: 21 },
    { id: "luni", tipo: "entero", etiqueta: "Luni lucrate în anul curent", min: 1, max: 12, porDefecto: 12 },
    { id: "zileLuate", tipo: "entero", etiqueta: "Zile de concediu pe care le luați acum", min: 1, max: 60, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salariu <= 0) throw new ErrorEntrada("Introduceți salariul.", "salariu");
    const zileAn = Math.max(e.zileContract, v["ro.concediu-odihna-minim"]);
    const cuvenite = Math.round((zileAn * e.luni) / 12);
    const mediaZilnica = redondear((e.salariu * 3) / e.zile3);
    const indemnizatie = redondear(mediaZilnica * e.zileLuate);
    const observaciones: string[] = [];
    if (e.zileContract < v["ro.concediu-odihna-minim"]) observaciones.push("Contractul nu poate da mai puțin decât minimul legal; calculul folosește minimul.");
    if (e.zileLuate > cuvenite) observaciones.push("Ați ales mai multe zile decât cele cuvenite proporțional pentru lunile lucrate.");
    return { cuvenite, mediaZilnica, indemnizatie, zileAn, observaciones };
  },
  resultado: [
    { clave: "indemnizatie", etiqueta: "Indemnizația de concediu (brut)", formato: "moneda", destacada: true },
    { clave: "mediaZilnica", etiqueta: "Media zilnică", formato: "moneda" },
    { clave: "cuvenite", etiqueta: "Zile cuvenite pentru lunile lucrate", formato: "dias" },
    { clave: "zileAn", etiqueta: "Zile de concediu pe an întreg", formato: "dias" },
  ],
});
