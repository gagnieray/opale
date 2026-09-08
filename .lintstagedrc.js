module.exports = {
  "src/**/*.scss": files => [
    `stylelint "${files.join('" "')}"`,
    'grunt css-theme',
    'git add stylesheets/'
  ],
}
