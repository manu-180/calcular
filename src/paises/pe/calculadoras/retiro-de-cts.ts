import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.retiro-de-cts",
  mercado: "pe",
  concepto: "propio",
  slug: "retiro-de-cts",
  estado: "publicado",
  requiere: {
    "pe.cts-libre-disposicion": "numero",
  },
  campos: [
    { id: "saldo", tipo: "moneda", etiqueta: "Saldo de tu cuenta CTS", ayuda: "Lo depositado más los intereses. Lo ves en tu banco.", min: 0 },
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "Tu situación",
      opciones: [
        { valor: "trabajando", etiqueta: "Sigo trabajando" },
        { valor: "enfermedad", etiqueta: "Tengo cáncer o una enfermedad terminal acreditada" },
        { valor: "cese", etiqueta: "Ya dejé de trabajar" },
      ],
      porDefecto: "trabajando",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const libre = valores["pe.cts-libre-disposicion"];
    // DL 650, arts. 42 y 44: al cese y por enfermedad terminal o cáncer se puede retirar todo.
    const tasa = entrada.situacion === "trabajando" ? libre : 100;
    const disponible = redondear(porcentaje(entrada.saldo, tasa));
    const observaciones: string[] = [];
    if (entrada.situacion === "trabajando" && libre === 100) {
      observaciones.push("Hasta el 31 de diciembre de 2026 puedes retirar el 100 % una sola vez (Ley 32322). Desde 2027 vuelve el tope del 50 %.");
    }
    if (entrada.situacion === "enfermedad") observaciones.push("Tienes que acreditar el diagnóstico ante tu empleador. Puedes hacer el retiro total en cualquier momento.");
    if (entrada.situacion === "cese") observaciones.push("Al terminar tu relación laboral puedes retirar todo con la certificación de cese, que tu empleador te tiene que dar dentro de las 48 horas.");
    return { tasa, disponible, queda: redondear(entrada.saldo - disponible), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Parte que puedes retirar", formato: "porcentaje" },
    { clave: "disponible", etiqueta: "Monto que puedes retirar", formato: "moneda", destacada: true },
    { clave: "queda", etiqueta: "Lo que queda en tu cuenta", formato: "moneda" },
  ],
});
