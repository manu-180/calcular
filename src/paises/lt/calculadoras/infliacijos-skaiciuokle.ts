import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { kainuPokytis } from "../lib/infliacija";
import series from "../series.json";

const VKI = (series.series.find((s) => s.id === "lt.vki")?.puntos ?? []) as unknown as readonly PuntoSerieTupla[];

export default definirCalculadora({
  id: "lt.infliacijos-skaiciuokle",
  mercado: "lt",
  concepto: "inflacion",
  slug: "infliacijos-skaiciuokle",
  estado: "publicado",
  requiere: { "lt.vki": "serie" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 1000 },
    { id: "nuo", tipo: "fecha", etiqueta: "Mėnuo, iš kurio yra suma", min: "1997-01-01", porDefecto: "2020-01-01", ayuda: "Svarbus tik mėnuo, diena rezultatui įtakos neturi." },
    { id: "iki", tipo: "fecha", etiqueta: "Mėnuo, iki kurio skaičiuojate", min: "1997-01-01", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Įveskite sumą, didesnę už nulį.", "suma");
    const p = kainuPokytis(VKI, v["lt.vki"], e.nuo, e.iki);
    const dabar = redondear(e.suma * p.daugiklis);
    return {
      dabar,
      skirtumas: redondear(dabar - e.suma),
      verte: redondear(e.suma / p.daugiklis),
      pokytis: (p.daugiklis - 1) * 100,
      nuoMenuo: p.nuo,
      ikiMenuo: p.iki,
      observaciones: p.pastabos,
    };
  },
  resultado: [
    { clave: "dabar", etiqueta: "Tokios pačios perkamosios galios suma", formato: "moneda", destacada: true },
    { clave: "skirtumas", etiqueta: "Skirtumas dėl kainų pokyčio", formato: "moneda" },
    { clave: "verte", etiqueta: "Kiek ši suma verta pradžios mėnesio kainomis", formato: "moneda" },
    { clave: "pokytis", etiqueta: "Kainų pokytis per visą laikotarpį", formato: "porcentaje", decimales: 1 },
    { clave: "nuoMenuo", etiqueta: "Pradžios mėnuo", formato: "fecha" },
    { clave: "ikiMenuo", etiqueta: "Pabaigos mėnuo", formato: "fecha" },
  ],
});
