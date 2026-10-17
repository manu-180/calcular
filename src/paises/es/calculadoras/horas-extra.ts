import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "es.horas-extra",
  mercado: "es",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "es.horas-extra-maximo": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual", min: 0, porDefecto: 25000 },
    {
      id: "jornadaAnual",
      tipo: "numero",
      etiqueta: "Horas de trabajo al año",
      min: 1,
      porDefecto: 1792,
      ayuda: "Lo fija tu convenio. Con 40 horas semanales, 52 semanas menos 22 días laborables de vacaciones y 14 festivos dan 1.792 horas.",
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas extra a cobrar", min: 0, porDefecto: 10 },
    {
      id: "recargo",
      tipo: "porcentaje",
      etiqueta: "Recargo de tu convenio sobre la hora normal",
      min: 0,
      porDefecto: 0,
      ayuda: "La ley solo exige que no se paguen por debajo de la hora normal. Muchos convenios suman un recargo.",
    },
    { id: "horasAnio", tipo: "numero", etiqueta: "Horas extra que llevas este año, contando estas", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = redondear(entrada.bruto / entrada.jornadaAnual);
    const horaExtra = redondear(hora + porcentaje(hora, entrada.recargo));
    const maximo = valores["es.horas-extra-maximo"];
    const observaciones: string[] = [];
    if ((entrada.horasAnio ?? entrada.horas) > maximo) {
      observaciones.push(`La ley limita las horas extra a ${maximo} al año. No cuentan las que se compensan con descanso dentro de los cuatro meses siguientes.`);
    }
    return { hora, horaExtra, total: redondear(horaExtra * entrada.horas), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Importe bruto de las horas extra", formato: "moneda", destacada: true },
    { clave: "horaExtra", etiqueta: "Precio de cada hora extra", formato: "moneda" },
    { clave: "hora", etiqueta: "Precio de tu hora normal", formato: "moneda" },
  ],
});
