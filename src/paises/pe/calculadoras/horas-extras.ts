import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.horas-extras",
  mercado: "pe",
  concepto: "horas-extra",
  slug: "horas-extras",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.sobretasa-horas-extras": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    { id: "jornada", tipo: "numero", etiqueta: "Horas de tu jornada diaria", min: 1, max: 8, porDefecto: 8 },
    { id: "horasPorDia", tipo: "numero", etiqueta: "Horas extras por día", min: 0, max: 16, porDefecto: 2 },
    { id: "dias", tipo: "entero", etiqueta: "Días en que hiciste horas extras", min: 0, max: 31, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.jornada <= 0 || entrada.jornada > 8) throw new ErrorEntrada("La jornada ordinaria va de 1 a 8 horas por día.", "jornada");
    if (entrada.horasPorDia < 0) throw new ErrorEntrada("Las horas extras no pueden ser negativas.", "horasPorDia");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = entrada.sueldo + asignacion;
    const valorHoraExacto = remuneracion / 30 / entrada.jornada;
    const valorHora = redondear(valorHoraExacto);
    const sobretasas = valores["pe.sobretasa-horas-extras"];
    // El MTPE redondea el valor hora y el recargo por separado y después los suma (guía de horas extras).
    const hora25 = redondear(valorHora + redondear(porcentaje(valorHoraExacto, enMapa(sobretasas, "primeras-dos"))));
    const hora35 = redondear(valorHora + redondear(porcentaje(valorHoraExacto, enMapa(sobretasas, "siguientes"))));
    const primeras = Math.min(2, entrada.horasPorDia) * entrada.dias;
    const siguientes = Math.max(0, entrada.horasPorDia - 2) * entrada.dias;
    const pagoPrimeras = redondear(primeras * hora25);
    const pagoSiguientes = redondear(siguientes * hora35);
    return {
      valorHora,
      hora25,
      hora35,
      primeras,
      siguientes,
      pagoPrimeras,
      pagoSiguientes,
      total: redondear(pagoPrimeras + pagoSiguientes),
    };
  },
  resultado: [
    { clave: "valorHora", etiqueta: "Valor de tu hora normal", formato: "moneda" },
    { clave: "hora25", etiqueta: "Hora extra con 25 % (primeras dos del día)", formato: "moneda" },
    { clave: "hora35", etiqueta: "Hora extra con 35 % (desde la tercera)", formato: "moneda" },
    { clave: "primeras", etiqueta: "Horas al 25 %", formato: "horas" },
    { clave: "siguientes", etiqueta: "Horas al 35 %", formato: "horas", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por horas extras", formato: "moneda", destacada: true },
  ],
});
