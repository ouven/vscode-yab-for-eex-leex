# YAB for eex/leex README

"Yet another beautifier" for elixir eex/leex html templates. Like others it utilizes htmlbeautifier. The
difference is, it can format without saving the file first.

`htmlbeautifier` needs language settings to be set in the environment to handle utf-8 charsets - like umlauts.
On Macs the LC_* environment variables are not set by default. This extension will set them to `en_US.UTF-8`
if not set.

## Features

* Formats eex / leex files without saving or producing tmp files.

[Demo GIF](https://raw.githubusercontent.com/ouven/vscode-yab-for-eex-leex/master/images/demo.gif)

## Cheers to

Many parts of this software are copied from other projects. Most of all:
* https://github.com/golang/vscode-go
* https://github.com/RoyalMist/vscode-eex-format

## Requirements

You have to build and use custom version of htmlbeautifier which handles Embedded Elixir better:

```
$ git clone git@github.com:kelostrada/htmlbeautifier.git
$ cd htmlbeautifier
$ gem build htmlbeautifier
$ sudo gem install htmlbeautifier-1.4.0.gem
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

