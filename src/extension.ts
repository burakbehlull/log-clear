import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {

	vscode.window.showInformationMessage('Log clear eklentisi aktif!')

	let disposable = vscode.commands.registerCommand('logclear.clearConsoleLogs', async () => {
		const files = await vscode.workspace.findFiles('**/*.js')
		
		for (const file of files) {
			const document = await vscode.workspace.openTextDocument(file)
			const edit = new vscode.WorkspaceEdit()
			
			const text = document.getText()
			const lines = text.split('\n')
			let newText = '';

			for (let line of lines) {
				if (!line.trim().startsWith('console.log')) {
					newText += line + '\n';
				}
			}
			
			edit.replace(file, new vscode.Range(0, 0, document.lineCount, 0), newText)
			await vscode.workspace.applyEdit(edit)
			await document.save()
		}

		vscode.window.showInformationMessage('Loglar silindi!')
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
