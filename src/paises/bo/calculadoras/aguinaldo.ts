import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { anioDe, fecha } from "../lib/fechas";
import { duodecimasDeGestion, montoDuodecimas } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.aguinaldo",
  mercado: "bo",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {
    "bo.aguinaldo-meses-minimos": "mapa",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Usted es",
      opciones: [
        { valor: "empleado", etiqueta: "Empleada o empleado" },
        { valor: "obrero", etiqueta: "Obrera u obrero" },
      ],
      porDefecto: "empleado",
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Promedio del total ganado de los últimos 3 meses",
      ayuda: "Sume lo que cobró en los 3 meses (haber básico, bono de antigüedad, horas extras, comisiones) y divida por 3. Si es obrero, ponga lo del último mes.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    {
      id: "retiro",
      tipo: "fecha",
      etiqueta: "Fecha de retiro, si dejó el trabajo este año",
      ayuda: "Si sigue trabajando, déjela vacía: calculamos la gestión completa hasta el 31 de diciembre.",
      requerido: false,
    },
  ],
  calcular(entrada, valores, { fecha: hoy, redondear }) {
    const hasta = entrada.retiro ?? fecha(anioDe(hoy), 12, 31);
    if (hasta < entrada.ingreso) throw new ErrorEntrada("Revise las fechas: el ingreso tiene que ser anterior al retiro o al fin de la gestión.", "ingreso");
    const minimo = enMapa(valores["bo.aguinaldo-meses-minimos"], entrada.tipo);
    const d = duodecimasDeGestion(entrada.ingreso, hasta, minimo);
    const aguinaldo = d.alcanzaMinimo ? montoDuodecimas(entrada.sueldo, d, redondear) : 0;
    const observaciones = ["El aguinaldo se paga entero, sin descuentos de aportes ni de RC-IVA."];
    if (!d.alcanzaMinimo) {
      observaciones.push(`Para cobrar aguinaldo hay que trabajar al menos ${minimo} ${minimo === 1 ? "mes" : "meses"} seguidos en la gestión, en el mismo lugar.`);
    }
    return {
      gestion: String(anioDe(hasta)),
      tiempo: `${d.meses} ${d.meses === 1 ? "mes" : "meses"} y ${d.dias} ${d.dias === 1 ? "día" : "días"}`,
      aguinaldo,
      observaciones,
    };
  },
  resultado: [
    { clave: "gestion", etiqueta: "Gestión", formato: "texto" },
    { clave: "tiempo", etiqueta: "Tiempo trabajado en la gestión", formato: "texto" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo de Navidad", formato: "moneda", destacada: true },
  ],
});
