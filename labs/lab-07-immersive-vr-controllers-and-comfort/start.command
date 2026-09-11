#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$HERE/../../webapp"
if [ ! -d "$APP/node_modules" ]; then npm --prefix "$APP" install --legacy-peer-deps; fi
npm --prefix "$APP" run dev
