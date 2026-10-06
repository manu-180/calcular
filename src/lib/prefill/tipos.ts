import type ExcelJS from "exceljs";

// Contrato entre la calculadora (lo que la persona ya cargó) y el entregable que compra.
// Los datos viajan en la metadata de la preferencia de MercadoPago y vuelven en el pago:
// por eso la descarga (o el informe) se arma con ellos aunque se abra días después desde el mail.
// `validar` corre en el servidor sobre JSON que manda el navegador: es input hostil.
export type Prefill<D> = {
  validar(raw: unknown): D | null;
  aplicar?(wb: ExcelJS.Workbook, datos: D): void;
};
