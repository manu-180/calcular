import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.uletunnitoo",
  mercado: "ee",
  concepto: "horas-extra",
  slug: "uletunnitoo",
  estado: "publicado",
  requiere: { "ee.uletunni-kordaja": "numero", "ee.ootoo-kordaja": "numero", "ee.riigipuha-kordaja": "numero" },
  campos: [
    { id: "palk", tipo: "moneda", etiqueta: "Brutopalk kuus", min: 0, porDefecto: 2000 },
    { id: "kuuTunnid", tipo: "numero", etiqueta: "Selle kuu kokkulepitud töötunnid", min: 1, max: 300, porDefecto: 168 },
    { id: "uletunnid", tipo: "numero", etiqueta: "Ületunnid, mida hüvitatakse rahas", min: 0, max: 300, porDefecto: 10 },
    { id: "ootunnid", tipo: "numero", etiqueta: "Tunnid ööajal (kell 22.00 kuni 6.00)", min: 0, max: 300, porDefecto: 0 },
    { id: "riigipuha", tipo: "numero", etiqueta: "Tunnid riigipühal", min: 0, max: 300, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.palk, "palk");
    if (e.kuuTunnid <= 0) throw new ErrorEntrada("Töötunde peab olema rohkem kui null.", "kuuTunnid");
    const tund = e.palk / e.kuuTunnid;
    const uletasu = redondear(tund * e.uletunnid * v["ee.uletunni-kordaja"]);
    const oolisa = redondear(tund * e.ootunnid * (v["ee.ootoo-kordaja"] - 1));
    const pyhalisa = redondear(tund * e.riigipuha * (v["ee.riigipuha-kordaja"] - 1));
    const lisad = redondear(uletasu + oolisa + pyhalisa);
    return { lisad, kokku: redondear(e.palk + lisad), tund: redondear(tund), uletasu, oolisa, pyhalisa };
  },
  resultado: [
    { clave: "lisad", etiqueta: "Lisatasu kokku", formato: "moneda", destacada: true },
    { clave: "kokku", etiqueta: "Palk koos lisatasuga", formato: "moneda" },
    { clave: "tund", etiqueta: "Tunnitasu", formato: "moneda" },
    { clave: "uletasu", etiqueta: "Tasu ületundide eest", formato: "moneda", ocultarSiCero: true },
    { clave: "oolisa", etiqueta: "Lisa öötöö eest", formato: "moneda", ocultarSiCero: true },
    { clave: "pyhalisa", etiqueta: "Lisa riigipühal tehtud töö eest", formato: "moneda", ocultarSiCero: true },
  ],
});
