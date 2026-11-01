import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_REGION } from "../lib/plata";

export default definirCalculadora({
  id: "ba.topli-obrok-i-regres",
  mercado: "ba",
  concepto: "propio",
  slug: "topli-obrok-i-regres",
  estado: "publicado",
  requiere: { "ba.topli-obrok-rs": "numero", "ba.prosjecna-neto-rs-2025": "numero", "ba.topli-obrok-fbih": "numero", "ba.regres-fbih": "numero", "ba.prosjecna-neto-fbih": "numero", "ba.prosjecna-neto-fbih-3m": "numero" },
  campos: [
    CAMPO_REGION,
    { id: "dani", tipo: "entero", etiqueta: "Radni dani u mjesecu", min: 1, max: 31, porDefecto: 22 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dani <= 0) throw new ErrorEntrada("Unesite broj radnih dana.", "dani");
    const dnevni = e.region === "rs" ? redondear((v["ba.prosjecna-neto-rs-2025"] * v["ba.topli-obrok-rs"]) / 100) : redondear((v["ba.prosjecna-neto-fbih"] * v["ba.topli-obrok-fbih"]) / 100);
    return {
      mjesecni: redondear(dnevni * e.dani),
      dnevni,
      regres: e.region === "fbih" ? redondear((v["ba.prosjecna-neto-fbih-3m"] * v["ba.regres-fbih"]) / 100) : null,
      observaciones: e.region === "rs" ? ["U RS je topli obrok obaveza poslodavca, ako ishrana nije organizovana. Visinu regresa određuje kolektivni ugovor."] : ["U FBiH je ovo najviši neoporezivi iznos po Pravilniku. Pravo i stvarni iznos određuju kolektivni ugovor i pravilnik o radu."],
    };
  },
  resultado: [
    { clave: "mjesecni", etiqueta: "Topli obrok za mjesec", formato: "moneda", destacada: true },
    { clave: "dnevni", etiqueta: "Topli obrok po radnom danu", formato: "moneda" },
    { clave: "regres", etiqueta: "Najviši neoporezivi regres", formato: "moneda" },
  ],
});
