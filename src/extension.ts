import * as vscode from 'vscode';

let is_plugin_active = false;
let number_of_characters = 0;
let number_of_lines = 0;

function UpdateNumberOfCharatersAndLines(document: vscode.TextDocument) {
	number_of_characters = document.getText().length;
	number_of_lines = document.lineCount;
}

function ProcessWillSaveTextDocument(document: vscode.TextDocument) {
	let number_of_characters_changed = document.getText().length - number_of_characters;
	let number_of_lines_changed = document.lineCount - number_of_lines;
	let character_text;
	let line_text;
	if (number_of_characters_changed >= 0) {
		character_text = "Characters added: " + number_of_characters_changed.toString();
	} else {
		character_text = "Characters removed: " + (-number_of_characters_changed).toString();
	}
	if (number_of_lines_changed >= 0) {
		line_text = "Lines added: " + number_of_lines_changed.toString();
	} else {
		line_text = "Lines removed: " + (-number_of_lines_changed).toString();
	}
	vscode.window.showInformationMessage(character_text + "; " + line_text);
}

export function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor((event) => {
		if (event !== undefined && is_plugin_active) {
		UpdateNumberOfCharatersAndLines(event.document);
	}});

	vscode.workspace.onWillSaveTextDocument((event) => {
		if (event.reason === vscode.TextDocumentSaveReason.Manual && is_plugin_active) {
			ProcessWillSaveTextDocument(event.document);
	}});

	vscode.workspace.onDidSaveTextDocument((event) => {
		if (is_plugin_active) {
			UpdateNumberOfCharatersAndLines(event);
	}});


	const enable_command = vscode.commands.registerCommand('saveinfo.turn_on', () => {
		is_plugin_active = true;
		vscode.window.showInformationMessage("SaveInfo is on");
		let text_editor = vscode.window.activeTextEditor;
		if (text_editor !== undefined) {
			UpdateNumberOfCharatersAndLines(text_editor.document);
	}});

	const disable_command = vscode.commands.registerCommand('saveinfo.turn_off', () => {	
		vscode.window.showInformationMessage("SaveInfo is off");
		is_plugin_active = false;
	});

	const toggle_command = vscode.commands.registerCommand('saveinfo.toggle', () => {
		if (is_plugin_active) {
			vscode.commands.executeCommand("saveinfo.turn_off");
		} else {
			vscode.commands.executeCommand("saveinfo.turn_on");
		}
	});

	context.subscriptions.push(enable_command, disable_command, toggle_command);
}


// This method is called when your extension is deactivated
export function deactivate() {}
