import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ee.pensionikalkulaator",
  mercado: "ee",
  concepto: "jubilacion",
  slug: "pensionikalkulaator",
  estado: "publicado",
  requiere: { "ee.pension-baasosa": "numero", "ee.pension-aastahinne": "numero", "ee.pension-staaz": "numero", "ee.rahvapension": "numero" },
  campos: [
    { id: "staaz", tipo: "numero", etiqueta: "Pensioniõiguslik staaž kuni 31.12.1998 (aastad)", min: 0, max: 60, porDefecto: 10 },
    { id: "osakud", tipo: "numero", etiqueta: "Kindlustusosakud 1999 kuni 2020", ayuda: "Oma osakute summa näed riigiportaalist eesti.ee.", min: 0, max: 100, porDefecto: 15 },
    { id: "osakudUued", tipo: "numero", etiqueta: "Kindlustusosakud alates 2021", min: 0, max: 100, porDefecto: 5 },
    { id: "solidaar", tipo: "numero", etiqueta: "Solidaarosakud alates 2021", min: 0, max: 100, porDefecto: 5 },
    { id: "koguStaaz", tipo: "numero", etiqueta: "Eestis omandatud pensionistaaž kokku (aastad)", min: 0, max: 60, porDefecto: 40 },
  ],
  calcular(e, v, { redondear }) {
    if (e.staaz < 0 || e.osakud < 0 || e.osakudUued < 0 || e.solidaar < 0) throw new ErrorEntrada("Väärtused ei saa olla negatiivsed.", "staaz");
    const h = v["ee.pension-aastahinne"];
    const staazOsa = e.staaz * h;
    const kindlustusOsa = e.osakud * h;
    const uhendOsa = ((e.osakudUued + e.solidaar) / 2) * h;
    const observaciones: string[] = [];
    if (e.koguStaaz < v["ee.pension-staaz"]) observaciones.push("Vanaduspensioniks on vaja vähemalt 15 aastat Eestis omandatud staaži. Muidu võib tulla kõne alla rahvapension.");
    return {
      pension: redondear(v["ee.pension-baasosa"] + staazOsa + kindlustusOsa + uhendOsa),
      baasosa: v["ee.pension-baasosa"],
      staazOsa: redondear(staazOsa),
      kindlustusOsa: redondear(kindlustusOsa),
      uhendOsa: redondear(uhendOsa),
      aastahinne: h,
      rahvapension: v["ee.rahvapension"],
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "Vanaduspension kuus", formato: "moneda", destacada: true },
    { clave: "baasosa", etiqueta: "Baasosa", formato: "moneda" },
    { clave: "staazOsa", etiqueta: "Staažiosa", formato: "moneda" },
    { clave: "kindlustusOsa", etiqueta: "Kindlustusosa", formato: "moneda" },
    { clave: "uhendOsa", etiqueta: "Ühendosa", formato: "moneda" },
    { clave: "aastahinne", etiqueta: "Aastahinne", formato: "numero", decimales: 3 },
    { clave: "rahvapension", etiqueta: "Rahvapension võrdluseks", formato: "moneda" },
  ],
});
