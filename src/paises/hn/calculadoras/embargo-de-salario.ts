import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.embargo-de-salario",
  mercado: "hn",
  concepto: "propio",
  slug: "embargo-de-salario",
  estado: "publicado",
  requiere: {
    "hn.embargo-salario": "mapa",
    "hn.embargo-minimo-libre": "numero",
    "hn.salario-minimo-mensual": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "deuda", tipo: "opcion-dato", dato: "hn.embargo-salario", etiqueta: "Por qué es el embargo", porDefecto: "general" },
    {
      id: "rama",
      tipo: "opcion-dato",
      dato: "hn.salario-minimo-mensual",
      etiqueta: "Rama y tamaño de la empresa (para el salario mínimo)",
      ayuda: "Solo cuenta para las deudas comunes: el salario mínimo no se embarga.",
      porDefecto: "comercio-1-10",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["hn.embargo-salario"], entrada.deuda);
    const observaciones: string[] = [];
    let maximo: number;
    if (entrada.deuda === "general") {
      const minimo = enMapa(valores["hn.salario-minimo-mensual"], entrada.rama);
      const libre = valores["hn.embargo-minimo-libre"];
      const porExcedente = porcentaje(Math.max(0, entrada.salario - libre), tasa);
      maximo = redondear(Math.max(0, Math.min(porExcedente, entrada.salario - minimo)));
      observaciones.push("Para deudas comunes no se embarga el salario mínimo ni las vacaciones, y del resto solo una cuarta parte.");
      if (entrada.salario <= minimo) observaciones.push("Su salario no pasa del mínimo de su rama, así que no se puede embargar por esta deuda.");
    } else {
      maximo = redondear(porcentaje(entrada.salario, tasa));
      observaciones.push("Para pensión alimenticia, alquiler de la vivienda o alimentos de la familia se puede embargar cualquier salario, hasta el límite de la ley.");
    }
    observaciones.push("Si hay dos embargos, el segundo solo puede tocar la parte del salario que el primero dejó libre.");
    return { tasa, maximo, queda: redondear(entrada.salario - maximo), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje máximo para esta deuda", formato: "porcentaje" },
    { clave: "maximo", etiqueta: "Lo máximo que le pueden embargar por mes", formato: "moneda", destacada: true },
    { clave: "queda", etiqueta: "Lo que le queda como mínimo", formato: "moneda" },
  ],
});
