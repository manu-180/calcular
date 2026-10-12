import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { DIAS_PERIODO } from "../nomina";

export default definirCalculadora({
  id: "mx.aportacion-infonavit",
  mercado: "mx",
  concepto: "propio",
  slug: "aportacion-infonavit",
  estado: "publicado",
  requiere: {
    "mx.aportacion-vivienda": "numero",
    "mx.tope-sbc-imss": "numero",
    "mx.uma-diaria": "numero",
  },
  campos: [
    { id: "sbc", tipo: "moneda", etiqueta: "Salario base de cotización diario", min: 0, ayuda: "Viene en tu recibo de nómina como SBC o SDI." },
    { id: "dias", tipo: "entero", etiqueta: "Días del bimestre", min: 1, max: 62, porDefecto: 61 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tope = redondear(valores["mx.tope-sbc-imss"] * valores["mx.uma-diaria"]);
    const sbc = Math.min(entrada.sbc, tope);
    const diaria = porcentaje(sbc, valores["mx.aportacion-vivienda"]);
    return {
      sbc,
      bimestral: redondear(diaria * entrada.dias),
      mensual: redondear(diaria * DIAS_PERIODO.mensual),
      anual: redondear(diaria * 365),
      observaciones: ["La paga tu empresa: no se descuenta de tu sueldo. Se deposita en la subcuenta de vivienda de tu Afore."],
    };
  },
  resultado: [
    { clave: "sbc", etiqueta: "Salario que se usa (con tope)", formato: "moneda" },
    { clave: "bimestral", etiqueta: "Aportación del bimestre", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Promedio por mes", formato: "moneda" },
    { clave: "anual", etiqueta: "Al año", formato: "moneda" },
  ],
});
