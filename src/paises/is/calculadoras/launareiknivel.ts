import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { reiknaLaun } from "../lib/laun";

export default definirCalculadora({
  id: "is.launareiknivel",
  mercado: "is",
  concepto: "sueldo-neto",
  slug: "launareiknivel",
  estado: "publicado",
  requiere: {
    "is.skattthrep-man": "escala",
    "is.personuafslattur-man": "numero",
    "is.personuafslattur-ars": "numero",
    "is.lifeyrir-launamadur": "numero",
    "is.sereign-hamark": "numero",
    "is.utsvar-stadgreidsla": "numero",
  },
  campos: [
    { id: "laun", tipo: "moneda", etiqueta: "Heildarlaun á mánuði", min: 0, porDefecto: 700000 },
    { id: "sereign", tipo: "porcentaje", etiqueta: "Séreignarsparnaður þinn", ayuda: "Frádráttarbært upp að 4%. Skrifaðu 0 ef þú greiðir ekki í séreign.", min: 0, max: 4, porDefecto: 0 },
    { id: "nyting", tipo: "porcentaje", etiqueta: "Nýting persónuafsláttar", ayuda: "100 er fullur afsláttur. Skrifaðu 200 ef þú nýtir allan afslátt maka, 0 ef þú notar hann hjá öðrum launagreiðanda.", min: 0, max: 200, porDefecto: 100 },
    { id: "felagsgjald", tipo: "porcentaje", etiqueta: "Félagsgjald í stéttarfélag", ayuda: "Hlutfallið fer eftir félagi: sjáðu launaseðilinn þinn.", min: 0, max: 5, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.laun <= 0) throw new ErrorEntrada("Sláðu inn laun hærri en núll.", "laun");
    const s = reiknaLaun(
      e.laun,
      { escala: v["is.skattthrep-man"], afslattur: v["is.personuafslattur-man"], lifeyrir: v["is.lifeyrir-launamadur"] },
      { sereign: e.sereign, nyting: e.nyting, felagsgjald: e.felagsgjald },
      redondear,
    );
    return { ...s, hlutfall: ((e.laun - s.utborgad) / e.laun) * 100 };
  },
  resultado: [
    { clave: "lifeyrir", etiqueta: "Iðgjald í lífeyrissjóð", formato: "moneda" },
    { clave: "sereign", etiqueta: "Séreignarsparnaður", formato: "moneda", ocultarSiCero: true },
    { clave: "stofn", etiqueta: "Skattstofn", formato: "moneda" },
    { clave: "skattur", etiqueta: "Reiknaður skattur", formato: "moneda" },
    { clave: "afslattur", etiqueta: "Persónuafsláttur", formato: "moneda" },
    { clave: "stadgreidsla", etiqueta: "Staðgreiðsla", formato: "moneda" },
    { clave: "felagsgjald", etiqueta: "Félagsgjald", formato: "moneda", ocultarSiCero: true },
    { clave: "utborgad", etiqueta: "Útborguð laun", formato: "moneda", destacada: true },
    { clave: "hlutfall", etiqueta: "Frádráttur alls af heildarlaunum", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "laun", periodoBruto: "mes", neto: "utborgad", periodoNeto: "mes" },
});
