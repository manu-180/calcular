import type { Detector, HallazgoNorma, Http } from "@/motor/tipos";

const SSB = "https://socialsecurity.org.bz/contributions/";
const CONOCIDOS = ["Cont_Ben_Schedule.pdf", "FP_10X16_Cont_Benefit_F-1.pdf"];

// La página de contribuciones enlaza el cuadro vigente. Si aparece un cuadro que no leímos, el Board
// publicó uno nuevo y los datos bz.ssb-* pueden haber cambiado.
async function cuadroSsb(http: Http, url: string): Promise<readonly HallazgoNorma[] | null> {
  const html = await http.texto(url, { userAgentNavegador: true });
  if (!/Social Security Board/i.test(html)) return null;
  const enlaces = [...html.matchAll(/href="(https:\/\/[^"]*(?:Schedule|Cont_Ben)[^"]*\.pdf)"/gi)].map((m) => m[1]);
  if (!enlaces.length) return null;
  const nuevo = enlaces.find((e) => !CONOCIDOS.some((c) => e.endsWith(c)));
  return nuevo ? [{ titulo: "The Social Security Board links a new contribution schedule", url: nuevo, fecha: "2026-10-29" }] : [];
}

export const detectores: readonly Detector[] = [
  {
    id: "bz.ssb-schedule",
    carril: "norma",
    datos: ["bz.ssb-insurable-earnings", "bz.ssb-employee-weekly", "bz.ssb-employer-weekly", "bz.ssb-total-rate", "bz.ssb-wage-ceiling", "bz.ssb-injury-only-weekly"],
    metodo: "html",
    url: SSB,
    userAgentNavegador: true,
    traer(http) {
      return cuadroSsb(http, this.url);
    },
  },
];
