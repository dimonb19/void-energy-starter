#!/bin/bash
# PreToolUse hook: block edits to generated and read-only system files
# Exit 2 = block the tool execution

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

# Block edits to generated files
case "$FILE_PATH" in
  *_generated-themes.scss|*void-registry.json|*void-physics.json)
    echo "BLOCKED: This is a generated file. Edit src/config/design-tokens.ts instead, then run npm run build:tokens." >&2
    exit 2
    ;;
esac

# Block edits to read-only system files
case "$FILE_PATH" in
  */components/ui/*|*/components/icons/*|*/components/core/*)
    echo "BLOCKED: Read-only system file. Compose from src/pages/ and src/components/app/ instead. See .claude/rules/read-only-system.md." >&2
    exit 2
    ;;
  */styles/*)
    echo "BLOCKED: Read-only system stylesheet. Use Tailwind utilities and shipped classes for page composition. See .claude/rules/styling.md." >&2
    exit 2
    ;;
  */types/*)
    echo "BLOCKED: Read-only type definition. Use the shipped types via imports; do not modify them. See .claude/rules/read-only-system.md." >&2
    exit 2
    ;;
  */config/design-tokens.ts)
    echo "BLOCKED: Read-only design tokens file. Use the shipped CSS variables and Tailwind tokens instead. See .claude/rules/read-only-system.md." >&2
    exit 2
    ;;
esac

exit 0