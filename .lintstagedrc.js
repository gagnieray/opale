module.exports = {
  "src/**/*.scss": files => [
    `stylelint "${files.join('" "')}"`,
    'grunt css',
    'git add stylesheets/ plugins/'
  ],
}
