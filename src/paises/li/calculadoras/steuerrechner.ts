import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { escalaFuer, pruefeZuschlag, REQ_STEUER, steuer, TARIFE, type Tarif } from "../lib/steuer";

export default definirCalculadora({
  id: "li.steuerrechner",
  mercado: "li",
  concepto: "impuesto-renta",
  slug: "steuerrechner",
  estado: "publicado",
  requiere: REQ_STEUER,
  campos: [
    { id: "erwerb", tipo: "moneda", etiqueta: "Steuerpflichtiger Erwerb pro Jahr", min: 0, porDefecto: 80000, ayuda: "Erwerb nach allen Abzügen, einschliesslich des in Erwerb umgerechneten Vermögens." },
    { id: "tarif", tipo: "opcion", etiqueta: "Tarif", opciones: TARIFE, porDefecto: "alleinstehend" },
    { id: "zuschlag", tipo: "porcentaje", etiqueta: "Gemeindezuschlag Ihrer Wohngemeinde", min: 150, max: 250, porDefecto: 150, ayuda: "Der Gemeinderat legt ihn jedes Jahr zwischen 150 und 250 % fest." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.erwerb < 0) throw new ErrorEntrada("Der Erwerb kann nicht negativ sein.", "erwerb");
    pruefeZuschlag(entrada.zuschlag, valores["li.gemeindezuschlag"]);
    const s = steuer(entrada.erwerb, escalaFuer(entrada.tarif as Tarif, valores), entrada.zuschlag, redondear);
    return {
      total: s.total,
      landessteuer: s.landessteuer,
      gemeindesteuer: s.gemeindesteuer,
      durchschnitt: s.erwerb > 0 ? (s.total / s.erwerb) * 100 : 0,
      grenzsatz: s.grenzsatz,
      erwerb: s.erwerb,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Landes- und Gemeindesteuer pro Jahr", formato: "moneda", destacada: true },
    { clave: "landessteuer", etiqueta: "Landessteuer", formato: "moneda" },
    { clave: "gemeindesteuer", etiqueta: "Gemeindesteuer (Zuschlag)", formato: "moneda" },
    { clave: "durchschnitt", etiqueta: "Durchschnittssteuersatz", formato: "porcentaje", decimales: 2 },
    { clave: "grenzsatz", etiqueta: "Grenzsteuersatz", formato: "porcentaje", decimales: 2 },
    { clave: "erwerb", etiqueta: "Erwerb auf 10 Franken abgerundet", formato: "moneda", decimales: 0 },
  ],
});
