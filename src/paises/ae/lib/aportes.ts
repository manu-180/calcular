import { enMapa, porcentaje } from "@/motor/calculo";

type Mapa = Readonly<Record<string, number>>;

// u.ae: primera categoría "menos de 16.000", segunda "más de 16.000". Un básico de exactamente 16.000
// queda en la segunda, que es la que no deja al trabajador sin cubrir.
export function categoriaIloe(basico: number, t: Mapa): "low" | "high" {
  return basico < enMapa(t, "threshold") ? "low" : "high";
}

export function primaIloe(basico: number, t: Mapa): number {
  return categoriaIloe(basico, t) === "low" ? enMapa(t, "premium-low") : enMapa(t, "premium-high");
}

export function compensacionIloe(basico: number, t: Mapa): number {
  const tope = categoriaIloe(basico, t) === "low" ? enMapa(t, "cap-low") : enMapa(t, "cap-high");
  return Math.min(porcentaje(basico, enMapa(t, "benefit-rate")), tope);
}

export function aportesGpssa(salario: number, t: Mapa) {
  return {
    empleado: porcentaje(salario, enMapa(t, "employee")),
    empleador: porcentaje(salario, enMapa(t, "employer")),
    gobierno: porcentaje(salario, enMapa(t, "government")),
  };
}
