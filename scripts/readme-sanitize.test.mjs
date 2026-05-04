import assert from 'node:assert/strict';
import test from 'node:test';
import { sanitizeLegacyContent } from './readme-sanitize.mjs';

test('sanitizeLegacyContent maps GitHub integration headline without touching API keys', () => {
  const input = `
**POST /repositories/register**
\`\`\`json
{ "kiket_project_id": "proj-123" }
\`\`\`
Register and manage GitHub repositories with Kiket projects.
Bidirectional sync between GitHub issues and Kiket issues.
`;
  const out = sanitizeLegacyContent(input);
  assert.match(out, /kiket_project_id/);
  assert.match(out, /Kiket workspaces/);
  assert.match(out, /operational cases/);
});

test('sanitizeLegacyContent maps CLI + MCP inventory lines toward case vocabulary', () => {
  const input = `
## Current Scope
- issues (list/show/create/transition + issue types)
- planning metadata: \`list_milestones\`, \`list_issue_types\`
`;
  const out = sanitizeLegacyContent(input);
  assert.match(out, /cases \(list\/show\/create\/transition \+ case types\)/);
  assert.match(out, /case types; legacy tool id/);
});

test('sanitizeLegacyContent preserves existing generic substitutions', () => {
  const out = sanitizeLegacyContent('Kiket Platform v1.0+');
  assert.equal(out, 'Kiket Platform');
});
