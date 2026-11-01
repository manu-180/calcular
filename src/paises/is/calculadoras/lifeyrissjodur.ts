import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.lifeyrissjodur",
  mercado: "is",
  concepto: "aportes-seguridad-social",
  slug: "lifeyrissjodur",
  estado: "publicado",
  requiere: { "is.lifeyrir-launamadur": "numero", "is.lifeyrir-motframlag": "numero", "is.sereign-hamark": "numero" },
  campos: [
    { id: "laun", tipo: "moneda", etiqueta: "Heildarlaun á mánuði", min: 0, porDefecto: 700000 },
    { id: "sereign", tipo: "porcentaje", etiqueta: "Séreignarsparnaður þinn", ayuda: "Frádráttarbært upp að 4%.", min: 0, max: 4, porDefecto: 0 },
    { id: "motSereign", tipo: "porcentaje", etiqueta: "Mótframlag launagreiðanda í séreign", ayuda: "Hlutfallið kemur úr kjarasamningi eða ráðningarsamningi.", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.laun <= 0) throw new ErrorEntrada("Sláðu inn laun hærri en núll.", "laun");
    const launamadur = redondear(porcentaje(e.laun, v["is.lifeyrir-launamadur"]));
    const motframlag = redondear(porcentaje(e.laun, v["is.lifeyrir-motframlag"]));
    const sereign = redondear(porcentaje(e.laun, e.sereign));
    const motSereign = redondear(porcentaje(e.laun, e.motSereign));
    return { launamadur, motframlag, samtryggt: launamadur + motframlag, sereign, motSereign, heild: launamadur + motframlag + sereign + motSereign, arlega: (launamadur + motframlag + sereign + motSereign) * 12 };
  },
  resultado: [
    { clave: "launamadur", etiqueta: "Iðgjald launamanns", formato: "moneda" },
    { clave: "motframlag", etiqueta: "Mótframlag launagreiðanda", formato: "moneda" },
    { clave: "samtryggt", etiqueta: "Lögbundið iðgjald alls", formato: "moneda" },
    { clave: "sereign", etiqueta: "Séreign, þinn hluti", formato: "moneda", ocultarSiCero: true },
    { clave: "motSereign", etiqueta: "Séreign, mótframlag", formato: "moneda", ocultarSiCero: true },
    { clave: "heild", etiqueta: "Greitt í sjóði á mánuði", formato: "moneda", destacada: true },
    { clave: "arlega", etiqueta: "Á ári", formato: "moneda" },
  ],
});
