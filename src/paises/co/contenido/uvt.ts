import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.uvt",
  h1: "Conversor de UVT a pesos",
  title: "UVT 2026: {{co.uvt}}. Convierte UVT a pesos",
  description:
    "La UVT 2026 vale {{co.uvt}} según la Resolución DIAN 000238 de 2025. Convierte UVT a pesos y pesos a UVT con la aproximación que pide la DIAN.",
  intro: [
    "La Unidad de Valor Tributario (UVT) es la medida que usa la DIAN para fijar topes, sanciones y tarifas.",
    "Para 2026 vale {{co.uvt}}. Rige desde el {{co.uvt#desde}}.",
  ],
  comoSeCalcula: [
    "UVT a pesos: cantidad de UVT por {{co.uvt}}.",
    "Pesos a UVT: pesos divididos por {{co.uvt}}.",
    "Cuando una norma en UVT se pasa a pesos, el Estatuto Tributario (artículo 868) pide aproximar: hasta $100 al peso, hasta $10.000 a la centena y más arriba al múltiplo de mil.",
  ],
  ejemplo: ["Escribe 100 para ver cuánto son 100 UVT en pesos: el valor exacto y el aproximado como lo pide la DIAN."],
  faq: [
    {
      pregunta: "¿Cada cuánto cambia la UVT?",
      respuesta: "Cada año. La DIAN publica el valor nuevo antes del 1 de enero, ajustado por la inflación de ingresos medios que certifica el DANE.",
    },
    {
      pregunta: "¿Para qué sirve la UVT?",
      respuesta: "Para la retención en la fuente, los topes para declarar renta, las sanciones y muchos otros valores tributarios.",
    },
    {
      pregunta: "¿La UVT es lo mismo que el salario mínimo?",
      respuesta: "No. Son valores distintos. El salario mínimo es laboral y la UVT es tributaria.",
    },
  ],
  glosario: [
    { termino: "UVT", definicion: "Unidad de Valor Tributario, creada por el artículo 868 del Estatuto Tributario." },
    { termino: "DIAN", definicion: "Dirección de Impuestos y Aduanas Nacionales, la entidad que recauda los impuestos." },
  ],
});
