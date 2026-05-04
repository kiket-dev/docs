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
  );
}
