import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { prosjekPolugodista } from "../lib/inflacija";
import series from "../series.json";

const NETO = (series.series.find((s) => s.id === "me.prosjecna-neto")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "me.otpremnina",
  mercado: "me",
  concepto: "indemnizacion-despido",
  slug: "otpremnina",
  estado: "publicado",
  requiere: { "me.otpremnina-staz": "numero", "me.otpremnina-najmanje": "numero", "me.prosjecna-neto": "serie" },
  campos: [
    { id: "zarada", tipo: "moneda", etiqueta: "Vaša prosječna mjesečna neto zarada u prethodnom polugodištu", min: 0, porDefecto: 1000 },
    { id: "mjeseci", tipo: "entero", etiqueta: "Mjeseci rada kod ovog poslodavca", ayuda: "Računa se i rad kod poslodavca prethodnika pri statusnoj promjeni.", min: 0, max: 720, porDefecto: 96 },
    { id: "datum", tipo: "fecha", etiqueta: "Datum obračuna", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarada <= 0) throw new ErrorEntrada("Unesite neto zaradu veću od nule.", "zarada");
    const p = prosjekPolugodista(NETO, v["me.prosjecna-neto"], e.datum);
    const prosjekCG = redondear(p.prosjek);
    const osnov = Math.max(e.zarada, prosjekCG);
    const godine = Math.floor(e.mjeseci / 12);
    const zaGodine = redondear((osnov / 3) * godine);
    const minimum = redondear(osnov * v["me.otpremnina-najmanje"]);
    const imaPravo = e.mjeseci >= v["me.otpremnina-staz"];
    const observaciones: string[] = p.napomena ? [p.napomena] : [];
    if (!imaPravo) observaciones.push("Za otpremninu je potrebno najmanje 18 mjeseci rada kod tog poslodavca.");
    if (e.zarada < prosjekCG) observaciones.push("Prosjek Crne Gore je povoljniji od vaše zarade, pa je on uzet za osnov.");
    return { iznos: imaPravo ? Math.max(zaGodine, minimum) : 0, osnov, prosjekCG, godine, zaGodine, minimum, observaciones };
  },
  resultado: [
    { clave: "iznos", etiqueta: "Najmanja otpremnina", formato: "moneda", destacada: true },
    { clave: "osnov", etiqueta: "Uzeti osnov", formato: "moneda" },
    { clave: "prosjekCG", etiqueta: "Prosječna neto zarada u Crnoj Gori", formato: "moneda" },
    { clave: "godine", etiqueta: "Punih godina rada", formato: "numero", decimales: 0 },
    { clave: "zaGodine", etiqueta: "Trećina osnova po godini", formato: "moneda" },
    { clave: "minimum", etiqueta: "Zakonski najniži iznos", formato: "moneda" },
  ],
});
