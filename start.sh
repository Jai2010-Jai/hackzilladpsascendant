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
exec ./node_modules/.bin/next start -H 0.0.0.0 -p "${PORT:-3000}"
