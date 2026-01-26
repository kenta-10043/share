#!/bin/sh
set -e

cd /var/www/laravel

# vendor が無ければ依存を入れる（初回/クリーン環境用）
if [ ! -d "vendor" ]; then
  echo "[entrypoint] vendor not found -> composer install"
  composer install --no-interaction --prefer-dist
else
  echo "[entrypoint] vendor exists -> skip composer install"
fi

exec "$@"
