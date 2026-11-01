import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { presmetajPlata } from "../lib/plata";

export default definirCalculadora({
  id: "mk.kalkulator-za-personalen-danok",
  mercado: "mk",
  concepto: "impuesto-renta",
  slug: "kalkulator-za-personalen-danok",
  estado: "publicado",
  requiere: {
    "mk.pridonesi": "mapa",
    "mk.prosechna-plata-osnovica": "numero",
    "mk.osnovica-limiti": "mapa",
    "mk.personalen-danok": "numero",
    "mk.licno-osloboduvanje": "mapa",
  },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Месечна бруто-плата", min: 0, porDefecto: 60000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Внесете бруто-плата поголема од нула.", "bruto");
    const oslobuduvanje = enMapa(v["mk.licno-osloboduvanje"], "mesechno");
    const p = presmetajPlata(e.bruto, {
      pridonesi: v["mk.pridonesi"],
      prosechna: v["mk.prosechna-plata-osnovica"],
      limiti: v["mk.osnovica-limiti"],
      danok: v["mk.personalen-danok"],
      oslobuduvanje,
    });
    return {
      danok: redondear(p.danok),
      godishno: redondear(p.danok * 12),
      osnovica: redondear(p.danochnaOsnovica),
      oslobuduvanje,
      efektivna: Math.round((p.danok / e.bruto) * 1000) / 10,
    };
  },
  resultado: [
    { clave: "danok", etiqueta: "Данок на доход месечно", formato: "moneda", destacada: true },
    { clave: "godishno", etiqueta: "Данок за 12 месеци", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Даночна основица", formato: "moneda" },
    { clave: "oslobuduvanje", etiqueta: "Лично ослободување", formato: "moneda" },
    { clave: "efektivna", etiqueta: "Ефективна стапка на бруто-платата", formato: "porcentaje", decimales: 1 },
  ],
});
