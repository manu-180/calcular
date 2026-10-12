import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { DIAS_ANIO } from "../prestaciones";

export default definirCalculadora({
  id: "gt.licencia-de-maternidad",
  mercado: "gt",
  concepto: "propio",
  slug: "licencia-de-maternidad",
  estado: "publicado",
  requiere: {
    "gt.maternidad-dias": "mapa",
    "gt.igss-subsidio-maternidad": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Fecha probable del parto", ayuda: "La que indica el certificado médico." },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const antes = enMapa(valores["gt.maternidad-dias"], "prenatal");
    const despues = enMapa(valores["gt.maternidad-dias"], "postnatal");
    const inicio = sumarDias(entrada.parto, -(antes - 1));
    const fin = sumarDias(entrada.parto, despues);
    const dias = antes + despues;
    const diario = redondear((entrada.salario * 12) / DIAS_ANIO);
    return {
      inicio,
      fin,
      regreso: sumarDias(fin, 1),
      dias,
      diario,
      total: redondear(porcentaje(diario, valores["gt.igss-subsidio-maternidad"]) * dias),
      observaciones: [
        "Si el bebé nace antes, los días que no pudo tomar antes del parto se suman después.",
        "Si está afiliada al IGSS y cotizó lo necesario, el IGSS le paga el subsidio. Si no, se lo paga su patrono.",
        "El IGSS divide el salario de cada mes entre sus días, así que el total puede variar unos quetzales.",
      ],
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Empieza el descanso", formato: "fecha" },
    { clave: "fin", etiqueta: "Termina el descanso", formato: "fecha" },
    { clave: "regreso", etiqueta: "Regresa a trabajar", formato: "fecha" },
    { clave: "dias", etiqueta: "Días de descanso", formato: "dias" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "total", etiqueta: "Pago estimado del descanso", formato: "moneda", destacada: true },
  ],
});
