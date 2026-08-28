#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
if [ -x "$ROOT/.venv/bin/uvicorn" ]; then
  UVICORN="$ROOT/.venv/bin/uvicorn"
else
  UVICORN="uvicorn"
fi
"$UVICORN" app:app --host 127.0.0.1 --port 8000 &
cd "$ROOT/web"
exec npx next dev -H 127.0.0.1 -p 3000
