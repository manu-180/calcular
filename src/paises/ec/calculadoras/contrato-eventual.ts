import { definirCalculadora, porcentaje } from "@/motor/calculo";

// La hora del básico es el básico dividido para 30 días y para la jornada diaria (Código del
// Trabajo, art. 47 y 53). El art. 17 suma el 35 % sobre esa hora.
const DIAS_DEL_MES = 30;

export default definirCalculadora({
  id: "ec.contrato-eventual",
  mercado: "ec",
  concepto: "propio",
  slug: "contrato-eventual",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.jornada-diaria": "numero",
    "ec.recargo-eventual": "numero",
  },
  campos: [
    {
      id: "basico",
      tipo: "moneda",
      etiqueta: "Salario básico de tu sector",
      ayuda: "Si tu actividad no tiene un salario sectorial más alto, deja el campo vacío y usamos el salario básico unificado.",
      min: 0,
      requerido: false,
    },
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas trabajadas",
      ayuda: "Las horas del período que quieres calcular. Un mes completo son 240 horas.",
      min: 0,
      porDefecto: 240,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const sbu = valores["ec.sbu"];
    const basico = entrada.basico === null || entrada.basico === 0 ? sbu : entrada.basico;
    const hora = basico / DIAS_DEL_MES / valores["ec.jornada-diaria"];
    const horaEventual = hora + porcentaje(hora, valores["ec.recargo-eventual"]);
    const observaciones: string[] = [];
    if (basico < sbu) observaciones.push("El salario de tu sector no puede ser menor al salario básico unificado. Revisa el valor.");
    observaciones.push("Además tienes derecho a la afiliación al IESS, los décimos y las vacaciones proporcionales.");
    return {
      basico,
      hora: redondear(hora),
      horaEventual: redondear(horaEventual),
      total: redondear(horaEventual * entrada.horas),
      observaciones,
    };
  },
  resultado: [
    { clave: "basico", etiqueta: "Salario básico usado", formato: "moneda" },
    { clave: "hora", etiqueta: "Valor de la hora del básico", formato: "moneda" },
    { clave: "horaEventual", etiqueta: "Valor de tu hora con el incremento", formato: "moneda" },
    { clave: "total", etiqueta: "Lo que te corresponde por esas horas", formato: "moneda", destacada: true },
  ],
});
