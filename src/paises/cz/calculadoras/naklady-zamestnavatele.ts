import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cistaMzda } from "../lib/mzda";
import { parametryMzdy, REQUIERE_MZDA } from "../lib/parametry";

export default definirCalculadora({
  id: "cz.naklady-zamestnavatele",
  mercado: "cz",
  concepto: "costo-empleador",
  slug: "naklady-zamestnavatele",
  estado: "publicado",
  requiere: REQUIERE_MZDA,
  campos: [
    { id: "hruba", tipo: "moneda", etiqueta: "Hrubá mzda zaměstnance za měsíc", min: 0, porDefecto: 45000 },
    { id: "zamestnanci", tipo: "entero", etiqueta: "Počet zaměstnanců s touto mzdou", min: 1, max: 1000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hruba <= 0) throw new ErrorEntrada("Zadejte hrubou mzdu vyšší než nula.", "hruba");
    const m = cistaMzda(e.hruba, true, 0, parametryMzdy(v));
    const naklady = e.hruba + m.socialniZamestnavatel + m.zdravotniZamestnavatel;
    return {
      naklady: redondear(naklady * e.zamestnanci),
      socialni: m.socialniZamestnavatel * e.zamestnanci,
      zdravotni: m.zdravotniZamestnavatel * e.zamestnanci,
      odvody: (m.socialniZamestnavatel + m.zdravotniZamestnavatel) * e.zamestnanci,
      podilOdvodu: ((m.socialniZamestnavatel + m.zdravotniZamestnavatel) / e.hruba) * 100,
      rocne: redondear(naklady * 12 * e.zamestnanci),
      cista: redondear(m.cista),
      observaciones: [
        "Čistá mzda je spočítaná s podepsaným prohlášením a bez dětí. Náklady nezahrnují benefity, stravenky ani zákonné pojištění odpovědnosti zaměstnavatele.",
      ],
    };
  },
  resultado: [
    { clave: "naklady", etiqueta: "Celkové náklady zaměstnavatele za měsíc", formato: "moneda", destacada: true },
    { clave: "socialni", etiqueta: "Sociální pojištění placené zaměstnavatelem", formato: "moneda" },
    { clave: "zdravotni", etiqueta: "Zdravotní pojištění placené zaměstnavatelem", formato: "moneda" },
    { clave: "odvody", etiqueta: "Odvody zaměstnavatele celkem", formato: "moneda" },
    { clave: "podilOdvodu", etiqueta: "Odvody jako podíl z hrubé mzdy", formato: "porcentaje", decimales: 1 },
    { clave: "rocne", etiqueta: "Náklady za rok", formato: "moneda" },
    { clave: "cista", etiqueta: "Čistá mzda jednoho zaměstnance", formato: "moneda" },
  ],
});
