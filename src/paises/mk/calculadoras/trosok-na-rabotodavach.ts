import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { presmetajPlata } from "../lib/plata";

export default definirCalculadora({
  id: "mk.trosok-na-rabotodavach",
  mercado: "mk",
  concepto: "costo-empleador",
  slug: "trosok-na-rabotodavach",
  estado: "publicado",
  requiere: {
    "mk.pridonesi": "mapa",
    "mk.prosechna-plata-osnovica": "numero",
    "mk.osnovica-limiti": "mapa",
    "mk.personalen-danok": "numero",
    "mk.licno-osloboduvanje": "mapa",
    "mk.boleduvanje-na-tovar": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Месечна бруто-плата", min: 0, porDefecto: 60000 },
    { id: "ishrana", tipo: "moneda", etiqueta: "Исхрана месечно (ако ја плаќа работодавачот)", min: 0, porDefecto: 0 },
    { id: "prevoz", tipo: "moneda", etiqueta: "Превоз месечно (ако го плаќа работодавачот)", min: 0, porDefecto: 0 },
    { id: "regres", tipo: "moneda", etiqueta: "Регрес за годишен одмор, годишно", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Внесете бруто-плата поголема од нула.", "bruto");
    const p = presmetajPlata(e.bruto, {
      pridonesi: v["mk.pridonesi"],
      prosechna: v["mk.prosechna-plata-osnovica"],
      limiti: v["mk.osnovica-limiti"],
      danok: v["mk.personalen-danok"],
      oslobuduvanje: enMapa(v["mk.licno-osloboduvanje"], "mesechno"),
    });
    const mesechno = e.bruto + e.ishrana + e.prevoz + e.regres / 12;
    return {
      mesechno: redondear(mesechno),
      godishno: redondear(mesechno * 12),
      neto: redondear(p.neto),
      pridonesi: redondear(p.pridonesi),
      danok: redondear(p.danok),
    };
  },
  resultado: [
    { clave: "mesechno", etiqueta: "Месечен трошок за работодавачот", formato: "moneda", destacada: true },
    { clave: "godishno", etiqueta: "Годишен трошок", formato: "moneda" },
    { clave: "neto", etiqueta: "Нето-плата за работникот", formato: "moneda" },
    { clave: "pridonesi", etiqueta: "Придонеси што ги уплатува работодавачот", formato: "moneda" },
    { clave: "danok", etiqueta: "Данок на доход што го уплатува работодавачот", formato: "moneda" },
  ],
});
