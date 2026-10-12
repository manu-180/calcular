import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.licencia-de-paternidad",
  mercado: "co",
  concepto: "propio",
  slug: "licencia-de-paternidad",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.licencia-paternidad-semanas": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Sin auxilio de transporte.", min: 0 },
    {
      id: "semanasGestacion",
      tipo: "entero",
      etiqueta: "Semanas de gestación",
      ayuda: "Lo que duró el embarazo. Un embarazo a término son unas 40 semanas.",
      min: 20,
      max: 45,
      porDefecto: 40,
    },
    {
      id: "semanasCotizadas",
      tipo: "entero",
      etiqueta: "Semanas que cotizaste a salud durante el embarazo",
      min: 0,
      max: 45,
      porDefecto: 40,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario < valores["co.smmlv"]) throw new ErrorEntrada("El salario no puede ser menor al salario mínimo.", "salario");
    if (entrada.semanasCotizadas > entrada.semanasGestacion) {
      throw new ErrorEntrada("Las semanas cotizadas no pueden ser más que las semanas de gestación.", "semanasCotizadas");
    }
    const dias = valores["co.licencia-paternidad-semanas"] * 7;
    const proporcion = entrada.semanasCotizadas / entrada.semanasGestacion;
    const valorCompleto = redondear((entrada.salario / 30) * dias);
    const observaciones: string[] = [];
    if (proporcion < 1) observaciones.push("No cotizaste todo el embarazo, así que la EPS te reconoce la parte proporcional a las semanas cotizadas.");
    return {
      dias,
      porcentaje: proporcion * 100,
      valorCompleto,
      total: redondear(valorCompleto * proporcion),
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia", formato: "dias" },
    { clave: "porcentaje", etiqueta: "Parte que reconoce la EPS", formato: "porcentaje", decimales: 2 },
    { clave: "valorCompleto", etiqueta: "Valor con todo el embarazo cotizado", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Total de la licencia", formato: "moneda", decimales: 0, destacada: true },
  ],
});
