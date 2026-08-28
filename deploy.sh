#!/bin/bash
set -euo pipefail
export PATH="$HOME/.fly/bin:$PATH"

if ! fly auth whoami >/dev/null 2>&1; then
  echo "Log into Fly in this terminal, then re-run ./deploy.sh"
  fly auth login
fi

APP="hackzilla-dublin-noise"
if ! fly apps list | grep -q "$APP"; then
  fly apps create "$APP" --yes || fly apps create "$APP"
fi

# Load local secrets without printing them.
set -a
# shellcheck disable=SC1091
source .env
set +a

SESSION_SECRET_VAL="${SESSION_SECRET:-}"
if [ -z "$SESSION_SECRET_VAL" ]; then
  SESSION_SECRET_VAL="$(python3 -c 'import secrets; print(secrets.token_hex(32))')"
fi

fly secrets set --app "$APP" \
  SONITUS_USERNAME="${SONITUS_USERNAME}" \
  SONITUS_PASSWORD="${SONITUS_PASSWORD}" \
  SONITUS_BASE_URL="${SONITUS_BASE_URL:-https://data.smartdublin.ie/sonitus-api}" \
  GROQ_API_KEY="${GROQ_API_KEY:-}" \
  GROQ_MODEL="${GROQ_MODEL:-openai/gpt-oss-20b}" \
  SESSION_SECRET="${SESSION_SECRET_VAL}" \
  --stage

fly deploy --remote-only --app "$APP"
echo
echo "Live: https://${APP}.fly.dev"
