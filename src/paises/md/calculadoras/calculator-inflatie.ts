import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { lunaAn, variatiePreturi } from "../lib/inflatie";
import series from "../series.json";

const IPC = (series.series.find((s) => s.id === "md.ipc")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "md.calculator-inflatie",
  mercado: "md",
  concepto: "inflacion",
  slug: "calculator-inflatie",
  estado: "publicado",
  requiere: { "md.ipc": "serie" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 1000 },
    { id: "de", tipo: "fecha", etiqueta: "Luna din care este suma", min: "2000-01-01", porDefecto: "2020-01-01", ayuda: "Contează doar luna; ziua nu schimbă rezultatul." },
    { id: "pana", tipo: "fecha", etiqueta: "Luna la care actualizați suma", min: "2000-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Introduceți o sumă mai mare decât zero.", "suma");
    const x = variatiePreturi(IPC, v["md.ipc"], e.de, e.pana, { de: "de", pana: "pana" });
    return {
      actualizata: redondear(e.suma * x.factor),
      diferenta: redondear(e.suma * x.factor - e.suma),
      putere: redondear(e.suma / x.factor),
      inflatie: x.totala,
      lunaDe: lunaAn(x.de),
      lunaPana: lunaAn(x.pana),
      observaciones: x.note,
    };
  },
  resultado: [
    { clave: "actualizata", etiqueta: "Suma cu aceeași putere de cumpărare", formato: "moneda", destacada: true },
    { clave: "diferenta", etiqueta: "În plus din cauza inflației", formato: "moneda" },
    { clave: "putere", etiqueta: "Cât valorează suma în prețurile lunii de pornire", formato: "moneda" },
    { clave: "inflatie", etiqueta: "Inflația în toată perioada", formato: "porcentaje", decimales: 1 },
    { clave: "lunaDe", etiqueta: "De la", formato: "texto" },
    { clave: "lunaPana", etiqueta: "Până la", formato: "texto" },
  ],
});
