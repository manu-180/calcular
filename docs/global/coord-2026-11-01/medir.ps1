$pico=0;$t0=Get-Date;$log="C:\MANU\coord\mem.log";"" | Set-Content $log
while($true){
 $ps=Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object {$_.CommandLine -match 'next[\/]dist'}
 if($ps){$s=($ps | Measure-Object PrivatePageCount -Sum).Sum/1GB
  if($s -gt $pico){$pico=$s}
  "{0:n0}s {1:n2}GB n={2} pico={3:n2}" -f ((Get-Date)-$t0).TotalSeconds,$s,@($ps).Count,$pico | Add-Content $log}
 if(Test-Path C:\MANU\coord\mem.stop){break}
 Start-Sleep 5
}
"PICO {0:n2} GB" -f $pico | Add-Content $log
