import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.sueldo-liquido",
  h1: "Calculadora de sueldo líquido",
  title: "Sueldo líquido 2026: pasá de nominal a líquido",
  description:
    "Calculá tu sueldo líquido con montepío, Fonasa, FRL e IRPF del mes. Usa la BPC de {{uy.bpc}} y las tasas oficiales del BPS y la DGI.",
  intro: [
    "El sueldo líquido es lo que te depositan. Sale de restarle al nominal el aporte jubilatorio, el Fonasa, el Fondo de Reconversión Laboral y la retención del IRPF.",
    "Poné tu nominal y tu situación familiar. Con eso calculamos cada descuento como lo hace el recibo de sueldo.",
  ],
  comoSeCalcula: [
    "Montepío: {{uy.aporte-jubilatorio}} del nominal, hasta el tope de aportación de {{uy.tope-aportes}}.",
    "Fonasa: si cobrás hasta {{uy.fonasa-umbral}}, aportás {{uy.fonasa-hasta[sin]}} (o {{uy.fonasa-hasta[conyuge]}} con cónyuge a cargo). Si cobrás más, va de {{uy.fonasa-mas[sin]}} sin cargas a {{uy.fonasa-mas[ambos]}} con cónyuge e hijos.",
    "Fondo de Reconversión Laboral: {{uy.frl}} del nominal.",
    "IRPF: si tu nominal pasa {{uy.irpf-incremento-umbral}}, se le suma un {{uy.irpf-incremento}}. A esa renta se le aplica la escala por franjas en BPC.",
    "Del impuesto se restan tus deducciones (aportes y {{uy.irpf-deduccion-hijo}} por año por cada hijo) multiplicadas por {{uy.irpf-deducciones-tasa-baja}}, o por {{uy.irpf-deducciones-tasa-alta}} si ganás más de {{uy.irpf-deducciones-umbral}}.",
  ],
  ejemplo: [
    "Con $ 100.000 nominales, sin hijos ni cónyuge, en octubre de 2026 te descuentan $ 15.000 de montepío, $ 4.500 de Fonasa, $ 100 de FRL y $ 5.192,80 de IRPF. Tu líquido es $ 75.207,20.",
  ],
  faq: [
    {
      pregunta: "¿Qué diferencia hay entre sueldo nominal y líquido?",
      respuesta: "El nominal es lo que figura antes de descuentos. El líquido es lo que cobrás en mano, después de aportes e IRPF.",
    },
    {
      pregunta: "¿Desde qué sueldo se paga IRPF?",
      respuesta: "La escala tiene un tramo libre de hasta 7 BPC por mes. Aunque lo pases, tus deducciones pueden cubrir todo el impuesto, así que muchos sueldos no tienen retención.",
    },
    {
      pregunta: "¿Por qué me suman un {{uy.irpf-incremento}} para el IRPF?",
      respuesta: "Porque así lo manda el decreto que regula la retención (Decreto 148/007) cuando el nominal pasa {{uy.irpf-incremento-umbral}}. Solo cuenta para el impuesto: no cambia tus aportes.",
    },
    {
      pregunta: "¿Los hijos cambian mi sueldo líquido?",
      respuesta: "Sí, por dos lados. Con hijos a cargo el aporte al Fonasa puede ser mayor, pero cada hijo te da una deducción en el IRPF que suele bajar la retención.",
    },
    {
      pregunta: "¿Este cálculo incluye el aguinaldo o el salario vacacional?",
      respuesta: "No. Esas partidas tienen su propia retención. Para calcularlas usá las calculadoras de aguinaldo y de salario vacacional.",
    },
  ],
  glosario: [
    { termino: "Montepío", definicion: "Aporte jubilatorio personal al BPS. Se descuenta del nominal hasta un tope." },
    { termino: "Fonasa", definicion: "Fondo Nacional de Salud. Tu aporte te da cobertura médica y, según el caso, también a tu familia." },
    { termino: "BPC", definicion: "Base de Prestaciones y Contribuciones. Valor que fija el gobierno cada año y que se usa para las franjas del IRPF y otros topes." },
    { termino: "IRPF", definicion: "Impuesto a la Renta de las Personas Físicas. El empleador te lo retiene cada mes." },
  ],
});
