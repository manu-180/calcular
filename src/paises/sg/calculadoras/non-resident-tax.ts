import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dolares, impuestoResidente } from "../lib/impuestos";

export default definirCalculadora({
  id: "sg.non-resident-tax",
  mercado: "sg",
  concepto: "propio",
  slug: "non-resident-tax",
  estado: "publicado",
  requiere: {
    "sg.renta-residentes": "escala",
    "sg.no-residente-empleo": "numero",
    "sg.no-residente-otros": "numero",
  },
  campos: [
    { id: "empleo", tipo: "moneda", etiqueta: "Employment income earned in Singapore", min: 0, porDefecto: 60000 },
    { id: "otros", tipo: "moneda", etiqueta: "Director's fees, rental and other income", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.empleo + entrada.otros <= 0) throw new ErrorEntrada("Enter at least one amount of income.", "empleo");
    const plano = redondear((entrada.empleo * v["sg.no-residente-empleo"]) / 100);
    const progresivo = redondear(impuestoResidente(entrada.empleo, v["sg.renta-residentes"]));
    const sobreEmpleo = Math.max(plano, progresivo);
    const sobreOtros = redondear((entrada.otros * v["sg.no-residente-otros"]) / 100);
    const total = redondear(sobreEmpleo + sobreOtros);
    const observaciones: string[] = [];
    if (entrada.empleo > 0) {
      observaciones.push(
        progresivo > plano
          ? `The resident rates give more tax (${dolares(progresivo)}) than the flat ${v["sg.no-residente-empleo"]}% (${dolares(plano)}), so the higher amount applies.`
          : `The flat ${v["sg.no-residente-empleo"]}% (${dolares(plano)}) gives more tax than the resident rates (${dolares(progresivo)}), so the flat rate applies.`,
      );
    }
    observaciones.push("Only tax residents can claim personal reliefs, so none are taken off here.");
    return {
      total,
      sobreEmpleo,
      plano,
      progresivo,
      sobreOtros,
      efectiva: (total / (entrada.empleo + entrada.otros)) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Tax payable as a non-resident", formato: "moneda", destacada: true },
    { clave: "sobreEmpleo", etiqueta: "Tax on employment income", formato: "moneda" },
    { clave: "plano", etiqueta: "Flat rate result", formato: "moneda" },
    { clave: "progresivo", etiqueta: "Resident rates result", formato: "moneda" },
    { clave: "sobreOtros", etiqueta: "Tax on other income", formato: "moneda", ocultarSiCero: true },
    { clave: "efectiva", etiqueta: "Share of your income", formato: "porcentaje", decimales: 2 },
  ],
});
