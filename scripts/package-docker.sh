#!/usr/bin/env bash
# Builds the app image for both laptop chip types and saves each as a file to hand off:
#   dist/ui-test-<version>-intel.tar  -> Windows PCs and older (Intel) Macs
#   dist/ui-test-<version>-apple.tar  -> Macs with Apple chips (M1 and later)
# The version comes from package.json. Each file loads as `ui-test:latest` and
# `ui-test:<version>`, so RUNNING.md works with either file.
set -euo pipefail
cd "$(dirname "$0")/.."
version="$(node -p "require('./package.json').version")"
mkdir -p dist

for pair in "amd64:intel" "arm64:apple"; do
  platform="${pair%%:*}"
  name="${pair##*:}"
  out="dist/ui-test-${version}-${name}.tar"
  echo "Building ${version} for linux/${platform}..."
  docker build --platform "linux/${platform}" -t ui-test:latest -t "ui-test:${version}" .
  docker save ui-test:latest "ui-test:${version}" -o "$out"
  echo "Saved $out"
done
