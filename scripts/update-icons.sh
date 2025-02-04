OUTPUT_DIR="src/components/_abstractions/abstracted-icon"
FILLED_OUTPUT_DIR="$OUTPUT_DIR/filled"
STROKED_OUTPUT_DIR="$OUTPUT_DIR/stroked"

convert_to_pascal_case() {
  local name="$1"
  echo "$name" | sed -E 's/[-_]/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' | tr -d ' '
}

generate_index_file() {
  local dir="$1"
  local index_file="$dir/index.ts"

  echo "Generating $index_file with all components in $dir"
  find "$dir" -name "*.tsx" -exec basename {} .tsx \; |
    awk '{printf "export { default as %s } from \x27./%s\x27;\n", $1, $1}' >"$index_file"
}

echo "*************************** Creating output directories ***************************"
mkdir -p "$FILLED_OUTPUT_DIR" "$STROKED_OUTPUT_DIR"

echo "*************************** Converting SVGs to React components (TypeScript)... ***************************"
for dir in "$FILLED_OUTPUT_DIR" "$STROKED_OUTPUT_DIR"; do
  for file in "$dir"/*.svg; do
    if [ -f "$file" ]; then
      filename=$(basename "$file" .svg)
      pascal_case_name=$(convert_to_pascal_case "$filename")
      mv "$file" "$dir/$pascal_case_name.svg"

      npx @svgr/cli --typescript --template @svgr/templates/ts --icon -d "$dir" "$dir/$pascal_case_name.svg"
    fi
  done
done

echo "*************************** Removing original SVG files ***************************"
find "$FILLED_OUTPUT_DIR" -name "*.svg" -exec rm {} \;
find "$STROKED_OUTPUT_DIR" -name "*.svg" -exec rm {} \;

echo "*************************** Regenerating index.ts files ***************************"
generate_index_file "$FILLED_OUTPUT_DIR"
generate_index_file "$STROKED_OUTPUT_DIR"

echo "Icons update complete..."
