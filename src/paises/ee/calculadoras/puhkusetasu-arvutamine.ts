import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.puhkusetasu",
  mercado: "ee",
  concepto: "vacaciones",
  slug: "puhkusetasu-arvutamine",
  estado: "publicado",
  requiere: { "ee.pohipuhkus": "numero", "ee.pohipuhkus-pikk": "numero" },
  campos: [
    { id: "tasu", tipo: "moneda", etiqueta: "Viimase kuue kalendrikuu töötasu kokku", min: 0, porDefecto: 12000 },
    { id: "paevad", tipo: "entero", etiqueta: "Nende kuue kuu kalendripäevad ilma riigipühadeta", ayuda: "Võta periood puhkuse alguse kuule eelnenud kuuest kuust. Rahvuspüha ja riigipühi ei arvestata.", min: 1, max: 184, porDefecto: 178 },
    { id: "puhkus", tipo: "entero", etiqueta: "Puhkusepäevad, mille eest tasu maksad", min: 1, max: 365, porDefecto: 14 },
    { id: "liik", tipo: "opcion", etiqueta: "Põhipuhkuse pikkus", opciones: [{ valor: "tava", etiqueta: "Tavaline töötaja" }, { valor: "pikk", etiqueta: "Alaealine või osalise või puuduva töövõimega töötaja" }], porDefecto: "tava" },
    { id: "kuud", tipo: "numero", etiqueta: "Töötatud kuud selles kalendriaastas", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.tasu, "tasu");
    if (e.paevad < 1) throw new ErrorEntrada("Kalendripäevi peab olema vähemalt üks.", "paevad");
    if (e.kuud > 12) throw new ErrorEntrada("Aastas on kuni 12 kuud.", "kuud");
    const paevatasu = e.tasu / e.paevad;
    const taispuhkus = e.liik === "pikk" ? v["ee.pohipuhkus-pikk"] : v["ee.pohipuhkus"];
    return {
      tasu: redondear(paevatasu * e.puhkus),
      paevatasu: redondear(paevatasu),
      oigus: redondear((taispuhkus * e.kuud) / 12),
      taispuhkus,
    };
  },
  resultado: [
    { clave: "tasu", etiqueta: "Puhkusetasu bruto", formato: "moneda", destacada: true },
    { clave: "paevatasu", etiqueta: "Keskmine kalendripäevatasu", formato: "moneda" },
    { clave: "oigus", etiqueta: "Põhipuhkuse õigus selle aja eest", formato: "dias", decimales: 1 },
    { clave: "taispuhkus", etiqueta: "Täisaasta põhipuhkus", formato: "dias" },
  ],
});
