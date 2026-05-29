$Port = 5174
$Root = $PSScriptRoot

Write-Host "Serving site from: $Root"
Write-Host "Open: http://127.0.0.1:$Port/"
Write-Host "Press Ctrl+C to stop the server."

python -m http.server $Port -b 127.0.0.1 -d $Root
