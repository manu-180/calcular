import { definirCalculadora, porRegion } from "@/motor/calculo";
import { calcularNeto, REQUIERE_NETO, valoresNeto } from "../neto";
import { DIAS_PERIODO, OPCIONES_PERIODO_NOMINA } from "../nomina";

export default definirCalculadora({
  id: "mx.sueldo-bruto",
  mercado: "mx",
  concepto: "propio",
  slug: "sueldo-bruto",
  estado: "publicado",
  requiere: REQUIERE_NETO,
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Sueldo neto que quieres recibir", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Cada cuánto se paga", opciones: OPCIONES_PERIODO_NOMINA, porDefecto: "quincenal" },
    { id: "region", tipo: "region", etiqueta: "Dónde se trabaja", porDefecto: "general" },
    { id: "antiguedad", tipo: "entero", etiqueta: "Años en la empresa", min: 0, max: 60, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = valoresNeto(valores, porRegion(valores["mx.salario-minimo"], entrada.region));
    const netoDe = (centavos: number) => calcularNeto(centavos / 100, entrada.periodo, entrada.antiguedad, null, v, redondear);
    const objetivo = Math.round(entrada.neto * 100);
    const alcanza = (c: number) => Math.round(netoDe(c).neto * 100) >= objetivo;
    // Búsqueda binaria en centavos del bruto más bajo cuyo neto llega al pedido. El neto no crece
    // parejo: con el salario mínimo no hay descuentos, y arriba del límite del subsidio para el empleo
    // el ISR salta. Por eso se prueba primero cada tramo donde sí crece parejo.
    const buscar = (desde: number, hasta: number) => {
      let bajo = desde;
      let alto = hasta;
      while (bajo < alto) {
        const medio = Math.floor((bajo + alto) / 2);
        if (alcanza(medio)) alto = medio;
        else bajo = medio + 1;
      }
      return bajo;
    };
    const dias = entrada.periodo in DIAS_PERIODO ? DIAS_PERIODO[entrada.periodo as keyof typeof DIAS_PERIODO] : DIAS_PERIODO.mensual;
    const conSubsidio = Math.floor(((v.limiteSubsidio * dias) / DIAS_PERIODO.mensual) * 100);
    let bajo: number;
    if (alcanza(objetivo)) bajo = objetivo;
    else if (conSubsidio > objetivo && alcanza(conSubsidio)) bajo = buscar(objetivo, conSubsidio);
    else bajo = buscar(Math.max(objetivo, conSubsidio + 1), objetivo * 3 + 100000);
    const n = netoDe(bajo);
    const observaciones: string[] = [];
    if (n.ganaMinimo) observaciones.push("Con el salario mínimo no se retiene ISR y la empresa paga las cuotas del IMSS del trabajador.");
    if (n.subsidio > 0) observaciones.push("A este sueldo le toca el subsidio para el empleo.");
    return { bruto: bajo / 100, isrRetenido: n.isrRetenido, imss: n.imss, neto: n.neto, observaciones };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Sueldo bruto que hay que pactar", formato: "moneda", destacada: true },
    { clave: "isrRetenido", etiqueta: "ISR retenido", formato: "moneda" },
    { clave: "imss", etiqueta: "Cuotas del IMSS", formato: "moneda" },
    { clave: "neto", etiqueta: "Sueldo neto que queda", formato: "moneda" },
  ],
});
