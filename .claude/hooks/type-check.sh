#!/bin/bash
# PostToolUse hook: run svelte-check after TS/Svelte edits
# Blocks (exit 1) when type errors are found in consumer files

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

# Only check consumer TypeScript and Svelte files (skip read-only system paths)
case "$FILE_PATH" in
  */components/ui/*|*/components/icons/*|*/components/core/*|*/styles/*|*/types/*)
    exit 0
    ;;
  *.ts|*.svelte)
    CHECK_OUTPUT=$(npm run check 2>&1)
    CHECK_EXIT=$?
    if [ $CHECK_EXIT -ne 0 ]; then
      echo "BLOCKED: Type check found errors. Fix them before continuing." >&2
      echo "$CHECK_OUTPUT" | tail -30 >&2
      exit 1
    fi
    ;;
esac

exit 0