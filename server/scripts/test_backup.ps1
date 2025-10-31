$ErrorActionPreference = 'Stop'
$api = 'http://localhost:5000'
$loginBody = @{ email='admin@demo.com'; password='020687' } | ConvertTo-Json
$login = Invoke-RestMethod -Uri "$api/api/auth/login" -Method Post -ContentType 'application/json' -Body $loginBody
Write-Host "Login response:" ($login | ConvertTo-Json -Depth 5)
$token = $login.token
if (-not $token) { throw 'Token alınamadı' }
$headers = @{ Authorization = "Bearer $token" }
$resp = Invoke-RestMethod -Uri "$api/api/admin/backups" -Method Post -Headers $headers
Write-Host "Backup response:" ($resp | ConvertTo-Json -Depth 5)