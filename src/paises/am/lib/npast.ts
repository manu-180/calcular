export const NVAZAGUYN_NPASTI_HARK = 20;

// ՀՕ-160-Ն, հոդված 22, մաս 1: en esta ley el mínimo es la suma del monto del artículo 1 y del impuesto
// sobre la renta calculado sobre ese monto (lectura literal; ver INFORME).
export function nvazaguynNpasti(nvazaguyn: number, yekamtayin: number): number {
  return nvazaguyn + (nvazaguyn * yekamtayin) / 100;
}
