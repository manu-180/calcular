import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_PRIREZ, obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "me.kalkulator-plate",
  mercado: "me",
  concepto: "sueldo-neto",
  slug: "kalkulator-plate",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto zarada", min: 0, porDefecto: 1200 },
    CAMPO_PRIREZ,
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, parametri(v), e.prirez, redondear);
    const observaciones: string[] = [];
    if (e.bruto > 5000) observaciones.push("Zakon predviđa najvišu godišnju osnovicu za PIO. Njen iznos za ovu godinu nismo mogli provjeriti, pa obračun nema gornju granicu.");
    return {
      neto: o.neto,
      pio: o.pio,
      nezaposlenost: o.nezaposlenost,
      doprinosi: o.doprinosi,
      porez: o.porez,
      prirez: o.prirez,
      netoGodisnje: redondear(o.neto * 12),
      trosakPoslodavca: o.trosakPoslodavca,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Neto zarada mjesečno", formato: "moneda", destacada: true },
    { clave: "pio", etiqueta: "Doprinos za PIO", formato: "moneda" },
    { clave: "nezaposlenost", etiqueta: "Doprinos za nezaposlenost", formato: "moneda" },
    { clave: "doprinosi", etiqueta: "Doprinosi iz zarade ukupno", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na dohodak", formato: "moneda" },
    { clave: "prirez", etiqueta: "Prirez", formato: "moneda" },
    { clave: "netoGodisnje", etiqueta: "Neto zarada za godinu", formato: "moneda" },
    { clave: "trosakPoslodavca", etiqueta: "Mjesečni trošak poslodavca", formato: "moneda" },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { prirez: 13 } },
});
