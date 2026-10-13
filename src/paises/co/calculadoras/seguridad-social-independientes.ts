import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { filaDe } from "../reglas";

// Clases IV y V: la ARL la paga el contratante (Decreto 1072 de 2015, art. 2.2.4.2.2.13).
const RIESGO_ALTO = new Set(["iv", "v"]);

export default definirCalculadora({
  id: "co.seguridad-social-independientes",
  mercado: "co",
  concepto: "propio",
  slug: "seguridad-social-independientes",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.ibc-independientes": "numero",
    "co.salud-cotizacion": "numero",
    "co.pension-cotizacion": "numero",
    "co.fsp": "escala",
    "co.tope-ibc": "numero",
    "co.arl": "mapa",
  },
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "Valor mensual del contrato o de tus ingresos",
      ayuda: "Sin IVA. Si el contrato es por varios meses, divide el total por el número de meses.",
      min: 0,
    },
    { id: "riesgo", tipo: "opcion-dato", etiqueta: "Clase de riesgo de la ARL", dato: "co.arl", porDefecto: "i" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "ingreso");
    const smmlv = valores["co.smmlv"];
    const base = porcentaje(entrada.ingreso, valores["co.ibc-independientes"]);
    const ibc = redondear(Math.min(Math.max(base, smmlv), valores["co.tope-ibc"] * smmlv));
    const tasaFsp = filaDe(valores["co.fsp"], ibc / smmlv).tasa;
    const salud = redondear(porcentaje(ibc, valores["co.salud-cotizacion"]));
    const pension = redondear(porcentaje(ibc, valores["co.pension-cotizacion"]));
    const fsp = redondear(porcentaje(ibc, tasaFsp));
    const arlTotal = redondear(porcentaje(ibc, enMapa(valores["co.arl"], entrada.riesgo)));
    const altoRiesgo = RIESGO_ALTO.has(entrada.riesgo);
    const arl = altoRiesgo ? 0 : arlTotal;
    const observaciones: string[] = [];
    if (entrada.ingreso < smmlv) observaciones.push("Con ingresos menores a un salario mínimo no aplica la regla del 40 %. Si cotizas, la base mínima es un salario mínimo.");
    else if (base < smmlv) observaciones.push("El 40 % de tus ingresos da menos que un salario mínimo, así que cotizas sobre un salario mínimo.");
    if (altoRiesgo) observaciones.push("En riesgo IV o V la ARL la paga quien te contrata, no tú.");
    return {
      ibc,
      salud,
      pension,
      fsp,
      arl,
      arlContratante: altoRiesgo ? arlTotal : 0,
      total: salud + pension + fsp + arl,
      observaciones,
    };
  },
  resultado: [
    { clave: "ibc", etiqueta: "Base de cotización (IBC)", formato: "moneda", decimales: 0 },
    { clave: "salud", etiqueta: "Salud", formato: "moneda", decimales: 0 },
    { clave: "pension", etiqueta: "Pensión", formato: "moneda", decimales: 0 },
    { clave: "fsp", etiqueta: "Fondo de Solidaridad Pensional", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "arl", etiqueta: "ARL", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "arlContratante", etiqueta: "ARL que paga el contratante", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a pagar en la planilla (PILA)", formato: "moneda", decimales: 0, destacada: true },
  ],
});
