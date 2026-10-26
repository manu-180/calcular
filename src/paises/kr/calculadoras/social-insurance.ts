import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { truncar10 } from "../lib/impuestos";
import { REQ_SEGUROS, tasasSeguros } from "../lib/requisitos";
import { segurosMensuales } from "../lib/seguros";

export default definirCalculadora({
  id: "kr.social-insurance",
  mercado: "kr",
  concepto: "aportes-seguridad-social",
  slug: "social-insurance",
  estado: "publicado",
  requiere: { ...REQ_SEGUROS, "kr.employment-stability-rate": "mapa" },
  campos: [
    { id: "bosu", tipo: "moneda", etiqueta: "월 보수(비과세 제외)", min: 0, porDefecto: 3000000 },
    { id: "gyumo", tipo: "opcion-dato", dato: "kr.employment-stability-rate", etiqueta: "회사 규모(고용안정·직업능력개발 보험료)", porDefecto: "u150" },
    { id: "sanjae", tipo: "porcentaje", etiqueta: "산재보험료율(%)", min: 0, max: 20, porDefecto: 0, ayuda: "업종마다 달라요. 회사가 받은 고지서의 요율을 알면 넣고, 모르면 0으로 두세요." },
  ],
  calcular(e, v) {
    if (e.bosu <= 0) throw new ErrorEntrada("월 보수를 입력하세요.", "bosu");
    const s = segurosMensuales(e.bosu, tasasSeguros(v));
    const estabilidad = enMapa(v["kr.employment-stability-rate"], e.gyumo);
    const empleoEmpresa = truncar10((e.bosu * (v["kr.employment-insurance-rate"] / 2 + estabilidad)) / 100);
    const sanjae = truncar10((e.bosu * e.sanjae) / 100);
    const empresa = s.pension + s.salud + s.cuidado + empleoEmpresa + sanjae;
    const observaciones: string[] = [];
    if (s.basePension !== e.bosu) observaciones.push("국민연금은 기준소득월액 하한액이나 상한액을 기준으로 계산했어요.");
    return {
      trabajador: s.total,
      pension: s.pension,
      salud: s.salud,
      cuidado: s.cuidado,
      empleo: s.empleo,
      empresa,
      empleoEmpresa,
      sanjae,
      total: s.total + empresa,
      basePension: s.basePension,
      observaciones,
    };
  },
  resultado: [
    { clave: "trabajador", etiqueta: "근로자 부담 합계(월)", formato: "moneda", destacada: true },
    { clave: "pension", etiqueta: "국민연금(근로자, 회사 각각)", formato: "moneda" },
    { clave: "salud", etiqueta: "건강보험(근로자, 회사 각각)", formato: "moneda" },
    { clave: "cuidado", etiqueta: "장기요양보험(근로자, 회사 각각)", formato: "moneda" },
    { clave: "empleo", etiqueta: "고용보험(근로자)", formato: "moneda" },
    { clave: "empleoEmpresa", etiqueta: "고용보험(회사)", formato: "moneda" },
    { clave: "sanjae", etiqueta: "산재보험(회사)", formato: "moneda", ocultarSiCero: true },
    { clave: "empresa", etiqueta: "회사 부담 합계(월)", formato: "moneda" },
    { clave: "total", etiqueta: "노사 합계(월)", formato: "moneda" },
    { clave: "basePension", etiqueta: "국민연금 기준소득월액", formato: "moneda" },
  ],
});
