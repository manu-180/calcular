import { definirCalculadora } from "@/motor/calculo";
import { redondear as redondearA } from "@/motor/formato";
import { aproximarUvtAPesos } from "../reglas";

export default definirCalculadora({
  id: "co.uvt",
  mercado: "co",
  concepto: "conversor-unidad",
  slug: "uvt",
  estado: "publicado",
  requiere: {
    "co.uvt": "numero",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "uvt-a-pesos", etiqueta: "UVT a pesos" },
        { valor: "pesos-a-uvt", etiqueta: "Pesos a UVT" },
      ],
      porDefecto: "uvt-a-pesos",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const uvt = valores["co.uvt"];
    if (entrada.direccion === "uvt-a-pesos") {
      const exacto = entrada.cantidad * uvt;
      return { uvt, pesos: redondear(exacto), aproximado: aproximarUvtAPesos(exacto), uvts: null };
    }
    return { uvt, pesos: null, aproximado: null, uvts: redondearA(entrada.cantidad / uvt, { decimales: 2, modo: "mitad-arriba" }) };
  },
  resultado: [
    { clave: "uvt", etiqueta: "Valor de la UVT", formato: "moneda", decimales: 0 },
    { clave: "pesos", etiqueta: "Valor en pesos", formato: "moneda", decimales: 0 },
    { clave: "aproximado", etiqueta: "Valor aproximado como lo pide la DIAN", formato: "moneda", decimales: 0, destacada: true },
    { clave: "uvts", etiqueta: "Valor en UVT", formato: "numero", decimales: 2, destacada: true },
  ],
});
