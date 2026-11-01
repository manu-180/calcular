import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DJECA, CAMPO_GRAD, CAMPO_UZDRZAVANI, koeficijent } from "../lib/placa";

export default definirCalculadora({
  id: "hr.porez-na-dohodak",
  mercado: "hr",
  concepto: "impuesto-renta",
  slug: "porez-na-dohodak",
  estado: "publicado",
  requiere: {
    "hr.osobni-odbitak": "numero",
    "hr.koeficijenti-odbitka": "mapa",
    "hr.prag-godisnji": "numero",
    "hr.stopa-niza": "mapa",
    "hr.stopa-visa": "mapa",
    "hr.umanjenje-mladi": "mapa",
  },
  campos: [
    { id: "dohodak", tipo: "moneda", etiqueta: "Godišnji dohodak nakon doprinosa", min: 0, porDefecto: 24000 },
    CAMPO_GRAD,
    CAMPO_DJECA,
    CAMPO_UZDRZAVANI,
    {
      id: "dob",
      tipo: "opcion",
      etiqueta: "Dob",
      ayuda: "Umanjenje vrijedi za dohodak od nesamostalnog rada oporezovan nižom stopom. Računamo kao da je sav dohodak plaća.",
      opciones: [
        { valor: "ostali", etiqueta: "31 godina ili više" },
        { valor: "do30", etiqueta: "Od 26 do 30 godina" },
        { valor: "do25", etiqueta: "Do 25 godina" },
      ],
      porDefecto: "ostali",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.dohodak <= 0) throw new ErrorEntrada("Unesite dohodak veći od nule.", "dohodak");
    const odbitak = redondear(v["hr.osobni-odbitak"] * 12 * koeficijent(v["hr.koeficijenti-odbitka"], e.djeca, e.uzdrzavani));
    const osnovica = Math.max(0, redondear(e.dohodak - odbitak));
    const prag = v["hr.prag-godisnji"];
    const nizi = redondear((Math.min(osnovica, prag) * (v["hr.stopa-niza"][e.grad] ?? 0)) / 100);
    const visi = redondear((Math.max(0, osnovica - prag) * (v["hr.stopa-visa"][e.grad] ?? 0)) / 100);
    const umanjenje = e.dob === "ostali" ? 0 : redondear((nizi * (v["hr.umanjenje-mladi"][e.dob] ?? 0)) / 100);
    return { porez: redondear(nizi + visi - umanjenje), odbitak, osnovica, nizi, visi, umanjenje };
  },
  resultado: [
    { clave: "porez", etiqueta: "Godišnji porez na dohodak", formato: "moneda", destacada: true },
    { clave: "odbitak", etiqueta: "Godišnji osobni odbitak", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Porezna osnovica", formato: "moneda" },
    { clave: "nizi", etiqueta: "Porez po nižoj stopi", formato: "moneda" },
    { clave: "visi", etiqueta: "Porez po višoj stopi", formato: "moneda", ocultarSiCero: true },
    { clave: "umanjenje", etiqueta: "Umanjenje za mlade", formato: "moneda", ocultarSiCero: true },
  ],
});
