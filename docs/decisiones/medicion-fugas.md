# Medición de fugas y mejora continua (2026-10-24)

Pedido de Manuel: que Claude sepa con datos reales dónde se pierde la gente en calcular.ar y
calcularya.com, por país, y mejore la plataforma solo, de forma continua.

## Qué se decidió

**Medición propia, no una herramienta de terceros.** Ya existía `/api/e` (vistas, tiempo activo,
scroll, uso, eventos) sin cookies ni IP. Se le sumó lo que faltaba para ver el embudo completo:

| Dato | Cómo se obtiene | Columna |
|---|---|---|
| Llegó a un resultado | Cambia el número en la región `aria-live` de `<main>` después de que la persona tocó un campo (todas las calculadoras de calcular.ar y `PielCalculadora` del motor la tienen) | `resultado_ms` |
| Dónde se trabó | Texto del label del último campo tocado (nunca el valor) | `campo_ult` |
| Frustración | 3 toques en < 800 ms en el mismo lugar, fuera de campos y `[data-repetible]` | `rabia`, `rabia_el` |
| Velocidad real | `web-vitals/attribution` 5 en la página de entrada, carga diferida | `lcp_ms`, `inp_ms`, `cls_milli`, `ttfb_ms`, `lcp_el`, `inp_el` |
| Experimento | Variante asignada antes del pintado por hash del `ca_vid` | `exp` |

Microsoft Clarity se descartó: su API de exportación da 10 consultas por día y 3 días de historia,
pide consentimiento para visitantes de Europa (calcularya tiene ediciones europeas), suma un script de
terceros a cada página y las grabaciones no le sirven a un agente. Lo que Claude necesita (embudo,
campo, rabia, vitals) sale de la medición propia.

**Search Console por consulta.** El primer informe mostró que la fuga más grande está antes de
entrar: páginas en posición 4-7 que casi nadie elige. El CTR esperado se calcula por consulta y
posición (`ctrEsperado`), no con la posición media de la página, que mezcla consultas en las que la
página sale 3.ª con otras en que sale 40.ª.

**Estadística.** Una fuga exige evidencia: la cota de Wilson al 95 % no llega a la referencia del
sitio (mediana de sus páginas), con ≥ 30 casos, y se ordena por personas perdidas, suavizando con
20 casos de la referencia para que una página chica no encabece la lista. Los experimentos se
deciden con P(b > a) ≥ 95 % (beta-binomial) y ≥ 200 vistas por variante, con chequeo de reparto
(SRM, χ² p < 0,001). Vencen a las 6 semanas: sin ganador, queda la «a».

**Experimentos sin servidor.** Las páginas son estáticas (ISR); volverlas dinámicas para un A/B
costaría velocidad. Un script inline en `<head>` asigna la variante y el CSS esconde la otra: sin
parpadeo y sin JS se ve la «a». Sin experimentos activos no se agrega ni un byte.

**Cadencia.** Informe y agente cada lunes (ventana de 14 días contra los 14 anteriores: con el
tráfico de octubre de 2026, una semana sola no alcanza para casi ninguna página). La decisión de
cortar un experimento la toma el tamaño de muestra, no el calendario. El primer lunes del mes el
agente revisa además cada país de calcularya con ≥ 100 sesiones.

## Piezas

- Captura: `src/lib/rastreo.ts` · protocolo: `src/app/api/e/protocolo.ts` · escritura: `route.ts`.
- Base: `supabase/migrations/20261024160000_ca_medicion_fugas.sql` (`ca_cerrar_vista2`, `ca_fugas`).
- Análisis: `src/lib/medicion/fugas.ts` · informe: `scripts/medicion/informe.ts`.
- Experimentos: `src/lib/experimentos.ts`, `src/components/Experimentos.tsx`.
- Loop: `.github/workflows/mejora-continua.yml` + `docs/medicion/AGENTE.md` + `docs/medicion/BITACORA.md`.
- Pruebas: `scripts/check_medicion_fugas.ts`, `probarFugas` en `scripts/check_panel_sql.ts`.

## Trampas

- El paso uso → resultado se mide sobre `usos_medidos` (usos con `campo_ult`): los usos anteriores
  al 24/10/2026 no tienen cómo haber llegado a un resultado y lo hundirían.
- Los errores de extensiones y navegadores in-app (xbrowser, MetaMask, webviews) se filtran en
  `ca_fugas` (CTE `ruido`); sin eso aparecen como fuga en las páginas con más tráfico.
- La función `ca_fugas` se re-aplica con `create or replace`: cambiarle la firma obliga a ajustar el
  revoke/grant y el conteo de funciones de `check_panel_sql`.
- calcularya.com no está en Search Console con la cuenta de servicio: hasta que se sume, su paso
  «buscador» no existe (el informe sigue sin él).
