import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.sip-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "sip-calculator",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "cuota", tipo: "moneda", etiqueta: "Monthly SIP amount", min: 0, porDefecto: 10000 },
    { id: "retorno", tipo: "porcentaje", etiqueta: "Expected return a year", min: 0, max: 40, porDefecto: 12 },
    { id: "anios", tipo: "entero", etiqueta: "Years", min: 1, max: 50, porDefecto: 10 },
    { id: "aumento", tipo: "porcentaje", etiqueta: "Yearly step-up of the SIP", min: 0, max: 50, porDefecto: 0, ayuda: "Leave 0 for a fixed SIP." },
  ],
  calcular(entrada, _v, { redondear }) {
    if (entrada.cuota <= 0) throw new ErrorEntrada("Enter the monthly amount.", "cuota");
    const i = entrada.retorno / 1200;
    let valor = 0;
    let invertido = 0;
    let cuota = entrada.cuota;
    for (let anio = 0; anio < entrada.anios; anio++) {
      for (let mes = 0; mes < 12; mes++) {
        // Se toma la cuota al inicio del mes, como hacen los fondos con la fecha de SIP.
        valor = (valor + cuota) * (1 + i);
        invertido += cuota;
      }
      cuota = cuota * (1 + entrada.aumento / 100);
    }
    return {
      valor: redondear(valor),
      invertido: redondear(invertido),
      ganancia: redondear(valor - invertido),
      multiplo: invertido > 0 ? valor / invertido : 0,
    };
  },
  resultado: [
    { clave: "valor", etiqueta: "Estimated value", formato: "moneda", destacada: true },
    { clave: "invertido", etiqueta: "Amount invested", formato: "moneda" },
    { clave: "ganancia", etiqueta: "Estimated returns", formato: "moneda" },
    { clave: "multiplo", etiqueta: "Value as a multiple of what you put in", formato: "numero", decimales: 2 },
  ],
});
