# Contributing

Thank you for considering contributing to Opale.

You can contribute in the following ways:

- Finding and reporting bugs.
- Contributing code to Opale by fixing bugs or implementing features.

## Bug reports

Bug reports and feature suggestions must use descriptive and concise titles and be submitted to [GitHub Issues](https://github.com/gagnieray/opale/issues). Please use the search function to ensure that you are not submitting duplicates and that a similar report or request has not already been resolved or rejected.

## Pull requests

**Please use clean, concise titles for your pull requests.** Unless the pull request involves refactoring code, updating dependencies, or other internal tasks, assume that the person reading the pull request title is not a programmer but rather a Redmine user or administrator. **Try to describe your change or fix from their perspective**. 

For easier sorting, start your pull request titles using one of the verbs "Add", "Change", "Deprecate", "Remove", or "Fix" (in the present tense).

While it is not always possible to phrase every change in this manner, it is desirable.

**The smaller the set of changes in the pull request, the quicker it can be reviewed and merged.** Splitting tasks into multiple smaller pull requests is often preferable.

### Lint and build 

**Pull requests that do not pass automated checks may not be reviewed**. Therefore, it is essential that you lint and build all the changes made in the `src` folder.

To do this, ensure you have installed all the required dependencies before committing your changes using the command `npm install` in your local repository.

This way, while you are developing, you can run the `npm run lint` and `npm run build` commands to properly write your code and build the final assets.

In any case, thanks to [Husky](https://typicode.github.io/husky/), all your changes should be linted and built automatically at each commit.

### Commit messages

**Please respect the following recommendations for writing your commit messages:**

- Begin the commit message with a single short line (_less than 50 character_) summarizing the change and _starting with an uppercase letter_.
- If necessary, add a more thorough description _after a blank line_.
- If your change is related to an opened issue, add a link to it in the description using the issue ID and a [_supported keyword_](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) (example: `fixes gagnieray/opale#50`).

### Base branch

**Do not choose the `master` branch as the branch to merge your changes.** Instead:

- If your changes concern _Redmine 6.x_, choose the branch `redmine-6.x`.
- If your changes concern _Redmine 5.x_, choose the branch `redmine-5.x`.
