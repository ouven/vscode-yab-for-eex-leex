"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const EEXFormatter_1 = require("./EEXFormatter");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('html-eex', new EEXFormatter_1.EEXFormattingEditProvider()));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map