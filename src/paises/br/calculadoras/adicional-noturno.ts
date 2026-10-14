import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { limpo } from "../lib/folha";

// CLT, art. 73, § 1º: a hora noturna urbana tem 52 minutos e 30 segundos, então 7 horas de relógio
// valem 8 horas noturnas.
const MINUTOS_HORA_NOTURNA = 52.5;

export default definirCalculadora({
  id: "br.adicional-noturno",
  mercado: "br",
  concepto: "propio",
  slug: "adicional-noturno",
  estado: "publicado",
  requiere: {
    "br.adicional-noturno": "numero",
    "br.jornada-semanal": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 2200 },
    { id: "jornada", tipo: "numero", etiqueta: "Jornada semanal do contrato (horas)", min: 1, max: 44, porDefecto: 44 },
    { id: "horasRelogio", tipo: "numero", etiqueta: "Horas de relógio trabalhadas entre 22h e 5h no mês", min: 0, porDefecto: 70 },
    { id: "percentual", tipo: "porcentaje", etiqueta: "Adicional noturno", min: 0, porDefecto: 20, ayuda: "A CLT garante pelo menos 20 % para quem trabalha na cidade." },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const minimo = valores["br.adicional-noturno"];
    if (entrada.percentual < minimo) throw new ErrorEntrada(`A CLT garante adicional noturno de pelo menos ${minimo} %.`, "percentual");
    if (entrada.jornada > valores["br.jornada-semanal"]) throw new ErrorEntrada(`A jornada normal vai até ${valores["br.jornada-semanal"]} horas por semana.`, "jornada");
    const horasNoturnas = (entrada.horasRelogio * 60) / MINUTOS_HORA_NOTURNA;
    const valorHora = entrada.salario / (entrada.jornada * 5);
    const adicionalHora = porcentaje(valorHora, entrada.percentual);
    return {
      horasNoturnas: redondear(horasNoturnas),
      valorHora: redondear(valorHora),
      adicionalHora: redondear(adicionalHora),
      adicional: redondear(adicionalHora * horasNoturnas),
      observaciones: [
        "O adicional noturno se soma ao salário e entra no INSS, no FGTS, no 13º e nas férias.",
        "Para quem trabalha no campo, as regras são outras: o horário noturno muda e o adicional é de 25 %.",
      ],
    };
  },
  resultado: [
    { clave: "horasNoturnas", etiqueta: "Horas noturnas (hora de 52 min e 30 s)", formato: "horas", decimales: 2 },
    { clave: "valorHora", etiqueta: "Valor da hora normal", formato: "moneda" },
    { clave: "adicionalHora", etiqueta: "Adicional por hora noturna", formato: "moneda" },
    { clave: "adicional", etiqueta: "Adicional noturno do mês", formato: "moneda", destacada: true },
  ],
});
