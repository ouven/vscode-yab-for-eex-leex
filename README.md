# YAB for eex/leex README

This is the README for your extension "YAB for eex/leex". After writing up a brief description, we recommend including the following sections.

## Features

* Formats eex / leex files without saving or producing tmp files.
* htmlbeautifier needs language settings to be set to handle utf-8 charsets - like umlauts. On Macs the LC_* environment variables are not set by default. This extension will set them to `en_US.UTF-8` if not set.

## Cheers to

Many parts of this software are copied from othe projects. Most of all:
* https://github.com/golang/vscode-go
* https://github.com/aliariff/vscode-erb-beautify

## Requirements

```
gem install htmlbeautifier
```

## Extension Settings

## Settings

| Setting                              | Description                                           | Default |
| ------------------------------------ | ----------------------------------------------------- | ------- |
| `vscode-yab-for-eex-leex.tabStops`       | Set number of spaces per indent                       | 2       |
| `vscode-yab-for-eex-leex.tab`            | Indent using tabs                                     | false   |
| `vscode-yab-for-eex-leex.indentBy`       | Indent the output by NUMBER steps                     | 0       |
| `vscode-yab-for-eex-leex.stopOnErrors`   | Stop when invalid nesting is encountered in the input | false   |
| `vscode-yab-for-eex-leex.keepBlankLines` | Set number of consecutive blank lines                 | 0       |
