import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { salarioDiario } from "../lib/salario";

export default definirCalculadora({
  id: "kh.severance-pay",
  mercado: "kh",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "publicado",
  requiere: { "kh.short-service-days": "numero", "kh.fixed-term-rate": "numero", "kh.seniority-days-year": "numero" },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "ប្រភេទកិច្ចសញ្ញា",
      opciones: [
        { valor: "indefinido", etiqueta: "មិនកំណត់ថិរវេលា" },
        { valor: "fijo", etiqueta: "កំណត់ថិរវេលា" },
      ],
      porDefecto: "indefinido",
    },
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ឈ្នួល និងប្រាក់បន្ទាប់បន្សំប្រចាំខែ (រៀល)", min: 0, porDefecto: 2600000, visibleSi: { contrato: ["indefinido"] } },
    { id: "diasMes", tipo: "entero", etiqueta: "ចំនួនថ្ងៃធ្វើការក្នុងមួយខែ", min: 1, max: 31, porDefecto: 26, visibleSi: { contrato: ["indefinido"] } },
    { id: "meses", tipo: "entero", etiqueta: "រយៈពេលធ្វើការ (ខែ)", min: 0, porDefecto: 4, visibleSi: { contrato: ["indefinido"] } },
    { id: "total", tipo: "moneda", etiqueta: "ប្រាក់ឈ្នួលសរុបពេញកិច្ចសញ្ញា (រៀល)", min: 0, porDefecto: 24000000, visibleSi: { contrato: ["fijo"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.contrato === "fijo") {
      if ((e.total ?? 0) <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ឈ្នួលសរុប។", "total");
      return { pago: redondear(porcentaje(e.total ?? 0, v["kh.fixed-term-rate"])), dano: null };
    }
    const salario = e.salario ?? 0;
    if (salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ឈ្នួល។", "salario");
    const meses = e.meses ?? 0;
    const diario = salarioDiario(salario, e.diasMes ?? 26);
    const pago = meses >= 1 && meses < 6 ? redondear(diario * v["kh.short-service-days"]) : 0;
    // Art. 91: la persona puede pedir una suma igual a la antigüedad, cobrada o por cobrar, en vez de probar el daño.
    const dano = redondear((diario * v["kh.seniority-days-year"] * meses) / 12);
    return { pago, dano };
  },
  resultado: [
    { clave: "pago", etiqueta: "ប្រាក់បំណាច់បញ្ឈប់ការងារ", formato: "moneda", destacada: true },
    { clave: "dano", etiqueta: "សំណងខូចខាតបើបញ្ឈប់គ្មានហេតុផល (មាត្រា 91)", formato: "moneda" },
  ],
});
