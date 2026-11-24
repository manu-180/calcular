import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.minimum-wage",
  mercado: "kh",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "kh.min-wage": "numero", "kh.min-wage-probation": "numero" },
  campos: [
    {
      id: "etapa",
      tipo: "opcion",
      etiqueta: "ស្ថានភាពនិយោជិត",
      opciones: [
        { valor: "completo", etiqueta: "និយោជិតពេញសិទ្ធិ" },
        { valor: "prueba", etiqueta: "និយោជិតសាកល្បង" },
      ],
      porDefecto: "completo",
    },
    { id: "sueldo", tipo: "moneda", moneda: "USD", etiqueta: "ប្រាក់ឈ្នួលប្រចាំខែរបស់អ្នក (ដុល្លារ)", min: 0, porDefecto: 210 },
    { id: "diasMes", tipo: "entero", etiqueta: "ចំនួនថ្ងៃធ្វើការក្នុងមួយខែ", min: 1, max: 31, porDefecto: 26 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo < 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ឈ្នួល។", "sueldo");
    const minimo = e.etapa === "prueba" ? v["kh.min-wage-probation"] : v["kh.min-wage"];
    return {
      minimo,
      falta: redondear(Math.max(0, minimo - e.sueldo)),
      diario: redondear(minimo / e.diasMes),
      cumple: e.sueldo >= minimo ? "គ្រប់ប្រាក់ឈ្នួលអប្បបរមា" : "ទាបជាងប្រាក់ឈ្នួលអប្បបរមា",
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "ប្រាក់ឈ្នួលអប្បបរមាក្នុងមួយខែ", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "cumple", etiqueta: "ប្រាក់ឈ្នួលរបស់អ្នក", formato: "texto" },
    { clave: "falta", etiqueta: "ខ្វះប៉ុន្មាន", formato: "moneda", moneda: "USD", ocultarSiCero: true },
    { clave: "diario", etiqueta: "ប្រហែលក្នុងមួយថ្ងៃធ្វើការ", formato: "moneda", moneda: "USD" },
  ],
});
