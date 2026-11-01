import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.obracun-bolovanja",
  mercado: "rs",
  concepto: "propio",
  slug: "obracun-bolovanja",
  estado: "publicado",
  requiere: {
    ...REQUIERE_ZARADA,
    "rs.minimalna-cena-rada": "numero",
    "rs.bolovanje-bolest": "numero",
    "rs.bolovanje-povreda": "numero",
    "rs.bolovanje-poslodavac-dana": "numero",
  },
  campos: [
    { id: "zarada", tipo: "moneda", etiqueta: "Prosečna bruto zarada u prethodnih 12 meseci", min: 0, porDefecto: 200000 },
    {
      id: "razlog",
      tipo: "opcion",
      etiqueta: "Razlog bolovanja",
      opciones: [
        { valor: "bolest", etiqueta: "Bolest ili povreda van rada" },
        { valor: "povreda", etiqueta: "Povreda na radu ili profesionalna bolest" },
        { valor: "trudnoca", etiqueta: "Održavanje trudnoće" },
      ],
      porDefecto: "bolest",
    },
    { id: "dana", tipo: "entero", etiqueta: "Kalendarski dani bolovanja", min: 1, max: 366, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarada <= 0) throw new ErrorEntrada("Unesite prosečnu zaradu veću od nule.", "zarada");
    const p = parametri(v);
    const stopa = e.razlog === "bolest" ? v["rs.bolovanje-bolest"] : v["rs.bolovanje-povreda"];
    // Donja granica: minimalna zarada za 174 časa (fond iz zvaničnih mesečnih iznosa), bruto.
    const minimalna = brutoIzNeta(redondear(174 * v["rs.minimalna-cena-rada"]), p, 100, redondear).bruto;
    const mesecnaPoslodavac = Math.max((e.zarada * stopa) / 100, minimalna);
    const mesecnaFond = Math.max((Math.min(e.zarada, p.najvisaOsnovica) * stopa) / 100, minimalna);
    const prvih = v["rs.bolovanje-poslodavac-dana"];
    const danaPoslodavac = Math.min(e.dana, prvih);
    const danaFond = Math.max(0, e.dana - prvih);
    const poslodavac = redondear((mesecnaPoslodavac / 30) * danaPoslodavac);
    const fond = redondear((mesecnaFond / 30) * danaFond);
    const observaciones: string[] = [];
    if ((e.zarada * stopa) / 100 < minimalna) observaciones.push("Naknada je podignuta na minimalnu zaradu, jer ne sme biti niža od nje.");
    return { ukupno: redondear(poslodavac + fond), stopa, danaPoslodavac, poslodavac, danaFond, fond, observaciones };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Bruto naknada za bolovanje", formato: "moneda", destacada: true },
    { clave: "stopa", etiqueta: "Procenat naknade", formato: "porcentaje", decimales: 0 },
    { clave: "danaPoslodavac", etiqueta: "Dani na teret poslodavca", formato: "dias" },
    { clave: "poslodavac", etiqueta: "Plaća poslodavac", formato: "moneda" },
    { clave: "danaFond", etiqueta: "Dani na teret RFZO", formato: "dias", ocultarSiCero: true },
    { clave: "fond", etiqueta: "Plaća RFZO", formato: "moneda", ocultarSiCero: true },
  ],
});
