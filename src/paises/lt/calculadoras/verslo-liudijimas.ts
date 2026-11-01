import { definirCalculadora, porcentaje } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.verslo-liudijimas",
  mercado: "lt",
  concepto: "regimen-simplificado",
  slug: "verslo-liudijimas",
  estado: "borrador",
  requiere: {
    "lt.vl-pajamu-riba": "numero",
    "lt.iv-bazes-dalis": "numero",
    "lt.iv-vsd": "numero",
    "lt.iv-psd": "numero",
  },
  campos: [
    { id: "kaina", tipo: "moneda", etiqueta: "Verslo liudijimo kaina per metus", min: 0, porDefecto: 300, ayuda: "Ją nustato savivaldybė." },
    { id: "pajamos", tipo: "moneda", etiqueta: "Metinės pajamos", min: 0, porDefecto: 15000 },
  ],
  calcular(e, v, { redondear }) {
    const baze = porcentaje(e.pajamos, v["lt.iv-bazes-dalis"]);
    const imokos = redondear(porcentaje(baze, v["lt.iv-vsd"]) + porcentaje(baze, v["lt.iv-psd"]));
    return { viso: redondear(e.kaina + imokos), imokos, riba: v["lt.vl-pajamu-riba"], likutis: redondear(e.pajamos - e.kaina - imokos) };
  },
  resultado: [
    { clave: "viso", etiqueta: "Liudijimas ir įmokos per metus", formato: "moneda", destacada: true },
    { clave: "imokos", etiqueta: "VSD ir PSD įmokos", formato: "moneda" },
    { clave: "riba", etiqueta: "Pajamų riba", formato: "moneda" },
    { clave: "likutis", etiqueta: "Lieka iš pajamų", formato: "moneda" },
  ],
});
