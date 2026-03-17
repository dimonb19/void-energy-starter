#!/bin/bash
# PostToolUse hook: run token scan after SCSS/Svelte edits
# Blocks (exit 1) when raw values are found in consumer files

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | node -e "
  let d=''; process.stdin.on('data',c=>d+=c); process.stdin.on('end',()=>{
    try { const j=JSON.parse(d); console.log(j.tool_input?.file_path||''); }
    catch(e) { console.log(''); }
  });
")

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only scan consumer SCSS and Svelte files (skip read-only system paths)
case "$FILE_PATH" in
  */styles/*|*/components/ui/*|*/components/icons/*|*/components/core/*)
    exit 0
    ;;
  *.scss|*.svelte)
    SCAN_OUTPUT=$(npm run scan 2>&1)
    SCAN_EXIT=$?
    if [ $SCAN_EXIT -ne 0 ]; then
      echo "BLOCKED: Token scan found raw values (px, hex, rgb, hsl). Use semantic tokens only." >&2
      echo "$SCAN_OUTPUT" >&2
      exit 1
    fi
    ;;
esac

exit 0
