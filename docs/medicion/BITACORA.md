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

## 2026-10-24
- Arranca la medición de fugas (migración `20261024160000`): resultado, campo donde se traban,
  clics de rabia, Web Vitals por carga y experimentos A/B. El paso «resultado» y la velocidad
  empiezan a tener datos desde hoy; el primer informe con ventana completa es el del 2026-11-09.
- Primer informe (`informes/2026-10-23.md`): la fuga más grande está antes de entrar, en Google.
  `/convenios/comercio` sale para «cuánto cobra un empleado de comercio por 8 / 4 horas» y casi nadie
  la elige (0/214, 2/198). En el sitio, la home rebota 57 % contra 20 % de referencia.
