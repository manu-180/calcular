import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_PRIREZ } from "../lib/zarada";

export default definirCalculadora({
  id: "me.porez-za-preduzetnike",
  mercado: "me",
  concepto: "regimen-simplificado",
  slug: "porez-za-preduzetnike",
  estado: "publicado",
  requiere: {
    "me.porez-samostalna": "escala",
    "me.pio-preduzetnik": "numero",
    "me.nezaposlenost-preduzetnik": "numero",
    "me.preduzetnik-prag-niski": "numero",
    "me.preduzetnik-prag-visi": "numero",
    "me.preduzetnik-osnovica-niska": "numero",
    "me.preduzetnik-osnovica-srednja": "numero",
    "me.preduzetnik-osnovica-visoka": "numero",
    "me.prosjecna-bruto-2025": "numero",
    "me.pausal-limit": "numero",
    "me.pdv-limit": "numero",
  },
  campos: [
    { id: "promet", tipo: "moneda", etiqueta: "Godišnji promet", min: 0, porDefecto: 20000 },
    { id: "dohodak", tipo: "moneda", etiqueta: "Oporezivi dohodak za godinu", ayuda: "Promet minus priznati rashodi, onako kako ide u poresku prijavu.", min: 0, porDefecto: 15000 },
    CAMPO_PRIREZ,
  ],
  calcular(e, v, { redondear }) {
    if (e.promet <= 0) throw new ErrorEntrada("Unesite promet veći od nule.", "promet");
    if (e.dohodak > e.promet) throw new ErrorEntrada("Dohodak ne može biti veći od prometa.", "dohodak");
    const dio = e.promet <= v["me.preduzetnik-prag-niski"] ? v["me.preduzetnik-osnovica-niska"] : e.promet <= v["me.preduzetnik-prag-visi"] ? v["me.preduzetnik-osnovica-srednja"] : v["me.preduzetnik-osnovica-visoka"];
    const osnovica = redondear((v["me.prosjecna-bruto-2025"] * dio) / 100);
    const stopa = v["me.pio-preduzetnik"] + v["me.nezaposlenost-preduzetnik"];
    const doprinosMjesecno = redondear((osnovica * stopa) / 100);
    const doprinosi = redondear(doprinosMjesecno * 12);
    const porez = redondear(aplicarEscalaMarginal(v["me.porez-samostalna"], e.dohodak));
    const prirez = redondear((porez * e.prirez) / 100);
    const observaciones: string[] = [];
    if (e.promet <= v["me.pausal-limit"]) observaciones.push("Sa ovim prometom možete tražiti paušalni porez (Zakon o porezu na dohodak, čl. 49). Ovaj obračun važi za oporezivanje po stvarnom dohotku.");
    return { ostaje: redondear(e.dohodak - porez - prirez - doprinosi), porez, prirez, osnovica, doprinosMjesecno, doprinosi, ukupno: redondear(porez + prirez + doprinosi), observaciones };
  },
  resultado: [
    { clave: "ostaje", etiqueta: "Ostaje poslije poreza i doprinosa", formato: "moneda", destacada: true },
    { clave: "porez", etiqueta: "Porez na dohodak za godinu", formato: "moneda" },
    { clave: "prirez", etiqueta: "Prirez", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Mjesečna osnovica doprinosa", formato: "moneda" },
    { clave: "doprinosMjesecno", etiqueta: "Doprinosi mjesečno", formato: "moneda" },
    { clave: "doprinosi", etiqueta: "Doprinosi za godinu", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Sve obaveze za godinu", formato: "moneda" },
  ],
});
