import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sairauspaivaraha, vuositulo } from "../lib/kela";

// Omavastuuaika on sairastumispäivä ja yhdeksän sitä seuraavaa arkipäivää (kela.fi, Sickness allowance).
const OMAVASTUU = 10;

export default definirCalculadora({
  id: "fi.sairauspaivaraha-laskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "sairauspaivaraha-laskuri",
  estado: "publicado",
  requiere: {
    "fi.vakuutusmaksuvahennys": "numero",
    "fi.vahimmaispaivaraha": "numero",
    "fi.sairauspaivaraha-rajat": "mapa",
    "fi.sairauspaivaraha-prosentit": "mapa",
  },
  campos: [
    { id: "palkka", tipo: "moneda", etiqueta: "Palkkatulot 12 kuukaudelta (brutto)", min: 0, porDefecto: 40000 },
    {
      id: "arkipaivat",
      tipo: "entero",
      etiqueta: "Sairauden kesto arkipäivinä sairastumispäivästä alkaen",
      min: 1,
      max: 310,
      porDefecto: 30,
      ayuda: "Arkipäiviä ovat maanantaista lauantaihin.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.palkka < 0) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const vt = vuositulo(e.palkka, v["fi.vakuutusmaksuvahennys"]);
    const raha = sairauspaivaraha(vt, v["fi.sairauspaivaraha-rajat"], v["fi.sairauspaivaraha-prosentit"], v["fi.vahimmaispaivaraha"]);
    const korvattavat = Math.min(Math.max(0, e.arkipaivat - OMAVASTUU), 300);
    const observaciones: string[] = [
      "Omavastuuaika on sairastumispäivä ja yhdeksän sitä seuraavaa arkipäivää. Sen ajalta Kela ei maksa sairauspäivärahaa.",
    ];
    if (raha === null) {
      observaciones.push("Vuositulosi ovat niin pienet, ettei tuloihin perustuvaa päivärahaa makseta. Kela voi maksaa vähimmäispäivärahan, jos täytät sen ehdot.");
    }
    const paivaraha = raha === null ? 0 : redondear(raha);
    return {
      paivaraha,
      kuukaudessa: redondear(paivaraha * 25),
      korvattavat,
      yhteensa: redondear(paivaraha * korvattavat),
      vuositulo: redondear(vt),
      observaciones,
    };
  },
  resultado: [
    { clave: "paivaraha", etiqueta: "Sairauspäiväraha arkipäivältä", formato: "moneda", destacada: true },
    { clave: "kuukaudessa", etiqueta: "Noin kuukaudessa (25 arkipäivää)", formato: "moneda" },
    { clave: "korvattavat", etiqueta: "Päivät, joilta päivärahaa maksetaan", formato: "dias", decimales: 0 },
    { clave: "yhteensa", etiqueta: "Sairauspäiväraha yhteensä", formato: "moneda" },
    { clave: "vuositulo", etiqueta: "Vuositulo vakuutusmaksuvähennyksen jälkeen", formato: "moneda" },
  ],
});
