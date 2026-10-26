import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nahoru, zalohaNaDan, zdravotniZamestnance } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.dohoda-o-provedeni-prace",
  mercado: "cz",
  concepto: "propio",
  slug: "dohoda-o-provedeni-prace",
  estado: "publicado",
  requiere: {
    "cz.rozhodny-prijem-dpp": "numero",
    "cz.srazkova-dan": "numero",
    "cz.socialni-zamestnanec": "numero",
    "cz.socialni-zamestnavatel": "numero",
    "cz.zdravotni-pojisteni": "numero",
    "cz.prumerna-mzda": "numero",
    "cz.dan-z-prijmu": "escala",
    "cz.sleva-na-poplatnika": "numero",
  },
  campos: [
    { id: "odmena", tipo: "moneda", etiqueta: "Odměna z dohody za měsíc (od jednoho zaměstnavatele)", min: 0, porDefecto: 10000 },
    {
      id: "prohlaseni",
      tipo: "si-no",
      etiqueta: "Podepsané prohlášení poplatníka u tohoto zaměstnavatele",
      ayuda: "Prohlášení můžete mít podepsané jen u jednoho plátce za měsíc.",
      porDefecto: false,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.odmena <= 0) throw new ErrorEntrada("Zadejte odměnu vyšší než nula.", "odmena");
    const pojisteno = e.odmena >= v["cz.rozhodny-prijem-dpp"];
    const socialni = pojisteno ? nahoru((e.odmena * v["cz.socialni-zamestnanec"]) / 100) : 0;
    const zdr = pojisteno ? zdravotniZamestnance(e.odmena, v["cz.zdravotni-pojisteni"]) : { zamestnanec: 0, zamestnavatel: 0, celkem: 0 };
    const socialniZamestnavatel = pojisteno ? nahoru((e.odmena * v["cz.socialni-zamestnavatel"]) / 100) : 0;
    const srazkova = !e.prohlaseni && !pojisteno;
    let dan: number;
    let zpusob: string;
    if (srazkova) {
      dan = Math.floor((Math.floor(e.odmena) * v["cz.srazkova-dan"]) / 100 + 1e-9);
      zpusob = "Srážková daň (konečná)";
    } else {
      const s = v["cz.dan-z-prijmu"];
      const { zaloha } = zalohaNaDan(e.odmena, v["cz.prumerna-mzda"], { nizsi: s[0].tasa, vyssi: s[s.length - 1].tasa });
      dan = e.prohlaseni ? Math.max(0, zaloha - v["cz.sleva-na-poplatnika"] / 12) : zaloha;
      zpusob = e.prohlaseni ? "Záloha na daň se slevou na poplatníka" : "Záloha na daň bez slev";
    }
    const observaciones: string[] = [];
    if (pojisteno) observaciones.push("Odměna dosáhla rozhodného příjmu, proto se z ní platí sociální a zdravotní pojištění.");
    else observaciones.push("Odměna je pod rozhodným příjmem, pojištění se z ní neplatí.");
    if (srazkova) observaciones.push("Sražená daň je konečná. Můžete ji ale zahrnout do daňového přiznání, pokud se vám to vyplatí.");
    return {
      cista: redondear(e.odmena - socialni - zdr.zamestnanec - dan),
      socialni,
      zdravotni: zdr.zamestnanec,
      dan,
      zpusob,
      naklady: redondear(e.odmena + socialniZamestnavatel + zdr.zamestnavatel),
      observaciones,
    };
  },
  resultado: [
    { clave: "cista", etiqueta: "Čistá odměna z dohody", formato: "moneda", destacada: true },
    { clave: "zpusob", etiqueta: "Způsob zdanění", formato: "texto" },
    { clave: "dan", etiqueta: "Daň", formato: "moneda" },
    { clave: "socialni", etiqueta: "Sociální pojištění", formato: "moneda" },
    { clave: "zdravotni", etiqueta: "Zdravotní pojištění", formato: "moneda" },
    { clave: "naklady", etiqueta: "Náklady zaměstnavatele", formato: "moneda" },
  ],
});
