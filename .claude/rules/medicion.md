---
paths:
  - "src/lib/rastreo.ts"
  - "src/app/api/e/**"
  - "src/lib/experimentos.ts"
  - "src/components/Experimentos.tsx"
  - "src/lib/medicion/fugas.ts"
  - "scripts/medicion/**"
  - "supabase/migrations/*fugas*"
  - "docs/medicion/**"
---

# Medición de fugas y experimentos

- El resultado se detecta por cambio de número en `main [aria-live]` tras un input de la persona: una
  calculadora nueva que muestre el resultado fuera de una región `aria-live` queda sin medir.
- `campo_ult` es el texto del label, nunca el valor; `limpiarCampo` y `limpiarSelector` son la
  barrera del servidor. No mandar montos ni texto libre por ahí.
- Un experimento vive en `EXPERIMENTOS` + `<Variante>`; máximo 3 activos, uno por página, la «a» es
  lo que había. El hash de asignación del script inline y de `asignar()` tiene que coincidir
  (`check_medicion_fugas` lo prueba).
- Cambiar la firma de `ca_fugas` o `ca_cerrar_vista2` exige ajustar revoke/grant y el conteo de
  funciones de `check_panel_sql`.
- Detalle y porqués: `docs/decisiones/medicion-fugas.md`.
