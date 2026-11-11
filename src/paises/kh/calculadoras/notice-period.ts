import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { salarioDiario } from "../lib/salario";

export default definirCalculadora({
  id: "kh.notice-period",
  mercado: "kh",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: { "kh.notice-days": "mapa", "kh.notice-months": "mapa" },
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
    { id: "meses", tipo: "entero", etiqueta: "រយៈពេលធ្វើការ ឬរយៈពេលកិច្ចសញ្ញា (ខែ)", min: 0, porDefecto: 36 },
    { id: "salario", tipo: "moneda", etiqueta: "ប្រាក់ខែប្រចាំខែ (រៀល)", min: 0, porDefecto: 2600000 },
    { id: "diasMes", tipo: "entero", etiqueta: "ចំនួនថ្ងៃធ្វើការក្នុងមួយខែ", min: 1, max: 31, porDefecto: 26 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ខែ។", "salario");
    const d = v["kh.notice-days"];
    const m = v["kh.notice-months"];
    let dias = 0;
    let meses = 0;
    if (e.contrato === "fijo") {
      if (e.meses > 12) dias = enMapa(d, "fixed-1y");
      else if (e.meses > 6) dias = enMapa(d, "fixed-6m");
    } else if (e.meses < 6) dias = enMapa(d, "under-6m");
    else if (e.meses <= 24) dias = enMapa(d, "6m-2y");
    else if (e.meses <= 60) meses = enMapa(m, "2y-5y");
    else if (e.meses <= 120) meses = enMapa(m, "5y-10y");
    else meses = enMapa(m, "over-10y");
    const pago = redondear(meses > 0 ? e.salario * meses : dias * salarioDiario(e.salario, e.diasMes));
    return { dias, meses, pago };
  },
  resultado: [
    { clave: "dias", etiqueta: "រយៈពេលជូនដំណឹងជាមុន", formato: "dias", ocultarSiCero: true, destacada: true },
    { clave: "meses", etiqueta: "រយៈពេលជូនដំណឹងជាមុន", formato: "meses", ocultarSiCero: true },
    { clave: "pago", etiqueta: "ប្រាក់ជំនួសបើមិនជូនដំណឹង", formato: "moneda" },
  ],
});
