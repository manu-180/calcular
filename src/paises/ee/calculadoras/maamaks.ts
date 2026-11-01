import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.maamaks",
  mercado: "ee",
  concepto: "propio",
  slug: "maamaks",
  estado: "publicado",
  requiere: { "ee.maamaks-alam": "numero", "ee.maamaks-ulem": "mapa", "ee.maamaks-soodustus": "numero" },
  campos: [
    { id: "hind", tipo: "moneda", etiqueta: "Maa maksustamishind", min: 0, porDefecto: 50000 },
    { id: "siht", tipo: "opcion-dato", dato: "ee.maamaks-ulem", etiqueta: "Maa sihtotstarve", porDefecto: "elamu" },
    { id: "maar", tipo: "porcentaje", etiqueta: "Sinu omavalitsuse maamaksumäär (%)", ayuda: "Määrad avaldab Maksu- ja Tolliamet oma veebilehel.", min: 0, max: 2, porDefecto: 0.3 },
    { id: "soodustus", tipo: "moneda", etiqueta: "Kodualuse maa soodustus (eurodes)", ayuda: "Selle kehtestab omavalitsus. Kui sinu kodu ei asu sellel maal, jäta nulliks.", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.hind, "hind");
    const ulem = enMapa(v["ee.maamaks-ulem"], e.siht);
    if (e.maar < v["ee.maamaks-alam"] || e.maar > ulem) throw new ErrorEntrada(`Selle maa määr saab olla ${String(v["ee.maamaks-alam"]).replace(".", ",")} kuni ${String(ulem).replace(".", ",")} protsenti.`, "maar");
    if (e.soodustus > v["ee.maamaks-soodustus"]) throw new ErrorEntrada(`Soodustus saab olla kuni ${v["ee.maamaks-soodustus"]} eurot.`, "soodustus");
    const arvutatud = redondear(porcentaje(e.hind, e.maar));
    const soodustus = Math.min(e.soodustus, arvutatud);
    return { maks: redondear(arvutatud - soodustus), arvutatud, soodustus, ulem };
  },
  resultado: [
    { clave: "maks", etiqueta: "Maamaks aastas", formato: "moneda", destacada: true },
    { clave: "arvutatud", etiqueta: "Maks enne soodustust", formato: "moneda" },
    { clave: "soodustus", etiqueta: "Soodustus", formato: "moneda", ocultarSiCero: true },
    { clave: "ulem", etiqueta: "Selle sihtotstarbe kõrgeim määr", formato: "porcentaje", decimales: 1 },
  ],
});
