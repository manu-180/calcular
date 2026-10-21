# ASCII-only. Registra la tarea programada que despierta al agente de soporte cada 5 minutos.
# Corre como el usuario actual (necesita ~\.claude, envkit y gh del usuario). Re-ejecutable.
$boot   = Join-Path $env:LOCALAPPDATA "calcular-soporte\despachar.ps1"
New-Item -ItemType Directory -Force (Split-Path $boot) | Out-Null
# Copia fuera del worktree: despachar.ps1 resetea ese worktree en cada tick.
Copy-Item (Join-Path $PSScriptRoot "despachar.ps1") $boot -Force
$accion   = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$boot`""
$disparo  = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration (New-TimeSpan -Days 3650)
$ajustes  = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 1) -MultipleInstances IgnoreNew -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "CalculAR-Soporte" -Action $accion -Trigger $disparo -Settings $ajustes -RunLevel Limited -Force | Out-Null
Write-Host "Tarea CalculAR-Soporte registrada (cada 5 min) -> $boot"
