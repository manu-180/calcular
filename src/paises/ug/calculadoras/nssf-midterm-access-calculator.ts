import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.nssf-midterm-access-calculator",
  mercado: "ug",
  concepto: "propio",
  slug: "nssf-midterm-access-calculator",
  estado: "publicado",
  requiere: {
    "ug.nssf-midterm-share": "numero",
    "ug.nssf-midterm-share-disability": "numero",
    "ug.nssf-midterm-age": "numero",
    "ug.nssf-midterm-age-disability": "numero",
    "ug.nssf-midterm-years": "numero",
  },
  campos: [
    { id: "saldo", tipo: "moneda", etiqueta: "Your NSSF savings balance", min: 0, porDefecto: 40000000, ayuda: "The total on your latest NSSF statement." },
    { id: "edad", tipo: "entero", etiqueta: "Your age", min: 16, max: 100, porDefecto: 45 },
    { id: "anios", tipo: "entero", etiqueta: "Years you have contributed", min: 0, max: 60, porDefecto: 10 },
    { id: "discapacidad", tipo: "si-no", etiqueta: "You are a person with a disability", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.saldo <= 0) throw new ErrorEntrada("Enter your NSSF savings balance.", "saldo");
    const edadMin = e.discapacidad ? v["ug.nssf-midterm-age-disability"] : v["ug.nssf-midterm-age"];
    const share = e.discapacidad ? v["ug.nssf-midterm-share-disability"] : v["ug.nssf-midterm-share"];
    const anosMin = v["ug.nssf-midterm-years"];
    const faltaEdad = Math.max(0, edadMin - e.edad);
    const faltaAnios = Math.max(0, anosMin - e.anios);
    const elegible = faltaEdad === 0 && faltaAnios === 0;
    const monto = elegible ? redondear(porcentaje(e.saldo, share)) : 0;
    const observaciones: string[] = [];
    if (faltaEdad > 0) observaciones.push(`You can apply from age ${edadMin}, in ${faltaEdad} ${faltaEdad === 1 ? "year" : "years"}.`);
    if (faltaAnios > 0) observaciones.push(`You need ${faltaAnios} more ${faltaAnios === 1 ? "year" : "years"} of contributions.`);
    if (e.discapacidad) observaciones.push("Bring a letter from the National Council for Persons with Disabilities with your claim.");
    return {
      monto,
      elegible: elegible ? "Yes" : "Not yet",
      share,
      restante: redondear(e.saldo - monto),
      observaciones,
    };
  },
  resultado: [
    { clave: "monto", etiqueta: "Midterm access you can claim", formato: "moneda", destacada: true },
    { clave: "elegible", etiqueta: "Eligible now", formato: "texto" },
    { clave: "share", etiqueta: "Share of your savings", formato: "porcentaje", decimales: 0 },
    { clave: "restante", etiqueta: "Savings left for retirement", formato: "moneda" },
  ],
});
