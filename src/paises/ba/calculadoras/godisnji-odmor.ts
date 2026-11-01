import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { CAMPO_REGION } from "../lib/plata";

export default definirCalculadora({
  id: "ba.godisnji-odmor",
  mercado: "ba",
  concepto: "vacaciones",
  slug: "godisnji-odmor",
  estado: "publicado",
  requiere: { "ba.odmor-min": "numero-por-region", "ba.odmor-max-fbih": "numero", "ba.odmor-maloljetni-fbih": "numero", "ba.odmor-posebni-rs": "numero" },
  campos: [
    CAMPO_REGION,
    { id: "maloljetan", tipo: "si-no", etiqueta: "Radnik je mlađi od 18 godina", porDefecto: false, visibleSi: { region: ["fbih"] } },
    { id: "posebni", tipo: "si-no", etiqueta: "Radite na poslovima s posebnim uslovima rada", porDefecto: false, visibleSi: { region: ["rs"] } },
    { id: "mjeseci", tipo: "entero", etiqueta: "Mjeseci rada u godini", min: 1, max: 12, porDefecto: 12 },
    { id: "plata", tipo: "moneda", etiqueta: "Prosječna bruto plata", min: 0, porDefecto: 2000, ayuda: "Za grubu naknadu. Dan računamo kao 22 radna dana u mjesecu." },
  ],
  calcular(e, v, { redondear }) {
    if (e.plata <= 0) throw new ErrorEntrada("Unesite platu veću od nule.", "plata");
    let cijelaGodina = porRegion(v["ba.odmor-min"], e.region);
    if (e.region === "fbih" && e.maloljetan) cijelaGodina = v["ba.odmor-maloljetni-fbih"];
    if (e.region === "rs" && e.posebni) cijelaGodina = v["ba.odmor-posebni-rs"];
    const dani = Math.ceil((cijelaGodina * e.mjeseci) / 12);
    return { dani, cijelaGodina, naknada: redondear((e.plata / 22) * dani) };
  },
  resultado: [
    { clave: "dani", etiqueta: "Radnih dana odmora za taj period", formato: "dias", destacada: true },
    { clave: "cijelaGodina", etiqueta: "Zakonski minimum za cijelu godinu", formato: "dias" },
    { clave: "naknada", etiqueta: "Gruba naknada za odmor (bruto)", formato: "moneda" },
  ],
});
