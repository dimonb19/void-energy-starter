#!/bin/bash
# PreToolUse hook for Bash: block commands that write to protected directories
# Exit 2 = block the tool execution

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | node -e "
  let d=''; process.stdin.on('data',c=>d+=c); process.stdin.on('end',()=>{
    try { const j=JSON.parse(d); console.log(j.tool_input?.command||''); }
    catch(e) { console.log(''); }
  });
")

if [ -z "$COMMAND" ]; then
  exit 0
fi

# Check if the command references protected paths in a write-like context
PROTECTED_PATTERNS="components/ui/|components/icons/|components/core/|src/styles/|src/types/|config/design-tokens"

if echo "$COMMAND" | grep -qE "(>|cp |mv |mkdir |touch |tee ).*(${PROTECTED_PATTERNS})"; then
  echo "BLOCKED: Bash command appears to write to a protected system directory. Use the existing components instead. See .claude/rules/read-only-system.md." >&2
  exit 2
fi

exit 0
