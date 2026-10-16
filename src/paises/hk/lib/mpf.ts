export interface ReglasMpf {
  tasa: number;
  minimo: number;
  maximo: number;
}

export interface AporteMpf {
  empleado: number;
  empleador: number;
  base: number;
}

// MPFA: por debajo del mínimo de ingreso relevante solo aporta el empleador; por encima del máximo
// los dos aportan sobre el máximo.
export function aporteMensual(ingresoRelevante: number, r: ReglasMpf): AporteMpf {
  const ingreso = Math.max(0, ingresoRelevante);
  const base = Math.min(ingreso, r.maximo);
  const empleador = (base * r.tasa) / 100;
  const empleado = ingreso < r.minimo ? 0 : empleador;
  return { empleado, empleador, base };
}
