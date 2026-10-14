import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.horas-extraordinarias",
  mercado: "pt",
  concepto: "horas-extra",
  slug: "horas-extraordinarias",
  estado: "publicado",
  requiere: {
    "pt.ct-trabalho-suplementar": "mapa",
    "pt.ct-limite-horas-suplementares": "numero",
  },
  campos: [
    { id: "retribuicao", tipo: "moneda", etiqueta: "Retribuição mensal", min: 0, porDefecto: 1500 },
    { id: "horasSemana", tipo: "numero", etiqueta: "Período normal de trabalho por semana (horas)", min: 1, max: 60, porDefecto: 40 },
    { id: "horasUteis", tipo: "numero", etiqueta: "Horas extra em dias úteis", min: 0, porDefecto: 10 },
    { id: "diasUteis", tipo: "entero", etiqueta: "Em quantos dias úteis fez essas horas", min: 0, porDefecto: 5, ayuda: "A primeira hora de cada dia tem um acréscimo menor do que as seguintes." },
    { id: "horasDescanso", tipo: "numero", etiqueta: "Horas extra em dias de descanso ou feriados", min: 0, porDefecto: 0 },
    { id: "acimaDe100", tipo: "si-no", etiqueta: "Já fez mais de 100 horas extra este ano", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.horasUteis > 0 && entrada.diasUteis === 0) throw new ErrorEntrada("Indique em quantos dias fez as horas extra.", "diasUteis");
    const a = valores["pt.ct-trabalho-suplementar"];
    const sufixo = entrada.acimaDe100 ? "-100" : "";
    const valorHora = (entrada.retribuicao * 12) / (52 * entrada.horasSemana);
    const primeiras = Math.min(entrada.horasUteis, entrada.diasUteis);
    const seguintes = entrada.horasUteis - primeiras;
    const uteis = valorHora * (primeiras * (1 + a[`util-primeira${sufixo}`] / 100) + seguintes * (1 + a[`util-seguintes${sufixo}`] / 100));
    const descanso = valorHora * entrada.horasDescanso * (1 + a[`descanso${sufixo}`] / 100);
    return {
      valorHora: redondear(valorHora),
      uteis: redondear(uteis),
      descanso: redondear(descanso),
      total: redondear(uteis + descanso),
      observaciones: [
        `As horas acima das ${valores["pt.ct-limite-horas-suplementares"]} anuais pagam acréscimos maiores. Se passar esse limite a meio do mês, faça duas contas.`,
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Valor das horas extra", formato: "moneda", destacada: true },
    { clave: "uteis", etiqueta: "Em dias úteis", formato: "moneda", ocultarSiCero: true },
    { clave: "descanso", etiqueta: "Em dias de descanso ou feriados", formato: "moneda", ocultarSiCero: true },
    { clave: "valorHora", etiqueta: "Valor da hora normal", formato: "moneda" },
  ],
});
