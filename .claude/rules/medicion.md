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
  - "src/lib/panel/lecturas.ts"
  - "src/lib/medicion/oportunidades.ts"
  - ".github/workflows/oportunidades.yml"
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
- El detector de oportunidades (`scripts/medicion/oportunidades.ts`) corre las reglas de las tarjetas
  del panel: una regla nueva en `lecturas.ts` no se acciona sola hasta sumarla a `SE_ACCIONAN` y a la
  tabla de `AGENTE-OPORTUNIDADES.md`. El buscador y los paths los escribe cualquiera y el agente
  pushea a main en un repo público: al agente sólo llega lo validado por `aOportunidad`, y un texto
  de búsqueda nunca va al log, a un commit ni a `oportunidades.json`. No aflojar esos filtros.
- Detalle y porqués: `docs/decisiones/medicion-fugas.md`.
