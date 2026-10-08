import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

const horas = (id: string, etiqueta: string, ayuda?: string) =>
  ({ id, tipo: "numero", etiqueta, min: 0, max: 400, porDefecto: 0, ...(ayuda ? { ayuda } : {}) }) as const;

export default definirCalculadora({
  id: "co.horas-extras",
  mercado: "co",
  concepto: "horas-extra",
  slug: "horas-extras",
  estado: "publicado",
  requiere: {
    "co.jornada-semanal": "numero",
    "co.recargos": "mapa",
    "co.recargo-dominical": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    horas("extraDiurnas", "Horas extra diurnas", "De 6:00 a. m. a 7:00 p. m., por encima de tu jornada."),
    horas("extraNocturnas", "Horas extra nocturnas", "De 7:00 p. m. a 6:00 a. m., por encima de tu jornada."),
    horas("nocturnas", "Horas nocturnas dentro de tu jornada", "Horas normales que caen de noche. Solo se paga el recargo."),
    horas("dominicales", "Horas en domingo o festivo (diurnas)"),
    horas("dominicalesNocturnas", "Horas en domingo o festivo (nocturnas)"),
    horas("extraDominicalesDiurnas", "Horas extra en domingo o festivo (diurnas)"),
    horas("extraDominicalesNocturnas", "Horas extra en domingo o festivo (nocturnas)"),
  ],
  calcular(entrada, valores, { redondear }) {
    const jornada = valores["co.jornada-semanal"];
    const horasMes = (jornada * 30) / 6;
    const valorHora = entrada.salario / horasMes;
    const r = valores["co.recargos"];
    const nocturno = enMapa(r, "nocturno");
    const extraDiurna = enMapa(r, "extra-diurna");
    const extraNocturna = enMapa(r, "extra-nocturna");
    const dominical = valores["co.recargo-dominical"];
    const pago = (cantidad: number, factorPorcentaje: number) => redondear(porcentaje(valorHora * cantidad, factorPorcentaje));
    const lineas = {
      extraDiurnas: pago(entrada.extraDiurnas, 100 + extraDiurna),
      extraNocturnas: pago(entrada.extraNocturnas, 100 + extraNocturna),
      nocturnas: pago(entrada.nocturnas, nocturno),
      dominicales: pago(entrada.dominicales, 100 + dominical),
      dominicalesNocturnas: pago(entrada.dominicalesNocturnas, 100 + dominical + nocturno),
      extraDominicalesDiurnas: pago(entrada.extraDominicalesDiurnas, 100 + extraDiurna + dominical),
      extraDominicalesNocturnas: pago(entrada.extraDominicalesNocturnas, 100 + extraNocturna + dominical),
    };
    const total = redondear(Object.values(lineas).reduce((a, b) => a + b, 0));
    return {
      jornada,
      horasMes,
      valorHora: redondear(valorHora),
      ...lineas,
      total,
    };
  },
  resultado: [
    { clave: "jornada", etiqueta: "Jornada máxima semanal", formato: "horas" },
    { clave: "horasMes", etiqueta: "Horas del mes que se usan para el valor de la hora", formato: "horas" },
    { clave: "valorHora", etiqueta: "Valor de tu hora ordinaria", formato: "moneda", decimales: 0 },
    { clave: "extraDiurnas", etiqueta: "Horas extra diurnas", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "extraNocturnas", etiqueta: "Horas extra nocturnas", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "nocturnas", etiqueta: "Recargo nocturno", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "dominicales", etiqueta: "Domingos y festivos diurnos", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "dominicalesNocturnas", etiqueta: "Domingos y festivos nocturnos", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "extraDominicalesDiurnas", etiqueta: "Extra en domingo o festivo diurna", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "extraDominicalesNocturnas", etiqueta: "Extra en domingo o festivo nocturna", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar por horas extra y recargos", formato: "moneda", decimales: 0, destacada: true },
  ],
});
