import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { vanhempainpaivaraha, vuositulo } from "../lib/kela";

export default definirCalculadora({
  id: "fi.vanhempainpaivaraha-laskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "vanhempainpaivaraha-laskuri",
  estado: "publicado",
  requiere: {
    "fi.vakuutusmaksuvahennys": "numero",
    "fi.vahimmaispaivaraha": "numero",
    "fi.vanhempainpaivaraha-rajat": "mapa",
    "fi.vanhempainpaivaraha-prosentit": "mapa",
    "fi.korotetun-vanhempainrahan-paivat": "numero",
    "fi.vanhempainrahapaivat": "numero",
  },
  campos: [
    {
      id: "palkka",
      tipo: "moneda",
      etiqueta: "Palkkatulot 12 kuukaudelta (brutto)",
      min: 0,
      porDefecto: 40000,
      ayuda: "Kela käyttää yleensä tuloja vanhempainvapaan alkua edeltävää kuukautta edeltäneiltä 12 kuukaudelta.",
    },
    { id: "paivat", tipo: "entero", etiqueta: "Vanhempainrahapäivät, jotka pidät", min: 1, max: 320, porDefecto: 160 },
  ],
  calcular(e, v, { redondear }) {
    if (e.palkka < 0) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const vt = vuositulo(e.palkka, v["fi.vakuutusmaksuvahennys"]);
    const rajat = v["fi.vanhempainpaivaraha-rajat"];
    const pros = v["fi.vanhempainpaivaraha-prosentit"];
    const korotettu = redondear(vanhempainpaivaraha(vt, rajat, pros, v["fi.vahimmaispaivaraha"], true));
    const tavallinen = redondear(vanhempainpaivaraha(vt, rajat, pros, v["fi.vahimmaispaivaraha"], false));
    const korotetut = Math.min(e.paivat, v["fi.korotetun-vanhempainrahan-paivat"]);
    const yhteensa = redondear(korotetut * korotettu + (e.paivat - korotetut) * tavallinen);
    const observaciones: string[] = [];
    if (e.paivat > v["fi.vanhempainrahapaivat"]) {
      observaciones.push("Kumpikin vanhempi saa omat vanhempainrahapäivänsä. Yli oman kiintiön voit pitää vain päiviä, jotka toinen vanhempi luovuttaa sinulle.");
    }
    observaciones.push("Päiväraha maksetaan arkipäiviltä maanantaista lauantaihin. Kuukausiarvio on 25 arkipäivän mukaan.");
    return {
      tavallinen,
      korotettu,
      kuukaudessa: redondear(tavallinen * 25),
      yhteensa,
      vuositulo: redondear(vt),
      observaciones,
    };
  },
  resultado: [
    { clave: "tavallinen", etiqueta: "Vanhempainraha arkipäivältä", formato: "moneda", destacada: true },
    { clave: "korotettu", etiqueta: "Korotettu vanhempainraha ensimmäisiltä päiviltä", formato: "moneda" },
    { clave: "kuukaudessa", etiqueta: "Noin kuukaudessa (25 arkipäivää)", formato: "moneda" },
    { clave: "yhteensa", etiqueta: "Vanhempainraha valitsemiltasi päiviltä yhteensä", formato: "moneda" },
    { clave: "vuositulo", etiqueta: "Vuositulo vakuutusmaksuvähennyksen jälkeen", formato: "moneda" },
  ],
});
