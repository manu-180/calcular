# Bitácora de mejora continua

Una entrada por corrida, la más nueva arriba. Es la memoria del agente (`docs/medicion/AGENTE.md`):
qué se cambió, con qué hipótesis, contra qué valor de antes y cuándo se evalúa.

Formato:

```
## AAAA-MM-DD
- **<página>** · fuga <paso> (<valor> vs <referencia>, <n> perdidas)
  - Cambio: <qué ve distinto la persona> · <experimento <id> | directo>
  - Antes: <métrica de base, con n>
  - Se evalúa: <fecha o «cuando el experimento tenga veredicto»>
- Evaluado: <cambio anterior> → <resultado con números> · <se queda | se revierte>
```

## 2026-10-24 (corrida del agente)
- Sin cambios publicados: `check-all` da rojo en `main` limpio (probado con el cambio guardado
  aparte), en cuatro suites que no toqué:
  - `check_mes_en_render`: 11 páginas evalúan `textosDe()`/`textosMundo()`/`textosSueldos()` a
    nivel de módulo (auth, cuenta, login, registro, recuperar, sueldo-en-el-mundo, sueldos-reales).
  - `check_panel_sql`: no cuenta las 6 tablas `ca_sueldos_*` ni sus funciones `security definer`
    (llegaron con «sueldos reales», migración `20261024150000`).
  - `check_ofertas_intl`: `cl/sueldo-liquido` y `cl/finiquito` difieren de la planilla en el tope
    imponible (3.707.987 contra 3.708.942: parece la UF desfasada entre planilla y calculadora).
  - `check_hreflang`: clústeres de inflación de calcularya en producción no recíprocos
    (`/xx/inflacion` contra `au`/`nz`/`sg`/`hk`/`my`/`ph`/`kw`/`inflation-calculator`).
- Sin experimentos para cerrar ni cambios anteriores para evaluar.
- Lo elegido, listo para la próxima corrida con `check-all` en verde (no se tocan cifras: todo sale
  de `calcularComercio` y de la escala):
  - **/convenios/comercio** · fuga buscador (0.9 % vs 4.9 %, 4610 impresiones, 181 perdidas)
    - Cambio: `generateMetadata` con la cifra de 8 horas del mes vigente. Title «Sueldo de Comercio
      octubre 2026: $ 1.458.545 por 8 horas»; description «Cuánto cobra un empleado de comercio por
      8 horas en octubre 2026: $ 1.458.545 brutos un Vendedor B con presentismo, unos $ 1.228.792
      en mano. Por 4 horas, la mitad. Calculá tu categoría con la escala de FAECYS.» · directo
    - Antes: «cuanto cobra un empleado de comercio por 8 horas» 0/214 (pos 7.6); «cuánto cobra un
      empleado de comercio por 4 horas 2026» 2/198 (pos 4.2); «cuanto cobra un empleado de comercio
      por 4 horas» 1/180 (pos 7.1). Ojo: `/convenios/comercio/por-horas` es del 2026-10-16 y apunta a
      las mismas consultas; puede que todavía no se vea en los datos.
  - **/convenios/comercio/octubre-2026** · fuga buscador (2.0 % vs 9.4 %, 1372 impresiones, 102 perdidas)
    - Cambio: en la plantilla `[mes]`, title «Sueldo de Comercio <mes>: desde <mínimo de básico +
      no remunerativo entre categorías>» (octubre: $ 1.303.900) en vez del básico de Maestranza A
      solo; la description empieza con «Cuánto cobra un empleado de comercio en <mes>, categoría por
      categoría». Cambia todos los meses de comercio, no sólo octubre · directo
    - Antes: «sueldo empleado de comercio octubre 2026» 14/733 (pos 4.1); «sueldo comercio octubre
      2026» 0/72 (pos 2.4); «sueldo empleados de comercio octubre 2026» 2/66 (pos 2.7).

## 2026-10-24
- Arranca la medición de fugas (migración `20261024160000`): resultado, campo donde se traban,
  clics de rabia, Web Vitals por carga y experimentos A/B. El paso «resultado» y la velocidad
  empiezan a tener datos desde hoy; el primer informe con ventana completa es el del 2026-11-09.
- Primer informe (`informes/2026-10-23.md`): la fuga más grande está antes de entrar, en Google.
  `/convenios/comercio` sale para «cuánto cobra un empleado de comercio por 8 / 4 horas» y casi nadie
  la elige (0/214, 2/198). En el sitio, la home rebota 57 % contra 20 % de referencia.
