import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { llogaritPagen, REQUIERE_PAGA } from "../lib/paga";

export default definirCalculadora({
  id: "al.paga-minimale",
  mercado: "al",
  concepto: "salario-minimo",
  slug: "paga-minimale",
  estado: "publicado",
  requiere: { ...REQUIERE_PAGA, "al.paga-minimale-orare": "numero", "al.ore-mujore": "numero", "al.paga-mesatare": "numero" },
  campos: [
    { id: "ore", tipo: "numero", etiqueta: "Orë pune në muaj", min: 0, max: 400, porDefecto: 174 },
    { id: "pagaJuaj", tipo: "moneda", etiqueta: "Paga juaj bruto (nuk është e detyrueshme)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.ore <= 0) throw new ErrorEntrada("Vendosni një numër orësh më të madh se zero.", "ore");
    const p = llogaritPagen(v["al.paga-minimale"], v, redondear);
    const perOret = e.ore >= v["al.ore-mujore"] ? v["al.paga-minimale"] : redondear(e.ore * v["al.paga-minimale-orare"]);
    return {
      minimale: v["al.paga-minimale"],
      perOret,
      orare: v["al.paga-minimale-orare"],
      neto: p.neto,
      kosto: p.kosto,
      kundrejtMesatares: (v["al.paga-minimale"] / v["al.paga-mesatare"]) * 100,
      diferenca: e.pagaJuaj === null ? null : redondear(e.pagaJuaj - perOret),
    };
  },
  resultado: [
    { clave: "perOret", etiqueta: "Minimumi për këto orë", formato: "moneda", destacada: true },
    { clave: "minimale", etiqueta: "Paga minimale mujore", formato: "moneda" },
    { clave: "orare", etiqueta: "Paga minimale për një orë", formato: "moneda", decimales: 1 },
    { clave: "neto", etiqueta: "Paga minimale neto", formato: "moneda" },
    { clave: "kosto", etiqueta: "Kostoja e punëdhënësit", formato: "moneda" },
    { clave: "kundrejtMesatares", etiqueta: "Pjesa ndaj pagës mesatare", formato: "porcentaje", decimales: 1 },
    { clave: "diferenca", etiqueta: "Paga juaj kundrejt minimumit", formato: "moneda" },
  ],
});
