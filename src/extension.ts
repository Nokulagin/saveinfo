import * as vscode from 'vscode';

let is_plugin_active = false;
let number_of_characters = 0;
let number_of_lines = 0;

/**
 * Updates the number of characters and lines using provided text document.
 * 
 * Arguments:
 * 	- document (vscode.TextDocument) - text document that will be used for 
 * 		updating number of characters and lines.
 * 
 * Returns:
 * 	- void
*/
function UpdateNumberOfCharactersAndLines(document: vscode.TextDocument) {
	number_of_characters = document.getText().length;
	number_of_lines = document.lineCount;
}

/**
 * Processing during WillSaveTextDocument event.
 * Calculates the change in number of characters and lines,
 * creates string to display it and shows infromation message with this data. 
 * 
 * Arguments:
 * 	- document (vscode.TextDocument) - text document that will be updated and is used for
 * 		calculating the change in number of characters and lines.
 * 
 * Returns:
 * 	- void 
*/
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

/**
 * Runs on the extension activation.
 * 
 * Arguments:
 * 	- context (vscode.ExtensionContext)
 * 
 * Returns:
 *  - void
*/
export function activate(context: vscode.ExtensionContext) {

	/** 
	 * DidChangeActiveTextEditor event listener.
	 * Updates number of characters and lines when user opens other text document.
	 * 
	 * Arguments: 
	 * 	- event (vscode.TextEditor) - currently active text editor that was opened by user.
	 * 
	 * Returns:
	 * 	- none
	*/
	vscode.window.onDidChangeActiveTextEditor((event) => {
		if (event !== undefined && is_plugin_active) {
		UpdateNumberOfCharactersAndLines(event.document);
	}});

	/**
 	 * WillSaveTextDocument event listener.
 	 * Calls ProcessWillSaveTextDocument function on manual save of a text document.
 	 * 
 	 * Arguments: 
 	 * 	- event (vscode.TextEditor) - currently active text editor that was opened by user.
 	 * 
 	 * Returns:
 	 * 	- none
	*/
	vscode.workspace.onWillSaveTextDocument((event) => {
		if (event.reason === vscode.TextDocumentSaveReason.Manual && is_plugin_active) {
			ProcessWillSaveTextDocument(event.document);
	}});

	/** 
	 * DidSaveTextDocument event listener.
	 * Calls UpdateNumberOfCharactersAndLines after saving of a text document.
	 * 
	 * Arguments:
	 *  - event (vscode.TextDocument) - text document that was saved.
	 * 
	 * Returns:
	 *  - none
	*/
	vscode.workspace.onDidSaveTextDocument((event) => {
		if (is_plugin_active) {
			UpdateNumberOfCharactersAndLines(event);
	}});

	/** 
	 * Command saveinfo.turn_on - (SaveInfo: turn on)
	 * Turns on the plugin.
	*/
	const enable_command = vscode.commands.registerCommand('saveinfo.turn_on', () => {
		is_plugin_active = true;
		vscode.window.showInformationMessage("SaveInfo is on");
		let text_editor = vscode.window.activeTextEditor;
		if (text_editor !== undefined) {
			UpdateNumberOfCharactersAndLines(text_editor.document);
	}});

	/**
	 * Command saveinfo.turn_off - (SaveInfo: turn off)
	 * Turns off the plugin.
	*/
	const disable_command = vscode.commands.registerCommand('saveinfo.turn_off', () => {	
		vscode.window.showInformationMessage("SaveInfo is off");
		is_plugin_active = false;
	});

	/**
	 * Command saveinfo.toggle - (SaveInfo: toggle)
	 * Toggles the plugin on/off.
	*/
	const toggle_command = vscode.commands.registerCommand('saveinfo.toggle', () => {
		if (is_plugin_active) {
			vscode.commands.executeCommand("saveinfo.turn_off");
		} else {
			vscode.commands.executeCommand("saveinfo.turn_on");
		}
	});

	context.subscriptions.push(enable_command, disable_command, toggle_command);
}

/**
 * Runs on the extension deactivation.
 * 
 * Arguments:
 * 	- none
 * 
 * Returns:
 * 	- void
*/
export function deactivate() {}
