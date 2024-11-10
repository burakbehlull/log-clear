import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {

	console.log('logclear eklentisi aktif!')

	const disposable = vscode.commands.registerCommand('logclear.hello', () => {
		vscode.window.showInformationMessage('Merhaba, logclear!')
	})

	context.subscriptions.push(disposable)
}

export function deactivate() {}
