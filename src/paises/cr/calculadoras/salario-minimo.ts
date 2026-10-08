import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.salario-minimo",
  mercado: "cr",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "cr.salario-minimo-mes": "mapa",
    "cr.salario-minimo-jornada": "mapa",
    "cr.dias-mes-planilla": "numero",
    "cr.jornada-diaria": "mapa",
  },
  campos: [
    {
      id: "categoria",
      tipo: "opcion-dato",
      etiqueta: "Categoría o perfil del puesto",
      dato: "cr.salario-minimo-mes",
      porDefecto: "no-calificado",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = enMapa(valores["cr.salario-minimo-mes"], entrada.categoria);
    const dias = valores["cr.dias-mes-planilla"];
    const horas = enMapa(valores["cr.jornada-diaria"], "diurna");
    const diario = mensual / dias;
    const porJornada = valores["cr.salario-minimo-jornada"][entrada.categoria];
    const observaciones: string[] = [];
    if (porJornada !== undefined) {
      observaciones.push("Esta categoría también tiene un mínimo por jornada diaria. Si le pagan por día, compare con la tabla de jornada de esta página.");
    }
    return {
      mensual,
      quincenal: redondear(mensual / 2),
      diario: redondear(diario),
      hora: redondear(diario / horas),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "Pago quincenal mínimo", formato: "moneda" },
    { clave: "diario", etiqueta: "Equivalente por día (mes de 30 días)", formato: "moneda" },
    { clave: "hora", etiqueta: "Hora ordinaria diurna", formato: "moneda" },
  ],
});
