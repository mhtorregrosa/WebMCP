# Repository security posture

This public challenge repository is intentionally open source, but repository write access remains restricted to authorized collaborators.

## Branch protection

The default branch is protected by a repository ruleset that:

- blocks deletion and force pushes;
- requires pull requests before merging;
- requires the `test-and-build` status check;
- requires branches to be current with the default branch;
- requires review conversations to be resolved.

## GitHub Actions

- Repository-level workflow permissions should default to read-only.
- Workflows declare the minimum permissions they need in YAML.
- External-contributor fork workflows should require explicit approval before running.
- The Pages deployment workflow is triggered only from `main` and is the only workflow that requires `pages: write` and `id-token: write`.

## Commercial evolution

The challenge implementation is open source. Future commercial infrastructure such as the live catalog pipeline, historical pricing data, private APIs, analytics and commercial integrations should live outside this challenge repository.
