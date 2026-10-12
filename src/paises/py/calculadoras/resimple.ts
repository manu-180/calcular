import { aplicarEscala, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.resimple",
  mercado: "py",
  concepto: "regimen-simplificado",
  slug: "resimple",
  estado: "publicado",
  requiere: {
    "py.resimple-cuota": "escala",
    "py.resimple-tope": "numero",
  },
  campos: [
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Ingresos brutos del año anterior",
      ayuda: "Todo lo que vendiste o facturaste de enero a diciembre, sin restar gastos.",
      min: 0,
    },
  ],
  calcular(entrada, valores) {
    const tope = valores["py.resimple-tope"];
    if (entrada.ingresos > tope) {
      return {
        cuotaMensual: null,
        cuotaTrimestral: null,
        anual: null,
        observaciones: ["Con esos ingresos no podés estar en el RESIMPLE. Te corresponde el IRE SIMPLE o el régimen general, y además el IVA."],
      };
    }
    // Ley 6380, art. 27: monto fijo por escalón de ingresos. Sin ingresos se paga el primer escalón.
    const cuotaMensual = aplicarEscala(valores["py.resimple-cuota"], Math.max(entrada.ingresos, 1));
    return {
      cuotaMensual,
      cuotaTrimestral: cuotaMensual * 3,
      anual: cuotaMensual * 12,
      observaciones: [
        "La DNIT cobra el RESIMPLE en cuatro cuotas trimestrales: marzo, junio, setiembre y diciembre.",
        "La declaración jurada anual (formulario 502) vence el 26 de febrero. Si no la presentás, la DNIT genera las cuotas con el escalón más bajo.",
        "En el RESIMPLE no se paga IVA.",
      ],
    };
  },
  resultado: [
    { clave: "cuotaMensual", etiqueta: "Monto mensual", formato: "moneda" },
    { clave: "cuotaTrimestral", etiqueta: "Cuota trimestral a pagar", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Total del año", formato: "moneda" },
  ],
});
