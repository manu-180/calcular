import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.hora-extra",
  mercado: "br",
  concepto: "horas-extra",
  slug: "hora-extra",
  estado: "publicado",
  requiere: {
    "br.hora-extra-adicional": "numero",
    "br.jornada-semanal": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 2200 },
    { id: "jornada", tipo: "numero", etiqueta: "Jornada semanal do contrato (horas)", min: 1, max: 44, porDefecto: 44 },
    { id: "horasUteis", tipo: "numero", etiqueta: "Horas extras em dias úteis no mês", min: 0, porDefecto: 10 },
    { id: "adicionalUteis", tipo: "porcentaje", etiqueta: "Adicional das horas em dias úteis", min: 0, porDefecto: 50, ayuda: "A lei garante pelo menos 50 %. A convenção coletiva pode dar mais." },
    { id: "horasDomingos", tipo: "numero", etiqueta: "Horas extras em domingos e feriados", min: 0, porDefecto: 0 },
    { id: "adicionalDomingos", tipo: "porcentaje", etiqueta: "Adicional em domingos e feriados", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const minimo = valores["br.hora-extra-adicional"];
    if (entrada.adicionalUteis < minimo) throw new ErrorEntrada(`A Constituição garante adicional de pelo menos ${minimo} %.`, "adicionalUteis");
    if (entrada.adicionalDomingos < minimo) throw new ErrorEntrada(`A Constituição garante adicional de pelo menos ${minimo} %.`, "adicionalDomingos");
    if (entrada.jornada > valores["br.jornada-semanal"]) throw new ErrorEntrada(`A jornada normal vai até ${valores["br.jornada-semanal"]} horas por semana.`, "jornada");
    // Divisor mensal = jornada semanal × 5 (44 h dá 220, 40 h dá 200), como a Súmula 431 do TST.
    const divisor = entrada.jornada * 5;
    const valorHora = entrada.salario / divisor;
    const horaUteis = valorHora * (1 + entrada.adicionalUteis / 100);
    const horaDomingos = valorHora * (1 + entrada.adicionalDomingos / 100);
    const totalUteis = redondear(horaUteis * entrada.horasUteis);
    const totalDomingos = redondear(horaDomingos * entrada.horasDomingos);
    const observaciones = ["Horas extras habituais também aumentam o descanso semanal remunerado (DSR), o 13º, as férias e o FGTS."];
    return {
      divisor,
      valorHora: redondear(valorHora),
      horaUteis: redondear(horaUteis),
      totalUteis,
      horaDomingos: redondear(horaDomingos),
      totalDomingos,
      total: redondear(totalUteis + totalDomingos),
      observaciones,
    };
  },
  resultado: [
    { clave: "divisor", etiqueta: "Divisor de horas do mês", formato: "numero", decimales: 0 },
    { clave: "valorHora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "horaUteis", etiqueta: "Hora extra em dia útil", formato: "moneda" },
    { clave: "totalUteis", etiqueta: "Total em dias úteis", formato: "moneda", ocultarSiCero: true },
    { clave: "horaDomingos", etiqueta: "Hora extra em domingo ou feriado", formato: "moneda" },
    { clave: "totalDomingos", etiqueta: "Total em domingos e feriados", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de horas extras no mês", formato: "moneda", destacada: true },
  ],
});
