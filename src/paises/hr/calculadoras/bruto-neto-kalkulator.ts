import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DJECA, CAMPO_DRUGI_STUP, CAMPO_GRAD, CAMPO_UZDRZAVANI, obracunaj, REQUIERE_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "hr.bruto-neto-kalkulator",
  mercado: "hr",
  concepto: "sueldo-neto",
  slug: "bruto-neto-kalkulator",
  estado: "publicado",
  requiere: { ...REQUIERE_PLACA, "hr.umanjenje-mladi": "mapa" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Bruto plaća mjesečno", min: 0, porDefecto: 2000 },
    CAMPO_GRAD,
    CAMPO_DRUGI_STUP,
    CAMPO_DJECA,
    CAMPO_UZDRZAVANI,
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto plaću veću od nule.", "bruto");
    const o = obracunaj(e.bruto, e, v, redondear);
    const observaciones: string[] = [];
    if (o.umanjenje > 0) observaciones.push("Plaća je ispod gornje granice za umanjenje osnovice, pa je doprinos za I. stup manji. Mirovinska prava računaju se bez tog umanjenja.");
    if (e.bruto > v["hr.najvisa-osnovica"]) observaciones.push("Plaća je iznad najviše mjesečne osnovice, pa se mirovinski doprinosi računaju samo do te granice.");
    return {
      neto: o.neto,
      mioI: o.mioI,
      mioII: o.mioII,
      umanjenje: o.umanjenje,
      dohodak: o.dohodak,
      odbitak: o.odbitak,
      osnovica: o.osnovica,
      porez: o.porez,
      netoGodisnje: redondear(o.neto * 12),
      trosak: o.trosak,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Neto plaća mjesečno", formato: "moneda", destacada: true },
    { clave: "mioI", etiqueta: "Mirovinsko, I. stup", formato: "moneda" },
    { clave: "mioII", etiqueta: "Mirovinsko, II. stup", formato: "moneda", ocultarSiCero: true },
    { clave: "umanjenje", etiqueta: "Umanjenje osnovice I. stupa", formato: "moneda", ocultarSiCero: true },
    { clave: "dohodak", etiqueta: "Dohodak nakon doprinosa", formato: "moneda" },
    { clave: "odbitak", etiqueta: "Osobni odbitak", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Porezna osnovica", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "netoGodisnje", etiqueta: "Neto za 12 mjeseci", formato: "moneda" },
    { clave: "trosak", etiqueta: "Ukupan mjesečni trošak poslodavca", formato: "moneda" },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { grad: "zagreb", drugiStup: true, djeca: 0, uzdrzavani: 0 } },
});
