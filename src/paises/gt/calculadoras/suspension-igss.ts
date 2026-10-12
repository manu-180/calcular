import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.suspension-igss",
  mercado: "gt",
  concepto: "propio",
  slug: "suspension-igss",
  estado: "publicado",
  requiere: {
    "gt.igss-subsidio-enfermedad": "numero",
    "gt.igss-subsidio-dia-inicio": "mapa",
    "gt.igss-subsidio-maximo": "numero",
    "gt.igss-subsidio-minimo": "numero",
  },
  campos: [
    { id: "motivo", tipo: "opcion-dato", dato: "gt.igss-subsidio-dia-inicio", etiqueta: "Motivo de la suspensión", porDefecto: "enfermedad" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0, ayuda: "El que reporta su patrono al IGSS, sin la bonificación incentivo." },
    { id: "dias", tipo: "entero", etiqueta: "Días de suspensión que le dio el IGSS", min: 1, max: 400 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1) throw new ErrorEntrada("Indique al menos un día de suspensión.", "dias");
    const inicio = enMapa(valores["gt.igss-subsidio-dia-inicio"], entrada.motivo);
    const diario = redondear(entrada.salario / DIAS_MES);
    const minimo = valores["gt.igss-subsidio-minimo"];
    const calculado = diario < minimo ? diario : Math.max(redondear(porcentaje(diario, valores["gt.igss-subsidio-enfermedad"])), minimo);
    const subsidio = Math.min(calculado, valores["gt.igss-subsidio-maximo"]);
    const diasPagados = Math.max(0, entrada.dias - (inicio - 1));
    const observaciones = [
      entrada.motivo === "accidente"
        ? "El día del accidente se lo paga completo su patrono. El IGSS paga desde el día siguiente."
        : "Los primeros días de una enfermedad no los cubre el IGSS. Pregunte en su trabajo si se los pagan.",
    ];
    if (subsidio < calculado) observaciones.push("Su subsidio llegó al máximo diario que paga el IGSS.");
    return { diario, subsidio, diasPagados, total: redondear(subsidio * diasPagados), observaciones };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "subsidio", etiqueta: "Subsidio por día", formato: "moneda" },
    { clave: "diasPagados", etiqueta: "Días que paga el IGSS", formato: "dias" },
    { clave: "total", etiqueta: "Total que paga el IGSS", formato: "moneda", destacada: true },
  ],
});
