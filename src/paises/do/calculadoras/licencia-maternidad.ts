import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "do.licencia-maternidad",
  mercado: "do",
  concepto: "propio",
  slug: "licencia-maternidad",
  estado: "publicado",
  requiere: {
    "do.maternidad-semanas": "numero",
    "do.maternidad-semanas-antes": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Fecha probable de parto", ayuda: "La que dice tu certificado médico." },
    {
      id: "desde",
      tipo: "opcion",
      etiqueta: "Cuándo empiezas la licencia",
      opciones: [
        { valor: "antes", etiqueta: "Lo antes posible, antes del parto" },
        { valor: "parto", etiqueta: "Desde el parto" },
      ],
      porDefecto: "antes",
    },
  ],
  calcular(entrada, valores) {
    const semanas = valores["do.maternidad-semanas"];
    const inicio = entrada.desde === "parto" ? entrada.parto : sumarDias(entrada.parto, -7 * valores["do.maternidad-semanas-antes"]);
    const fin = sumarDias(inicio, 7 * semanas - 1);
    return {
      semanas,
      inicio,
      fin,
      vuelta: sumarDias(fin, 1),
      observaciones: [
        "Si el parto se adelanta, la licencia empieza ese día y dura las mismas semanas.",
        `El subsidio por maternidad de la SISALRIL cubre las ${semanas} semanas si cotizaste al menos 8 meses en los 12 anteriores al parto.`,
        "Después de la licencia puedes pedir tus vacaciones de inmediato y el empleador debe dártelas (art. 238).",
      ],
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Semanas de licencia", formato: "numero", destacada: true },
    { clave: "inicio", etiqueta: "Primer día de licencia", formato: "fecha" },
    { clave: "fin", etiqueta: "Último día de licencia", formato: "fecha" },
    { clave: "vuelta", etiqueta: "Vuelves a trabajar el", formato: "fecha" },
  ],
});
