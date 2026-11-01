import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.izvanreden-trud",
  mercado: "bg",
  concepto: "horas-extra",
  slug: "izvanreden-trud",
  estado: "publicado",
  requiere: { "bg.izvanreden-trud": "mapa" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Брутна месечна заплата", min: 0, porDefecto: 1500 },
    { id: "chasoveMesets", tipo: "entero", etiqueta: "Работни часове по график в месеца", min: 1, max: 250, porDefecto: 168 },
    { id: "vid", tipo: "opcion-dato", etiqueta: "Кога е положен трудът", dato: "bg.izvanreden-trud", porDefecto: "raboten" },
    { id: "chasove", tipo: "numero", etiqueta: "Извънредни часове", min: 0, max: 300, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете брутна заплата над нула.", "bruto");
    const chas = e.bruto / e.chasoveMesets;
    const uvelichenie = enMapa(v["bg.izvanreden-trud"], e.vid);
    return { obshto: redondear(chas * (1 + uvelichenie / 100) * e.chasove), chasStavka: redondear(chas), uvelichenie };
  },
  resultado: [
    { clave: "obshto", etiqueta: "Заплащане за извънредния труд (бруто)", formato: "moneda", destacada: true },
    { clave: "chasStavka", etiqueta: "Нормална часова ставка", formato: "moneda" },
    { clave: "uvelichenie", etiqueta: "Минимално увеличение", formato: "porcentaje" },
  ],
});
