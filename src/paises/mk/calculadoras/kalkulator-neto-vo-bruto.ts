import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { brutoOdNeto, presmetajPlata } from "../lib/plata";

export default definirCalculadora({
  id: "mk.kalkulator-neto-vo-bruto",
  mercado: "mk",
  concepto: "propio",
  slug: "kalkulator-neto-vo-bruto",
  estado: "publicado",
  requiere: {
    "mk.pridonesi": "mapa",
    "mk.prosechna-plata-osnovica": "numero",
    "mk.osnovica-limiti": "mapa",
    "mk.personalen-danok": "numero",
    "mk.licno-osloboduvanje": "mapa",
  },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Месечна нето-плата што ја сакате", min: 0, porDefecto: 40000 }],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Внесете нето-плата поголема од нула.", "neto");
    const s = {
      pridonesi: v["mk.pridonesi"],
      prosechna: v["mk.prosechna-plata-osnovica"],
      limiti: v["mk.osnovica-limiti"],
      danok: v["mk.personalen-danok"],
      oslobuduvanje: enMapa(v["mk.licno-osloboduvanje"], "mesechno"),
    };
    const bruto = brutoOdNeto(e.neto, s);
    const p = presmetajPlata(bruto, s);
    return { bruto: redondear(bruto), pridonesi: redondear(p.pridonesi), danok: redondear(p.danok) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Потребна бруто-плата", formato: "moneda", destacada: true },
    { clave: "pridonesi", etiqueta: "Придонеси", formato: "moneda" },
    { clave: "danok", etiqueta: "Персонален данок на доход", formato: "moneda" },
  ],
});
