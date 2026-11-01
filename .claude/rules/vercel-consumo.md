---
paths:
  - "vercel.json"
  - "next.config.ts"
---

# Consumo de Vercel

- Las ramas `claude/**` no deployan en Vercel (`git.deploymentEnabled` en `vercel.json`). Del 1 al
  12/10/2026 hubo 240 previews de esas ramas contra 49 deploys de producción: los previews fueron
  ~80% de los minutos de build, y el build era el 85% del gasto del proyecto (US$5,96 de US$7,00).
  Nadie los usaba: el CI de GitHub ya buildea cada rama y la verificación se hace en local.
- Si hace falta un preview puntual: `vercel deploy` desde la rama (CLI), no reabrir el glob.
- No sacar `ignoreCommand`: evita buildear producción cuando el commit sólo toca docs.
- El commit de punta de main tiene que tener de autor a manu-180: con otro autor Vercel no deploya aunque el build
  esté bien (1/11/2026: el merge del PR #188 hecho por la API con otra cuenta quedó con autor mnltecno y su deploy
  falló a los 3 minutos; el build local del mismo commit pasa). El botón y la API de merge ponen de autor a quien mergea.
