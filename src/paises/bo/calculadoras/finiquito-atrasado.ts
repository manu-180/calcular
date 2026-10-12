import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "bo.finiquito-atrasado",
  mercado: "bo",
  concepto: "propio",
  slug: "finiquito-atrasado",
  estado: "publicado",
  requiere: {
    "bo.finiquito-plazo-dias": "numero",
    "bo.finiquito-multa": "numero",
    "bo.ufv": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del finiquito que le deben", min: 0 },
    { id: "retiro", tipo: "fecha", etiqueta: "Último día trabajado" },
    {
      id: "ufvInicial",
      tipo: "numero",
      etiqueta: "Valor de la UFV del día en que vencía el plazo (opcional)",
      ayuda: "Lo publica el Banco Central de Bolivia. Con él calculamos el mantenimiento de valor.",
      min: 1,
      max: 10,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    if (entrada.retiro > fecha) throw new ErrorEntrada("El último día trabajado no puede ser posterior a hoy.", "retiro");
    const plazo = valores["bo.finiquito-plazo-dias"];
    const limite = sumarDias(entrada.retiro, plazo);
    const atrasado = fecha > limite;
    const multa = atrasado ? redondear(porcentaje(entrada.monto, valores["bo.finiquito-multa"])) : 0;
    const ufv = valores["bo.ufv"];
    const mantenimiento = atrasado && entrada.ufvInicial !== null ? redondear(Math.max(0, entrada.monto * (ufv.valor / entrada.ufvInicial - 1))) : 0;
    const observaciones: string[] = [];
    if (!atrasado) observaciones.push(`Todavía está dentro de los ${plazo} días calendario: no corresponde multa.`);
    else observaciones.push(`El plazo venció hace ${diasEntre(limite, fecha)} días. Puede reclamar en la Jefatura de Trabajo de su departamento.`);
    if (atrasado && entrada.ufvInicial === null) observaciones.push("Si escribe la UFV del día en que venció el plazo, le sumamos el mantenimiento de valor.");
    return {
      limite,
      multa,
      mantenimiento,
      ufvHoy: ufv.valor,
      total: redondear(entrada.monto + multa + mantenimiento),
      observaciones,
    };
  },
  resultado: [
    { clave: "limite", etiqueta: "Fecha límite para pagarle", formato: "fecha" },
    { clave: "multa", etiqueta: "Multa por pago atrasado, a su favor", formato: "moneda", ocultarSiCero: true },
    { clave: "ufvHoy", etiqueta: "UFV de hoy", formato: "numero", decimales: 5 },
    { clave: "mantenimiento", etiqueta: "Mantenimiento de valor (UFV)", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total que le deben hoy", formato: "moneda", destacada: true },
  ],
});
