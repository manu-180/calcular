import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

const base: TextosUi<UiFechaDeParto> = {
  slug: "data-provavel-do-parto",
  ui: () => ({
    metodo: "Qual data você sabe?",
    fum: "Primeiro dia da última menstruação",
    concepcion: "Data da concepção",
    fecha: "Data",
    fechaAyuda: "Se escolher a última menstruação, coloque o primeiro dia do sangramento.",
    ciclo: "Duração do ciclo (dias)",
    cicloAyuda: "Só vale com a última menstruação. Se não souber, deixe 28.",
    fpp: "Data provável do parto",
    edadGestacional: "Idade gestacional hoje",
    trimestre: "Trimestre",
    faltan: "Faltam (dias)",
    fechaConcepcion: "Concepção estimada",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "semana" : "semanas"}${d ? ` e ${d} ${d === 1 ? "dia" : "dias"}` : ""}`,
    trimestres: ["Primeiro trimestre", "Segundo trimestre", "Terceiro trimestre"],
    errorFutura: "A data não pode ser depois de hoje.",
    errorCiclo: "A duração do ciclo tem que ficar entre 20 e 45 dias.",
    notaPasada: "Já se passaram mais de 42 semanas desde essa data, então a idade gestacional não aparece.",
    aviso: "É uma estimativa: poucos bebês nascem exatamente na data prevista. Os exames e as consultas de pré-natal com um profissional de saúde dão a data mais precisa.",
  }),
};

const portugal = (): Partial<UiFechaDeParto> => ({
  metodo: "Que data sabe?",
  concepcion: "Data da conceção",
  fechaConcepcion: "Conceção estimada",
  fechaAyuda: "Se escolher a última menstruação, indique o primeiro dia da hemorragia.",
  errorCiclo: "A duração do ciclo tem de ficar entre 20 e 45 dias.",
  notaPasada: "Já passaram mais de 42 semanas desde essa data, por isso a idade gestacional não aparece.",
  aviso: "É uma estimativa: poucos bebés nascem exatamente na data prevista. As ecografias e as consultas de vigilância da gravidez dão a data mais precisa.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
