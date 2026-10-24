import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosZh: TextosUi<UiDescuento> = textosPorEscritura<UiDescuento>(
  "discount",
  () => ({
    precio: "原價",
    descuento: "折扣（%）",
    segundoDescuento: "再打折（%）",
    segundoDescuentoAyuda: "如果還有第二層折扣，請填在這裡。",
    ahorro: "省下的金額",
    final: "折後價",
    descuentoTotal: "總折扣",
    errorMayorA100: "折扣不能超過 100%。",
    observacionDoble: (efectivo) => `連續兩次折扣不能直接相加：合起來是減價 ${efectivo}%。`,
  }),
  () => ({
    precio: "原价",
    descuento: "折扣（%）",
    segundoDescuento: "叠加折扣（%）",
    segundoDescuentoAyuda: "如果还有第二层折扣，请填在这里。",
    ahorro: "节省的金额",
    final: "折后价",
    descuentoTotal: "总折扣",
    errorMayorA100: "折扣不能超过 100%。",
    observacionDoble: (efectivo) => `连续两次折扣不能直接相加：合起来是降价 ${efectivo}%。`,
  }),
);
