#!/usr/bin/env bash
#
# Copyright © 2026 Guillaume AGNIERAY
#
# This script is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This script is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program. If not, see <https://www.gnu.org/licenses/>.

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="${ROOT_DIR}/dist"
TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "${TMP_DIR}"
}

trap cleanup EXIT

usage() {
  echo "Usage: $0 <version>"
  echo "Example: $0 8.10.5"
  exit 1
}

if [[ $# -ne 1 ]]; then
  usage
fi

VERSION="$1"

if [[ ! "${VERSION}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Error: the version must follow the X.Y.Z format, for example 8.10.5." >&2
  exit 1
fi

cd "${ROOT_DIR}"

if ! git rev-parse --verify --quiet "refs/tags/${VERSION}" >/dev/null; then
  echo "Error: the Git tag '${VERSION}' does not exist." >&2
  exit 1
fi

echo "Checking out tag ${VERSION}..."
git checkout --quiet --detach "refs/tags/${VERSION}"

if ! command -v zip >/dev/null 2>&1; then
  echo "Error: the 'zip' command is required." >&2
  exit 1
fi

echo "Installing npm dependencies..."
npm install

rm -rf "${DIST_DIR}"
mkdir -p "${DIST_DIR}"

# ----------------------------------------------------------------------
# Theme archive
# ----------------------------------------------------------------------

echo "Building theme assets..."
npm run build:theme

THEME_ROOT="opale-${VERSION}"
THEME_STAGE="${TMP_DIR}/${THEME_ROOT}"

mkdir -p "${THEME_STAGE}"

# Copy theme asset directories only when they exist.
for directory in stylesheets webfonts favicon images; do
  if [[ -d "${directory}" ]]; then
    cp -R "${directory}" "${THEME_STAGE}/"
  fi
done

# Copy release documentation files when they exist.
for file in README LICENSE AUTHORS CONTRIBUTING; do
  if [[ -f "${file}" ]]; then
    cp "${file}" "${THEME_STAGE}/"
  fi
done

# Also support Markdown variants of the documentation files.
for file in README.md LICENSE.md AUTHORS.md CONTRIBUTING.md; do
  if [[ -f "${file}" ]]; then
    cp "${file}" "${THEME_STAGE}/"
  fi
done

(
  cd "${TMP_DIR}"
  zip -qr "${DIST_DIR}/${THEME_ROOT}.zip" "${THEME_ROOT}"
)

echo "Archive of the theme created: ${DIST_DIR}/${THEME_ROOT}.zip"

# ----------------------------------------------------------------------
# Plugins archives
# ----------------------------------------------------------------------

echo "Building plugins assets..."
npm run build:plugins

if [[ ! -d plugins ]]; then
  echo "Error: the 'plugins' directory does not exist." >&2
  exit 1
fi

# Match regular plugin directories only.
shopt -s nullglob

plugin_directories=(plugins/*/)

if [[ ${#plugin_directories[@]} -eq 0 ]]; then
  echo "Error: no plugin was found." >&2
  exit 1
fi

for plugin_directory in "${plugin_directories[@]}"; do
  [[ -d "${plugin_directory}" ]] || continue

  plugin_name="$(basename "${plugin_directory}")"
  archive_root="opale-${plugin_name}-${VERSION}"
  plugin_stage="${TMP_DIR}/${archive_root}"

  mkdir -p "${plugin_stage}"

  # Copy the plugin contents directly to the archive root.
  # The plugins/<plugin_name>/ directory is not preserved.
  plugin_files=("${plugin_directory}"/*)

  if [[ ${#plugin_files[@]} -gt 0 ]]; then
    cp -R "${plugin_files[@]}" "${plugin_stage}/"
  fi


  # Copy plugin documentation files from the repository root.
  for file in AUTHORS CONTRIBUTING LICENSE README; do
    if [[ -f "${file}" ]]; then
      cp "${file}" "${plugin_stage}/"
    fi
  done

  # Also support Markdown variants of the documentation files.
  for file in AUTHORS.md CONTRIBUTING.md LICENSE.md README.md; do
    if [[ -f "${file}" ]]; then
      cp "${file}" "${plugin_stage}/"
    fi
  done

  (
    cd "${TMP_DIR}"
    zip -qr "${DIST_DIR}/${archive_root}.zip" "${archive_root}"
  )

  echo "Archive of the plugin ${plugin_name} created: ${DIST_DIR}/${archive_root}.zip"
done

echo
echo "All archives were generated in ${DIST_DIR}."
