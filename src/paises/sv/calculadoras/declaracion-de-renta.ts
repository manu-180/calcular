import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { retencionPorTabla } from "../lib/renta";
import { dinero } from "../lib/texto";

const MESES = 12;

export default definirCalculadora({
  id: "sv.declaracion-de-renta",
  mercado: "sv",
  concepto: "propio",
  slug: "declaracion-de-renta",
  estado: "publicado",
  requiere: {
    "sv.renta-anual": "escala",
    "sv.afp-trabajador": "numero",
    "sv.isss-trabajador": "numero",
    "sv.isss-salario-maximo": "numero",
    "sv.deduccion-fija-renta": "numero",
    "sv.limite-deduccion-fija-renta": "numero",
    "sv.renta-declaracion-obligatoria": "numero",
  },
  campos: [
    {
      id: "salarios",
      tipo: "moneda",
      etiqueta: "Salarios gravados del año",
      ayuda: "Todo lo que ganó en el año, sin el aguinaldo libre de renta ni la Quincena 25. Está en su constancia de retención.",
      min: 0,
    },
    {
      id: "cotizaciones",
      tipo: "moneda",
      etiqueta: "AFP e ISSS que le descontaron en el año",
      ayuda: "Si lo deja vacío, lo estimamos con las tasas de ley.",
      min: 0,
      requerido: false,
    },
    {
      id: "otrasDeducciones",
      tipo: "moneda",
      etiqueta: "Gastos médicos y de colegiatura comprobados",
      ayuda: "Solo cuentan si ganó más del límite de la deducción fija.",
      min: 0,
      porDefecto: 0,
    },
    { id: "retenido", tipo: "moneda", etiqueta: "Renta que le retuvieron en el año", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const estimadas =
      porcentaje(entrada.salarios, valores["sv.afp-trabajador"]) +
      porcentaje(Math.min(entrada.salarios, valores["sv.isss-salario-maximo"] * MESES), valores["sv.isss-trabajador"]);
    const cotizaciones = redondear(entrada.cotizaciones ?? estimadas);
    const conDeduccionFija = entrada.salarios <= valores["sv.limite-deduccion-fija-renta"];
    const deducciones = redondear(conDeduccionFija ? valores["sv.deduccion-fija-renta"] : entrada.otrasDeducciones);
    const imponible = redondear(Math.max(0, entrada.salarios - cotizaciones - deducciones));
    const impuesto = redondear(retencionPorTabla(valores["sv.renta-anual"], imponible).retencion);
    const diferencia = redondear(impuesto - entrada.retenido);
    const observaciones: string[] = [];
    if (entrada.cotizaciones === null) observaciones.push("Las cotizaciones son una estimación. Use las de su constancia para un resultado exacto.");
    if (conDeduccionFija) observaciones.push(`Con salarios de hasta ${dinero(valores["sv.limite-deduccion-fija-renta"])} se resta una deducción fija de ${dinero(valores["sv.deduccion-fija-renta"])} sin comprobantes.`);
    if (entrada.salarios > valores["sv.renta-declaracion-obligatoria"]) observaciones.push(`Con salarios de más de ${dinero(valores["sv.renta-declaracion-obligatoria"])} al año tiene que presentar la declaración.`);
    return {
      cotizaciones,
      deducciones,
      imponible,
      impuesto,
      aPagar: diferencia > 0 ? diferencia : 0,
      aDevolver: diferencia < 0 ? -diferencia : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "cotizaciones", etiqueta: "AFP e ISSS del año", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Deducciones", formato: "moneda" },
    { clave: "imponible", etiqueta: "Renta imponible", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto del año", formato: "moneda", destacada: true },
    { clave: "aPagar", etiqueta: "Le falta pagar", formato: "moneda", ocultarSiCero: true },
    { clave: "aDevolver", etiqueta: "Saldo a su favor", formato: "moneda", ocultarSiCero: true },
  ],
});
