import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.retirement-savings-account-calculator",
  mercado: "ng",
  concepto: "jubilacion",
  slug: "retirement-savings-account-calculator",
  estado: "publicado",
  requiere: {
    "ng.pension-employee": "numero",
    "ng.pension-employer": "numero",
  },
  campos: [
    { id: "emolumentos", tipo: "moneda", etiqueta: "Basic, housing and transport a month", min: 0, porDefecto: 450000 },
    { id: "saldo", tipo: "moneda", etiqueta: "Current RSA balance", min: 0, porDefecto: 0 },
    { id: "anios", tipo: "entero", etiqueta: "Years until you retire", min: 1, max: 50, porDefecto: 25 },
    { id: "retorno", tipo: "porcentaje", etiqueta: "Expected return a year", min: 0, max: 40, porDefecto: 12 },
    { id: "aumento", tipo: "porcentaje", etiqueta: "Yearly pay increase", min: 0, max: 50, porDefecto: 10 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.emolumentos <= 0) throw new ErrorEntrada("Enter your monthly emoluments.", "emolumentos");
    const tasaAporte = v["ng.pension-employee"] + v["ng.pension-employer"];
    const i = entrada.retorno / 1200;
    let saldo = entrada.saldo;
    let aportado = 0;
    let base = entrada.emolumentos;
    for (let a = 0; a < entrada.anios; a++) {
      const aporte = porcentaje(base, tasaAporte);
      for (let m = 0; m < 12; m++) {
        saldo = saldo * (1 + i) + aporte;
        aportado += aporte;
      }
      base = base * (1 + entrada.aumento / 100);
    }
    return {
      saldo: redondear(saldo),
      aportado: redondear(aportado),
      rendimiento: redondear(saldo - aportado - entrada.saldo),
      aporteMes: redondear(porcentaje(entrada.emolumentos, tasaAporte)),
    };
  },
  resultado: [
    { clave: "saldo", etiqueta: "RSA balance at retirement", formato: "moneda", destacada: true },
    { clave: "aportado", etiqueta: "Contributions paid in", formato: "moneda" },
    { clave: "rendimiento", etiqueta: "Investment returns", formato: "moneda" },
    { clave: "aporteMes", etiqueta: "Contribution this month (you and employer)", formato: "moneda" },
  ],
});
