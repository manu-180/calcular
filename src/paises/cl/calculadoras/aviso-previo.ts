import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";

export default definirCalculadora({
  id: "cl.aviso-previo",
  mercado: "cl",
  concepto: "preaviso",
  slug: "aviso-previo",
  estado: "publicado",
  requiere: {
    "cl.aviso-previo-dias": "numero",
    "cl.tope-indemnizacion": "numero",
    "cl.uf": "serie",
  },
  campos: [
    { id: "fechaAviso", tipo: "fecha", etiqueta: "Día en que te entregaron la carta de despido" },
    { id: "termino", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "remuneracion",
      tipo: "moneda",
      etiqueta: "Última remuneración mensual",
      ayuda: "Sueldo más lo fijo de cada mes (colación, movilización). Sin horas extra.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.fechaAviso) throw new ErrorEntrada("El último día de trabajo no puede ser anterior al aviso.", "termino");
    const anticipacion = diasEntre(entrada.fechaAviso, entrada.termino);
    const exigidos = valores["cl.aviso-previo-dias"];
    const tope = redondear(valores["cl.tope-indemnizacion"] * valores["cl.uf"].valor);
    const corresponde = anticipacion < exigidos;
    const indemnizacion = corresponde ? Math.min(entrada.remuneracion, tope) : 0;
    const observaciones: string[] = [];
    if (corresponde && entrada.remuneracion > tope) observaciones.push("Tu remuneración pasa el tope de 90 UF: se paga el tope.");
    if (!corresponde) observaciones.push("Te avisaron con la anticipación que pide la ley, así que no corresponde este pago. Igual puede corresponder la indemnización por años de servicio.");
    return {
      anticipacion,
      corresponde: corresponde ? "Sí, te deben una remuneración" : "No, el aviso fue a tiempo",
      tope,
      indemnizacion,
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnizacion", etiqueta: "Indemnización sustitutiva del aviso previo", formato: "moneda", destacada: true },
    { clave: "corresponde", etiqueta: "¿Corresponde?", formato: "texto" },
    { clave: "anticipacion", etiqueta: "Días entre el aviso y el término", formato: "dias" },
    { clave: "tope", etiqueta: "Tope de 90 UF en pesos", formato: "moneda" },
  ],
});
