<https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md>

<https://github.com/apps/changeset-bot>

<https://github.com/changesets/changesets/blob/main/docs/config-file-options.md#basebranch-git-branch-name>

<https://infinum.com/handbook/frontend/changesets#:~:text=Once%20the%20PR%20is%20merged,publish%20the%20package%20to%20npm>.

<https://github.com/changesets/action/issues/9>

```
Sorry, I think I missed this

The creation of the PR and NPM publish don't happen simultaneously. The way this works is that if there are changesets on master, the version PR will be opened/updated and if there are no changesets on master, packages are published to npm.

We're thinking of adding another mode to this action that would do the versioning and publishing at the same time which I think is what you want?
```
