/**
 * Normalizes legacy README copy pulled into the docs site toward Kiket 2.0 vocabulary
 * (workspace, case, operational compliance) without rewriting extension API payloads.
 */
export function sanitizeLegacyContent(md) {
  return (
    md
      .replaceAll(/Kiket Platform v1\.0\+/g, 'Kiket Platform')
      .replaceAll(/Rails encrypted attributes/gi, 'encrypted at rest in the Kiket API')
      .replaceAll(/Rails-era snake_case/gi, 'legacy snake_case')
      // Integration / marketing phrasing (avoid touching JSON keys like kiket_project_id)
      .replaceAll(
        /Sync pull requests, mirror issues, track CI\/CD status, and automate workflows between GitHub and Kiket\./g,
        'Sync pull requests, mirror GitHub issues into operational cases where configured, track CI/CD status, and automate workflows between GitHub and your Kiket workspace.',
      )
      .replaceAll(
        /Bidirectional sync between GitHub issues and Kiket issues/g,
        'Bidirectional sync between GitHub issues and Kiket operational cases',
      )
      .replaceAll(
        /Register and manage GitHub repositories with Kiket projects/g,
        'Register and manage GitHub repositories with Kiket workspaces',
      )
      .replaceAll(
        /Auto-link commits to Kiket issues via commit messages/g,
        'Auto-link commits to Kiket cases via commit messages',
      )
      .replaceAll(
        '- issues (list/show/create/transition + issue types)',
        '- cases (list/show/create/transition + case types)',
      )
      .replaceAll(
        '- planning metadata: `list_milestones`, `list_issue_types`',
        '- planning metadata: `list_milestones`, `list_issue_types` (case types; legacy tool id)',
      )
      // Webhook examples and event names
      .replaceAll(/issue\.created/g, 'case.created')
      .replaceAll(/issue\.updated/g, 'case.updated')
      .replaceAll(/issue\.transitioned/g, 'case.transitioned')
      .replaceAll(/issue\.assigned/g, 'case.assigned')
      .replaceAll(/issue\.commented/g, 'case.commented')
      .replaceAll(/"issue\./g, '"case.')
      .replaceAll(/`issue\./g, '`case.')
      // REST paths (platform cutover)
      .replaceAll(/\/api\/v1\/issues\/([^/\s"']+)\/transitions/g, '/api/v1/platform/cases/$1/transition')
      .replaceAll(/\/api\/v1\/issues\/([^/\s"']+)/g, '/api/v1/platform/cases/$1')
      .replaceAll(/\/api\/v1\/issues(?=[/?\s"'])/g, '/api/v1/platform/cases')
      // API example field names
      .replaceAll(/"projectKey"/g, '"workspaceId"')
      .replaceAll(/projectKey=/g, 'workspaceId=')
      .replaceAll(/"issueType"/g, '"processId"')
      .replaceAll(/\bissue types?\b/gi, (match) => (match[0] === match[0].toUpperCase() ? 'Case types' : 'case types'))
      .replaceAll(/\bissues\b/g, (match, offset, source) => {
        // Preserve "GitHub issues" and similar external-system references
        const before = source.slice(Math.max(0, offset - 12), offset).toLowerCase();
        if (before.includes('github ') || before.includes('jira ')) return match;
        return match === 'Issues' ? 'Cases' : 'cases';
      })
      .replaceAll(/\bissue\b/g, (match, offset, source) => {
        const before = source.slice(Math.max(0, offset - 12), offset).toLowerCase();
        if (before.includes('github ') || before.includes('jira ')) return match;
        return match === 'Issue' ? 'Case' : 'case';
      })
      .replaceAll(/\bprojects\b/g, (match) => (match === 'Projects' ? 'Workspaces' : 'workspaces'))
      .replaceAll(/\bproject\b/g, (match) => (match === 'Project' ? 'Workspace' : 'workspace'))
      .replaceAll(/issues\.read/g, 'cases.read')
      .replaceAll(/issues\.write/g, 'cases.write')
      .replaceAll(/sdk\.webhook\("case\./g, 'sdk.webhook("case.')
      .replaceAll(
        /An issue is created \(via UI, intake form, or API\)/g,
        'A case is created (via UI, intake form, or API)',
      )
      .replaceAll(/A new issue is created/g, 'A new operational case is created')
      .replaceAll(/"issue":/g, '"case":')
      .replaceAll(/payload\.issue\b/g, 'payload.case')
      .replaceAll(/payload\['issue'\]/g, "payload['case']")
      .replaceAll(/kiket\.issues\b/g, 'kiket.cases')
      .replaceAll(/issue\.processed/g, 'case.processed')
      .replaceAll(/\bissueId\b/g, 'caseId')
      .replaceAll(/\/webhooks\/issue\./g, '/webhooks/case.')
  );
}
