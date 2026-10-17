import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosPt: TextosUi<UiOvulacion> = {
  slug: "periodo-fertil",
  ui: () => ({
    fum: "Primeiro dia da última menstruação",
    fumAyuda: "O primeiro dia do sangramento, não o último.",
    ciclo: "Duração do ciclo (dias)",
    cicloAyuda: "Do primeiro dia de uma menstruação até a véspera da seguinte. Se varia, use uma média.",
    ovulacion: "Ovulação estimada",
    fertilDesde: "Período fértil de",
    fertilHasta: "Período fértil até",
    proxima: "Próxima menstruação",
    tabla: "Próximos ciclos",
    colRegla: "Menstruação",
    colDesde: "Fértil de",
    colHasta: "Fértil até",
    colOvulacion: "Ovulação",
    errorCiclo: "A duração do ciclo tem que ficar entre 21 e 45 dias.",
    aviso: "É uma estimativa para ciclos regulares. Não é um método contraceptivo e não substitui a consulta com um profissional de saúde.",
  }),
};
