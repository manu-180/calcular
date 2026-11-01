import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { mesicRok, zmenaCen } from "../lib/inflace";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "cz.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "cz.inflacni-kalkulacka",
  mercado: "cz",
  concepto: "inflacion",
  slug: "inflacni-kalkulacka",
  estado: "publicado",
  requiere: { "cz.cpi": "serie" },
  campos: [
    { id: "castka", tipo: "moneda", etiqueta: "Částka", min: 0, porDefecto: 10000 },
    { id: "od", tipo: "fecha", etiqueta: "Měsíc, ze kterého částka pochází", min: "2015-01-01", porDefecto: "2020-01-01", ayuda: "Počítá se s cenovým indexem za celý měsíc, na dni nezáleží." },
    { id: "do", tipo: "fecha", etiqueta: "Měsíc, do kterého přepočítáváte", min: "2015-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.castka <= 0) throw new ErrorEntrada("Zadejte částku vyšší než nula.", "castka");
    const z = zmenaCen(CPI, v["cz.cpi"], e.od, e.do, { od: "od", do: "do" });
    return {
      dnes: redondear(e.castka * z.nasobek),
      rozdil: redondear(e.castka * z.nasobek - e.castka),
      hodnota: redondear(e.castka / z.nasobek),
      celkem: z.celkem,
      mesicOd: mesicRok(z.od),
      mesicDo: mesicRok(z.do),
      observaciones: z.poznamky,
    };
  },
  resultado: [
    { clave: "dnes", etiqueta: "Částka se stejnou kupní silou", formato: "moneda", destacada: true },
    { clave: "rozdil", etiqueta: "O kolik víc kvůli inflaci", formato: "moneda" },
    { clave: "hodnota", etiqueta: "Kolik má částka hodnotu v cenách počátečního měsíce", formato: "moneda" },
    { clave: "celkem", etiqueta: "Inflace za celé období", formato: "porcentaje", decimales: 1 },
    { clave: "mesicOd", etiqueta: "Od", formato: "texto" },
    { clave: "mesicDo", etiqueta: "Do", formato: "texto" },
  ],
});
