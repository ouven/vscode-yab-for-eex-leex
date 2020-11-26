import * as cp from 'child_process'
import * as vscode from 'vscode'

export class EEXFormattingEditProvider implements vscode.DocumentFormattingEditProvider {
    public provideDocumentFormattingEdits(
        document: vscode.TextDocument,
        options: vscode.FormattingOptions,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.TextEdit[]> {
        if (vscode.window.visibleTextEditors.every((e) => e.document.fileName !== document.fileName)) {
            return []
        }
        const ext = process.platform === "win32" ? ".bat" : ""
        const beautifier = `htmlbeautifier${ext}`
        const formatFlags: string[] = this.cli_options()

        return this.testRun(beautifier, token).then(
            () =>
                this.runFormatter(beautifier, formatFlags, document, token).then(
                    (edits) => edits,
                    (err) => Promise.reject(err)
                ),
            (err) => Promise.reject(err)
        )

    }

    private testRun(
        formatTool: string,
        token: vscode.CancellationToken
    ): Thenable<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let stdout = ''
            let stderr = ''

            // Use spawn instead of exec to avoid maxBufferExceeded error
            const p = cp.spawn(formatTool, ['-v'])
            token.onCancellationRequested(() => !p.killed && p.kill())
            p.stdout.setEncoding('utf8')
            p.stdout.on('data', (data) => (stdout += data))
            p.stderr.on('data', (data) => (stderr += data))
            p.on('error', (err) => {
                if (err && (<any>err).code === 'ENOENT') {
                    return reject(`couldn't find htmlbeautifier for formatting (ENOENT)`)
                } else {
                    return reject(`couldn't run htmlbeautifier '${err.message}'`)
                }
            })
            p.on('close', () => {
                console.log(`htmlbeautifier is ready to go!`)
                return resolve(true)
            })
        })
    }

    private runFormatter(
        formatTool: string,
        formatFlags: string[],
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Thenable<vscode.TextEdit[]> {
        return new Promise<vscode.TextEdit[]>((resolve, reject) => {
            let stdout = ''
            let stderr = ''

            // Use spawn instead of exec to avoid maxBufferExceeded error
            const p = cp.spawn(formatTool, formatFlags, {
                env: {
                    LC_ALL: "en_US.UTF-8",
                    LANG: "en_US.UTF-8",
                    ...process.env
                }
            })
            token.onCancellationRequested(() => !p.killed && p.kill())
            p.stdout.setEncoding('utf8')
            p.stdout.on('data', (data) => (stdout += data))
            p.stderr.on('data', (data) => (stderr += data))
            p.on('error', (err) => reject(err.message))
            p.on('close', (code) => {
                if (code !== 0) {
                    return reject(stderr)
                }

                // Return the complete file content in the edit.
                // VS Code will calculate minimal edits to be applied
                const fileStart = new vscode.Position(0, 0)
                const fileEnd = document.lineAt(document.lineCount - 1).range.end
                const textEdits: vscode.TextEdit[] = [
                    new vscode.TextEdit(new vscode.Range(fileStart, fileEnd), stdout)
                ]
                return resolve(textEdits)
            })
            if (p.pid) {
                p.stdin.end(document.getText())
            }
        })
    }

    private cli_options() {
        const config = vscode.workspace.getConfiguration("vscode-yab-for-eex-leex")
        return Object.keys(config).reduce(function (acc, key) {
            switch (key) {
                case "indentBy":
                    acc.push("--indent-by", config[key])
                    break
                case "keepBlankLines":
                    acc.push("--keep-blank-lines", config[key])
                    break
                case "stopOnErrors":
                    if (config["stopOnErrors"] === true) {
                        acc.push("--stop-on-errors")
                    }
                    break
                case "tab":
                    if (config["tab"] === true) {
                        acc.push("--tab")
                    }
                    break
                case "tabStops":
                    acc.push("--tab-stops", config[key])
                    break
            }
            return acc
        }, ["--engine", "eex"])
    }
}
