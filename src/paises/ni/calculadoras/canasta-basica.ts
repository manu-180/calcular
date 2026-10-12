import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.canasta-basica",
  mercado: "ni",
  concepto: "propio",
  slug: "canasta-basica",
  estado: "publicado",
  requiere: {
    "ni.canasta-basica": "numero",
    "ni.salario-minimo": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Ingreso mensual del hogar", min: 0, requerido: false, ayuda: "Si lo dejás vacío, usamos el salario mínimo del sector que elijas." },
    { id: "sector", tipo: "opcion-dato", dato: "ni.salario-minimo", etiqueta: "Sector para comparar con el salario mínimo", porDefecto: "industria-manufacturera" },
  ],
  calcular(entrada, valores, { redondear }) {
    const canasta = valores["ni.canasta-basica"];
    const minimo = enMapa(valores["ni.salario-minimo"], entrada.sector);
    const ingreso = entrada.ingreso ?? minimo;
    const diferencia = redondear(ingreso - canasta);
    return {
      canasta,
      ingreso,
      cobertura: redondear((ingreso / canasta) * 100),
      falta: diferencia < 0 ? -diferencia : 0,
      sobra: diferencia > 0 ? diferencia : 0,
      minimo,
      salariosMinimos: redondear(canasta / minimo),
      observaciones: [
        "La canasta básica del INIDE tiene 53 productos de alimentos, usos del hogar y vestuario para una familia.",
        "Es el último mes publicado por el INIDE, que sale con unas seis a ocho semanas de atraso.",
      ],
    };
  },
  resultado: [
    { clave: "canasta", etiqueta: "Costo de la canasta básica", formato: "moneda" },
    { clave: "ingreso", etiqueta: "Ingreso comparado", formato: "moneda" },
    { clave: "cobertura", etiqueta: "Parte de la canasta que cubre el ingreso", formato: "porcentaje", destacada: true },
    { clave: "falta", etiqueta: "Lo que falta para cubrirla", formato: "moneda", ocultarSiCero: true },
    { clave: "sobra", etiqueta: "Lo que sobra después de cubrirla", formato: "moneda", ocultarSiCero: true },
    { clave: "salariosMinimos", etiqueta: "Salarios mínimos del sector que cuesta la canasta", formato: "numero", decimales: 2 },
  ],
});
