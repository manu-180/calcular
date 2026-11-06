import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { presmetajPlata } from "../lib/plata";

// Borrador: el monto 2026 solo apareció en extractos de buscador y contadores privados (ver datos.json).
export default definirCalculadora({
  id: "mk.minimalna-plata",
  mercado: "mk",
  concepto: "salario-minimo",
  slug: "minimalna-plata",
  estado: "borrador",
  requiere: {
    "mk.minimalna-plata": "numero",
    "mk.pridonesi": "mapa",
    "mk.prosechna-plata-osnovica": "numero",
    "mk.osnovica-limiti": "mapa",
    "mk.personalen-danok": "numero",
    "mk.licno-osloboduvanje": "mapa",
  },
  campos: [{ id: "chasovi", tipo: "numero", etiqueta: "Часови неделно", min: 1, max: 40, porDefecto: 40 }],
  calcular(e, v, { redondear }) {
    if (e.chasovi <= 0) throw new ErrorEntrada("Внесете часови поголеми од нула.", "chasovi");
    const bruto = (v["mk.minimalna-plata"] * e.chasovi) / 40;
    const p = presmetajPlata(bruto, {
      pridonesi: v["mk.pridonesi"],
      prosechna: v["mk.prosechna-plata-osnovica"],
      limiti: v["mk.osnovica-limiti"],
      danok: v["mk.personalen-danok"],
      oslobuduvanje: enMapa(v["mk.licno-osloboduvanje"], "mesechno"),
    });
    return { bruto: redondear(bruto), neto: redondear(p.neto) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Минимална бруто-плата", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Минимална нето-плата", formato: "moneda" },
  ],
});
