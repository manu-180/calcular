import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.moj-ddv-povrat",
  mercado: "mk",
  concepto: "propio",
  slug: "moj-ddv-povrat",
  estado: "publicado",
  requiere: { "mk.ddv": "mapa", "mk.moj-ddv": "mapa" },
  campos: [
    { id: "smetka", tipo: "moneda", etiqueta: "Сметка со ДДВ", min: 0, porDefecto: 5000 },
    { id: "stapka", tipo: "opcion-dato", etiqueta: "Стапка на ДДВ на сметката", dato: "mk.ddv", porDefecto: "opshta" },
    { id: "vid", tipo: "opcion-dato", etiqueta: "Вид на добра и услуги", dato: "mk.moj-ddv", porDefecto: "makedonski" },
  ],
  calcular(e, v, { redondear }) {
    if (e.smetka <= 0) throw new ErrorEntrada("Внесете сметка поголема од нула.", "smetka");
    const s = enMapa(v["mk.ddv"], e.stapka);
    const ddv = e.smetka - e.smetka / (1 + s / 100);
    return { povrat: redondear(porcentaje(ddv, enMapa(v["mk.moj-ddv"], e.vid))), ddv: redondear(ddv) };
  },
  resultado: [
    { clave: "povrat", etiqueta: "Поврат на ДДВ", formato: "moneda", destacada: true },
    { clave: "ddv", etiqueta: "ДДВ во сметката", formato: "moneda" },
  ],
});
