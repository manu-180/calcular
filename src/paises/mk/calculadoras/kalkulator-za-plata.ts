import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { presmetajPlata, vkupnaStapka } from "../lib/plata";

export default definirCalculadora({
  id: "mk.kalkulator-za-plata",
  mercado: "mk",
  concepto: "sueldo-neto",
  slug: "kalkulator-za-plata",
  estado: "publicado",
  requiere: {
    "mk.pridonesi": "mapa",
    "mk.prosechna-plata-osnovica": "numero",
    "mk.osnovica-limiti": "mapa",
    "mk.personalen-danok": "numero",
    "mk.licno-osloboduvanje": "mapa",
  },
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Месечна бруто-плата", min: 0, porDefecto: 60000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Внесете бруто-плата поголема од нула.", "bruto");
    const pr = v["mk.pridonesi"];
    const p = presmetajPlata(e.bruto, {
      pridonesi: pr,
      prosechna: v["mk.prosechna-plata-osnovica"],
      limiti: v["mk.osnovica-limiti"],
      danok: v["mk.personalen-danok"],
      oslobuduvanje: enMapa(v["mk.licno-osloboduvanje"], "mesechno"),
    });
    const udel = (k: string) => redondear((p.pridonesi * enMapa(pr, k)) / vkupnaStapka(pr));
    const observaciones: string[] = [];
    if (p.podNajniska) observaciones.push("Бруто-платата е под најниската основица, затоа придонесите се пресметани на најниската основица.");
    if (p.nadNajvisoka) observaciones.push("Над највисоката основица не се плаќаат придонеси, но се плаќа данок на доход.");
    return {
      neto: redondear(p.neto),
      pio: udel("pio"),
      zdravstvo: udel("zdravstvo"),
      dopolnitelen: udel("dopolnitelen"),
      nevrabotenost: udel("nevrabotenost"),
      pridonesi: redondear(p.pridonesi),
      danok: redondear(p.danok),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Нето-плата", formato: "moneda", destacada: true },
    { clave: "pridonesi", etiqueta: "Придонеси вкупно", formato: "moneda" },
    { clave: "pio", etiqueta: "Пензиско и инвалидско осигурување", formato: "moneda" },
    { clave: "zdravstvo", etiqueta: "Здравствено осигурување", formato: "moneda" },
    { clave: "dopolnitelen", etiqueta: "Дополнителен придонес за здравство", formato: "moneda" },
    { clave: "nevrabotenost", etiqueta: "Осигурување во случај на невработеност", formato: "moneda" },
    { clave: "danok", etiqueta: "Персонален данок на доход", formato: "moneda" },
  ],
});
