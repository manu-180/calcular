import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";
import { najniskaOsnovica, najvisokaOsnovica, vkupnaStapka } from "../lib/plata";

export default definirCalculadora({
  id: "mk.kalkulator-za-pridonesi",
  mercado: "mk",
  concepto: "aportes-seguridad-social",
  slug: "kalkulator-za-pridonesi",
  estado: "publicado",
  requiere: {
    "mk.pridonesi": "mapa",
    "mk.prosechna-plata-osnovica": "numero",
    "mk.osnovica-limiti": "mapa",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Месечна бруто-плата или основица", min: 0, porDefecto: 60000 },
    {
      id: "vid",
      tipo: "opcion",
      etiqueta: "Вид на осигуреник",
      porDefecto: "rabotnik",
      opciones: [
        { valor: "rabotnik", etiqueta: "Вработен" },
        { valor: "samovraboten", etiqueta: "Самовработен" },
        { valor: "intelektualna", etiqueta: "Самовработен со професионална или интелектуална услуга" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Внесете износ поголем од нула.", "bruto");
    const s = { prosechna: v["mk.prosechna-plata-osnovica"], limiti: v["mk.osnovica-limiti"] };
    const najniska = e.vid === "intelektualna" ? s.prosechna : najniskaOsnovica(s);
    const najvisoka = najvisokaOsnovica(s, e.vid !== "rabotnik");
    const osnovica = Math.min(Math.max(e.bruto, najniska), najvisoka);
    const pr = v["mk.pridonesi"];
    return {
      vkupno: redondear(porcentaje(osnovica, vkupnaStapka(pr))),
      osnovica: redondear(osnovica),
      pio: redondear(porcentaje(osnovica, enMapa(pr, "pio"))),
      zdravstvo: redondear(porcentaje(osnovica, enMapa(pr, "zdravstvo"))),
      dopolnitelen: redondear(porcentaje(osnovica, enMapa(pr, "dopolnitelen"))),
      nevrabotenost: redondear(porcentaje(osnovica, enMapa(pr, "nevrabotenost"))),
      najniska: redondear(najniska),
      najvisoka: redondear(najvisoka),
    };
  },
  resultado: [
    { clave: "vkupno", etiqueta: "Придонеси вкупно", formato: "moneda", destacada: true },
    { clave: "osnovica", etiqueta: "Основица за пресметка", formato: "moneda" },
    { clave: "pio", etiqueta: "Пензиско и инвалидско осигурување", formato: "moneda" },
    { clave: "zdravstvo", etiqueta: "Здравствено осигурување", formato: "moneda" },
    { clave: "dopolnitelen", etiqueta: "Дополнителен придонес за здравство", formato: "moneda" },
    { clave: "nevrabotenost", etiqueta: "Осигурување во случај на невработеност", formato: "moneda" },
    { clave: "najniska", etiqueta: "Најниска основица", formato: "moneda" },
    { clave: "najvisoka", etiqueta: "Највисока основица", formato: "moneda" },
  ],
});
