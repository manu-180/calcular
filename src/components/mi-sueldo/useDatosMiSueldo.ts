"use client";

import { useEffect, useMemo, useState } from "react";
import { prefill } from "@/lib/prefill/mi-sueldo";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { periodoActualAR } from "@/lib/hoy";

// Para las calculadoras que no son /sueldo-neto pero conocen el bruto mensual de la persona
// (aguinaldo, descuentos, salario mínimo, asignaciones): arma los datos de la Planilla Mi Sueldo
// con ese bruto y los deja para la compra. `activo` = la persona tocó el campo del sueldo; hasta
// entonces no se pisa lo que haya dejado otra calculadora (un valor de ejemplo no es su caso).
export function useDatosMiSueldo(bruto: number, activo: boolean) {
  const [ultimoAumento, setUltimoAumento] = useState<string | null>(null);
  const datos = useMemo(
    () =>
      activo && bruto > 0
        ? prefill.validar({
            bruto,
            sindicalPct: 0,
            periodo: periodoActualAR(),
            ultimoAumento,
            conyuge: false,
            hijos: 0,
            otrasDeducciones: 0,
          })
        : null,
    [activo, bruto, ultimoAumento],
  );
  useEffect(() => {
    if (!activo) return;
    if (datos) recordarDatosCompra("planilla-mi-sueldo", datos);
    else olvidarDatosCompra("planilla-mi-sueldo");
  }, [activo, datos]);
  return { datos, setUltimoAumento };
}
