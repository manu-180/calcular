import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import datos from "../datos.json";

const IDS = { negocio: "us.mileage-business", medico: "us.mileage-medical", caridad: "us.mileage-charity" } as const;

// La tarifa depende del día del viaje, no del día en que se usa la calculadora: en 2026 el IRS la
// cambió el 1 de julio. Por eso se busca el tramo verificado de esa fecha en datos.json.
function tarifaDelDia(id: string, fecha: string): number | null {
  const dato = datos.datos.find((d) => d.id === id);
  for (const t of dato?.tramos ?? []) {
    const hasta = "hasta" in t ? t.hasta : undefined;
    if (t.estado === "verificado" && t.desde <= fecha && (hasta === undefined || fecha <= hasta) && typeof t.valor === "number") return t.valor;
  }
  return null;
}

export default definirCalculadora({
  id: "us.mileage-reimbursement",
  mercado: "us",
  concepto: "propio",
  slug: "mileage-reimbursement",
  estado: "publicado",
  requiere: {
    "us.mileage-business": "numero",
    "us.mileage-medical": "numero",
    "us.mileage-charity": "numero",
  },
  campos: [
    { id: "millas", tipo: "numero", etiqueta: "Miles driven", min: 0, porDefecto: 100 },
    {
      id: "uso",
      tipo: "opcion",
      etiqueta: "Purpose of the trips",
      opciones: [
        { valor: "negocio", etiqueta: "Business" },
        { valor: "medico", etiqueta: "Medical or military moving" },
        { valor: "caridad", etiqueta: "Charity" },
      ],
      porDefecto: "negocio",
    },
    { id: "fecha", tipo: "fecha", etiqueta: "Date of the trips", min: "2026-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (!(entrada.uso in IDS)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const tarifa = tarifaDelDia(IDS[entrada.uso], entrada.fecha);
    if (tarifa === null) throw new ErrorEntrada("We only have the IRS rates for trips from January 1, 2026 to the end of the current rate period.", "fecha");
    return {
      tarifa,
      total: redondear(entrada.millas * tarifa),
      observaciones:
        entrada.uso === "negocio"
          ? ["Under an employer's accountable plan, reimbursements up to this rate aren't taxed as wages. Self-employed people can deduct it instead of actual car costs."]
          : ["Medical and charity miles only help if you itemize deductions."],
    };
  },
  resultado: [
    { clave: "tarifa", etiqueta: "IRS rate per mile", formato: "moneda", decimales: 3 },
    { clave: "total", etiqueta: "Mileage amount", formato: "moneda", destacada: true },
  ],
});
