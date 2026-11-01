import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { reiknaLaun } from "../lib/laun";

export default definirCalculadora({
  id: "is.faedingarorlof",
  mercado: "is",
  concepto: "propio",
  slug: "faedingarorlof",
  estado: "publicado",
  requiere: {
    "is.faedingarorlof-hlutfall": "numero",
    "is.faedingarorlof-hamark": "numero",
    "is.faedingarorlof-lagmark": "mapa",
    "is.skattthrep-man": "escala",
    "is.personuafslattur-man": "numero",
    "is.lifeyrir-launamadur": "numero",
  },
  campos: [
    { id: "laun", tipo: "moneda", etiqueta: "Meðaltal heildarlauna á viðmiðunartímabili", min: 0, porDefecto: 800000 },
    { id: "starf", tipo: "opcion-dato", dato: "is.faedingarorlof-lagmark", etiqueta: "Starfshlutfall", porDefecto: "fullt" },
    { id: "manudir", tipo: "entero", etiqueta: "Fjöldi mánaða á fullri greiðslu", min: 1, max: 24, porDefecto: 6 },
  ],
  calcular(e, v, { redondear }) {
    if (e.laun <= 0) throw new ErrorEntrada("Sláðu inn laun hærri en núll.", "laun");
    const hamark = v["is.faedingarorlof-hamark"];
    const lagmark = enMapa(v["is.faedingarorlof-lagmark"], e.starf);
    const greidsla = Math.min(hamark, Math.max(lagmark, redondear(porcentaje(e.laun, v["is.faedingarorlof-hlutfall"]))));
    const s = reiknaLaun(greidsla, { escala: v["is.skattthrep-man"], afslattur: v["is.personuafslattur-man"], lifeyrir: v["is.lifeyrir-launamadur"] }, {}, redondear);
    return { greidsla, lifeyrir: s.lifeyrir, stadgreidsla: s.stadgreidsla, utborgad: s.utborgad, samtals: greidsla * e.manudir };
  },
  resultado: [
    { clave: "greidsla", etiqueta: "Greiðsla á mánuði fyrir skatt", formato: "moneda", destacada: true },
    { clave: "lifeyrir", etiqueta: "Iðgjald í lífeyrissjóð", formato: "moneda" },
    { clave: "stadgreidsla", etiqueta: "Staðgreiðsla með fullum persónuafslætti", formato: "moneda" },
    { clave: "utborgad", etiqueta: "Útborgað á mánuði, áætlað", formato: "moneda" },
    { clave: "samtals", etiqueta: "Samtals fyrir skatt á tímabilinu", formato: "moneda" },
  ],
});
