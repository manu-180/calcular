import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { leu } from "../lib/fiscal";

export default definirCalculadora({
  id: "ro.calculator-microintreprindere",
  mercado: "ro",
  concepto: "propio",
  slug: "calculator-microintreprindere",
  estado: "publicado",
  requiere: {
    "ro.cota-micro": "numero",
    "ro.plafon-micro": "numero",
    "ro.impozit-dividende": "numero",
    "ro.eur": "serie",
  },
  campos: [
    { id: "venituri", tipo: "moneda", etiqueta: "Venituri impozabile ale firmei în an", min: 0, porDefecto: 300000 },
    { id: "cheltuieli", tipo: "moneda", etiqueta: "Cheltuieli ale firmei în an (inclusiv salarii)", min: 0, porDefecto: 180000 },
    { id: "dividende", tipo: "si-no", etiqueta: "Distribuiți tot profitul ca dividende", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.venituri <= 0) throw new ErrorEntrada("Introduceți veniturile firmei.", "venituri");
    const impozitMicro = leu((e.venituri * v["ro.cota-micro"]) / 100);
    const profit = Math.max(0, e.venituri - e.cheltuieli - impozitMicro);
    const dividendeBrute = e.dividende ? profit : 0;
    const impozitDividende = leu((dividendeBrute * v["ro.impozit-dividende"]) / 100);
    const dividendeNete = dividendeBrute - impozitDividende;
    const curs = v["ro.eur"].valor;
    const venituriEur = redondear(e.venituri / curs);
    const observaciones: string[] = [];
    if (venituriEur > v["ro.plafon-micro"]) {
      observaciones.push("Veniturile trec de plafonul pentru impozitul micro la cursul BNR de azi. Plafonul se verifică la cursul de la închiderea exercițiului financiar; peste el firma trece la impozit pe profit.");
    }
    observaciones.push("Nu sunt incluse CASS pe dividende, plătită de asociat prin Declarația unică, și condițiile de încadrare (cel puțin un salariat, asociați, situații financiare depuse).");
    return {
      impozitMicro,
      profit,
      impozitDividende,
      dividendeNete,
      venituriEur,
      curs,
      totalImpozite: impozitMicro + impozitDividende,
      observaciones,
    };
  },
  resultado: [
    { clave: "impozitMicro", etiqueta: "Impozit pe veniturile firmei micro", formato: "moneda", destacada: true },
    { clave: "profit", etiqueta: "Profit după impozit", formato: "moneda" },
    { clave: "impozitDividende", etiqueta: "Impozit pe dividende", formato: "moneda", ocultarSiCero: true },
    { clave: "dividendeNete", etiqueta: "Dividende nete pentru asociați", formato: "moneda", ocultarSiCero: true },
    { clave: "totalImpozite", etiqueta: "Total impozite", formato: "moneda" },
    { clave: "venituriEur", etiqueta: "Veniturile în euro, la cursul BNR", formato: "numero", decimales: 0 },
    { clave: "curs", etiqueta: "Cursul BNR folosit (lei pentru 1 euro)", formato: "numero", decimales: 4 },
  ],
});
