import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.trabajo-nocturno",
  mercado: "pe",
  concepto: "propio",
  slug: "trabajo-nocturno",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.sobretasa-nocturna": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo mensual", min: 0 },
    { id: "jornada", tipo: "numero", etiqueta: "Horas de tu jornada diaria", min: 1, max: 8, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "sueldo");
    if (entrada.jornada <= 0 || entrada.jornada > 8) throw new ErrorEntrada("La jornada ordinaria va de 1 a 8 horas por día.", "jornada");
    const rmv = valores["pe.rmv"];
    const minimo = redondear(rmv + porcentaje(rmv, valores["pe.sobretasa-nocturna"]));
    const diferencia = redondear(Math.max(0, minimo - entrada.sueldo));
    const valorHora = redondear(Math.max(entrada.sueldo, minimo) / 30 / entrada.jornada);
    const observaciones: string[] = [];
    if (diferencia > 0) observaciones.push("Tu sueldo está por debajo del mínimo para el horario nocturno: tu empleador tiene que completarlo.");
    else observaciones.push("Tu sueldo cubre el mínimo para el horario nocturno.");
    observaciones.push("El mínimo nocturno rige para quien trabaja entre las 10:00 p.m. y las 6:00 a.m. Las horas extras de noche se calculan sobre este valor.");
    return { rmv, minimo, sueldo: entrada.sueldo, diferencia, valorHora, observaciones };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Sueldo mínimo para trabajo nocturno", formato: "moneda", destacada: true },
    { clave: "rmv", etiqueta: "Remuneración mínima vital", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Lo que te falta para llegar al mínimo", formato: "moneda" },
    { clave: "valorHora", etiqueta: "Valor de tu hora nocturna", formato: "moneda" },
  ],
});
