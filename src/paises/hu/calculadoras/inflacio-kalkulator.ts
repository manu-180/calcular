import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { arvaltozas, honapEv } from "../lib/inflacio";
import series from "../series.json";

const CPI = (series.series.find((s) => s.id === "hu.cpi")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "hu.inflacio-kalkulator",
  mercado: "hu",
  concepto: "inflacion",
  slug: "inflacio-kalkulator",
  estado: "publicado",
  requiere: { "hu.cpi": "serie" },
  campos: [
    { id: "osszeg", tipo: "moneda", etiqueta: "Összeg", min: 0, porDefecto: 100000 },
    { id: "tol", tipo: "fecha", etiqueta: "Melyik hónapból való az összeg?", min: "2016-12-01", porDefecto: "2020-01-01", ayuda: "Csak a hónap számít, a nap nem." },
    { id: "ig", tipo: "fecha", etiqueta: "Melyik hónapra számolod át?", min: "2016-12-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.osszeg <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb összeget.", "osszeg");
    const z = arvaltozas(CPI, v["hu.cpi"], e.tol, e.ig, { tol: "tol", ig: "ig" });
    return {
      mai: redondear(e.osszeg * z.szorzo),
      kulonbseg: redondear(e.osszeg * z.szorzo - e.osszeg),
      ertek: redondear(e.osszeg / z.szorzo),
      osszes: z.osszes,
      tolHonap: honapEv(z.tol),
      igHonap: honapEv(z.ig),
      observaciones: z.megjegyzesek,
    };
  },
  resultado: [
    { clave: "mai", etiqueta: "Ugyanekkora vásárlóerő", formato: "moneda", destacada: true },
    { clave: "kulonbseg", etiqueta: "Ennyivel több az infláció miatt", formato: "moneda" },
    { clave: "ertek", etiqueta: "Az összeg értéke a kezdő hónap áraiban", formato: "moneda" },
    { clave: "osszes", etiqueta: "Infláció a teljes időszakban", formato: "porcentaje", decimales: 1 },
    { clave: "tolHonap", etiqueta: "Kezdő hónap", formato: "texto" },
    { clave: "igHonap", etiqueta: "Záró hónap", formato: "texto" },
  ],
});
