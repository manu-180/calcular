import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.minimum-wage",
  mercado: "qa",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "qa.minimum-wage": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic wage", min: 0, porDefecto: 1000 },
    { id: "casa", tipo: "si-no", etiqueta: "Your employer provides suitable housing", porDefecto: true },
    { id: "vivienda", tipo: "moneda", etiqueta: "Monthly housing allowance", min: 0, porDefecto: 0, visibleSi: { casa: [false] } },
    { id: "comidaDada", tipo: "si-no", etiqueta: "Your employer provides food", porDefecto: false },
    { id: "comida", tipo: "moneda", etiqueta: "Monthly food allowance", min: 0, porDefecto: 300, visibleSi: { comidaDada: [false] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico < 0) throw new ErrorEntrada("Enter your monthly basic wage.", "basico");
    const m = v["qa.minimum-wage"];
    const faltaBasico = Math.max(0, enMapa(m, "basic") - entrada.basico);
    const faltaVivienda = entrada.casa ? 0 : Math.max(0, enMapa(m, "housing") - (entrada.vivienda ?? 0));
    const faltaComida = entrada.comidaDada ? 0 : Math.max(0, enMapa(m, "food") - (entrada.comida ?? 0));
    const minimo = enMapa(m, "basic") + (entrada.casa ? 0 : enMapa(m, "housing")) + (entrada.comidaDada ? 0 : enMapa(m, "food"));
    const falta = redondear(faltaBasico + faltaVivienda + faltaComida);
    const observaciones = ["The minimum applies to workers under the Labour Law and to domestic workers. An agreement for higher pay always prevails."];
    if (faltaBasico > 0) observaciones.push("The basic wage is below the legal minimum.");
    if (faltaVivienda > 0) observaciones.push("Without housing provided, the housing allowance is below the legal minimum.");
    if (faltaComida > 0) observaciones.push("Without food provided, the food allowance is below the legal minimum.");
    return { estado: falta > 0 ? "Below the minimum wage" : "Meets the minimum wage", falta, minimo: redondear(minimo), observaciones };
  },
  resultado: [
    { clave: "estado", etiqueta: "Result", formato: "texto", destacada: true },
    { clave: "falta", etiqueta: "Monthly shortfall", formato: "moneda", ocultarSiCero: true },
    { clave: "minimo", etiqueta: "Minimum monthly pay in your situation", formato: "moneda" },
  ],
});
