// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "insert-custome-content" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('insert-custome-content.insertCustomeContent', function () {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World from insert_custome_content!');
        var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
        var currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
        let regexStr = vscode.workspace.getConfiguration('insertCustomeContent')['regex'];
        if (!regexStr) return;
        let regex = new RegExp(regexStr);

        if (regex.test(currentlyOpenTabfileName)) {
            let results = currentlyOpenTabfileName.match(regex);
            var editor = vscode.window.activeTextEditor;
            if (!editor) return;
            let insertContent = vscode.workspace.getConfiguration('insertCustomeContent')['template'];
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    if (insertContent.indexOf("{" + i + "}") !== -1) {
                        let _rexStr = "\\{" + i + "\\}";
                        insertContent = insertContent.replace(new RegExp(_rexStr, 'g'), results[i]);
                    }
                }
            }
            editor.edit(function (edit) {
                var current = editor.selection;
                if (current.isEmpty) {
                    edit.insert(current.start, insertContent);
                }
                else {
                    edit.replace(current, insertContent);
                }
            });
        }

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
