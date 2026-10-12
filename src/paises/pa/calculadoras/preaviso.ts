import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { semanalDeMensual, sumarMeses } from "../reglas";

export default definirCalculadora({
  id: "pa.preaviso",
  mercado: "pa",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "pa.preaviso-renuncia-dias": "numero",
    "pa.preaviso-renuncia-tecnico-meses": "numero",
    "pa.penalidad-sin-preaviso-semanas": "numero",
    "pa.preaviso-domestico-dias": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tu trabajo",
      opciones: [
        { valor: "general", etiqueta: "Trabajador en general" },
        { valor: "tecnico", etiqueta: "Trabajador técnico" },
        { valor: "domestico", etiqueta: "Trabajo doméstico" },
      ],
      porDefecto: "general",
    },
    { id: "fechaAviso", tipo: "fecha", etiqueta: "Día en que entregas el aviso", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const { tipo, fechaAviso } = entrada;
    if (tipo === "tecnico") {
      const meses = valores["pa.preaviso-renuncia-tecnico-meses"];
      return {
        plazo: `${meses} meses`,
        fechaSalida: sumarMeses(fechaAviso, meses),
        descuento: redondear(semanalDeMensual(entrada.salario) * valores["pa.penalidad-sin-preaviso-semanas"]),
        observaciones: ["El aviso va por escrito. Si no lo firmas ante una autoridad de trabajo, el empleador no puede usarlo después en tu contra."],
      };
    }
    const dias = tipo === "domestico" ? valores["pa.preaviso-domestico-dias"] : valores["pa.preaviso-renuncia-dias"];
    if (tipo === "domestico") {
      return {
        plazo: `${dias} días`,
        fechaSalida: sumarDias(fechaAviso, dias),
        descuento: 0,
        observaciones: [
          `En el trabajo doméstico el aviso de ${dias} días vale para las dos partes y puede ser verbal. Durante la prueba basta con avisar 24 horas antes.`,
        ],
      };
    }
    return {
      plazo: `${dias} días`,
      fechaSalida: sumarDias(fechaAviso, dias),
      descuento: redondear(semanalDeMensual(entrada.salario) * valores["pa.penalidad-sin-preaviso-semanas"]),
      observaciones: [
        "El aviso va por escrito. Si no lo firmas ante una autoridad de trabajo, el empleador no puede usarlo después en tu contra.",
        "Si te vas sin avisar, el empleador puede descontar ese monto de tu prima de antigüedad.",
      ],
    };
  },
  resultado: [
    { clave: "plazo", etiqueta: "Aviso que tienes que dar", formato: "texto" },
    { clave: "fechaSalida", etiqueta: "Desde esta fecha puedes dejar el trabajo", formato: "fecha", destacada: true },
    { clave: "descuento", etiqueta: "Lo que te pueden descontar si no avisas", formato: "moneda", ocultarSiCero: true },
  ],
});
