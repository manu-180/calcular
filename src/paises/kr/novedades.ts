import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "kr.minimum-wage-2027",
    fecha: "2026-10-24",
    titulo: "2027년 최저임금은 시간급 10,700원으로 정해졌어요",
    texto: "고용노동부가 2026년 8월 5일에 고시했어요. 2027년 1월 1일부터 적용되고, 주 40시간 기준 월 환산액은 2,236,300원(209시간)이에요. 최저임금과 주휴수당 계산기는 날짜에 맞춰 새 금액을 써요.",
    vigenteDesde: "2027-01-01",
    calculadoras: ["kr.minimum-wage", "kr.weekly-holiday-pay"],
    fuente: {
      organismo: "국가법령정보센터(법제처)",
      titulo: "2027년 적용 최저임금 고시(고용노동부 고시 제2026-60호)",
      url: "https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000283564",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "kr.pension-limits-2026-07",
    fecha: "2026-10-24",
    titulo: "국민연금 기준소득월액 상한액이 659만원으로 올랐어요",
    texto: "2026년 7월분부터 2027년 6월분까지 하한액은 41만원, 상한액은 659만원이에요. 월 보수가 상한을 넘는 사람은 국민연금 보험료가 늘어요.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["kr.take-home-pay", "kr.social-insurance"],
    fuente: {
      organismo: "국가법령정보센터(법제처)",
      titulo: "국민연금 기준소득월액 하한액과 상한액(보건복지부 고시 제2026-31호)",
      url: "https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000274228",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "kr.insurance-rates-2026",
    fecha: "2026-10-24",
    titulo: "2026년 건강보험료율 7.19%, 국민연금 9.5%",
    texto: "2026년 1월분부터 건강보험료율은 7.19%, 장기요양보험료율은 소득의 0.9448%예요. 국민연금 보험료율은 9.5%로 올랐고 근로자와 회사가 4.75%씩 내요.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kr.take-home-pay", "kr.social-insurance"],
    fuente: {
      organismo: "국가법령정보센터(법제처)",
      titulo: "국민건강보험법 시행령 제44조",
      url: "https://www.law.go.kr/법령/국민건강보험법시행령/제44조",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "kr.unemployment-cap-2026",
    fecha: "2026-10-24",
    titulo: "구직급여 하루 상한액이 68,100원으로 올랐어요",
    texto: "2026년 1월 1일 이후 이직한 사람부터 기초일액 상한이 113,500원이 되면서, 구직급여일액 상한은 그 60%인 68,100원이에요.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["kr.unemployment-benefit"],
    fuente: {
      organismo: "국가법령정보센터(법제처)",
      titulo: "고용보험법 시행령 제68조",
      url: "https://www.law.go.kr/법령/고용보험법시행령/제68조",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
