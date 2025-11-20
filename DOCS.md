# SaveInfo Documentation

## Functions

### `UpdateNumberOfCharactersAndLines`

Updates the number of characters and lines using provided text document.

**Arguments:**
- `document` (vscode.TextDocument) - text document that will be used for updating number of characters and lines.

**Returns:**
- void

### `ProcessWillSaveTextDocument`

Processing during WillSaveTextDocument event. 

Calculates the change in number of characters and lines, creates a string to display it and shows information message with this data.

**Arguments:**
- `document` (vscode.TextDocument) - text document that will be saved and is used for calculating the change in number of characters and lines.

**Returns:**
- void

### `activate`

Runs on the extension activation.

**Arguments:**
- `context` (vscode.ExtensionContext)

**Returns:**
- void

### `deactivate`

Runs on the extension deactivation.

**Arguments:**
- none

**Returns:**
- void

## Event Listeners

### DidChangeActiveTextEditor Listener

Updates number of characters and lines when user opens other text document.

**Arguments:**
- `event` (vscode.TextEditor) - currently active text editor that was opened by user.

**Returns:**
- none

### WillSaveTextDocument Listener

Calls ProcessWillSaveTextDocument function on manual save of a text document.

**Arguments:**
- `event` (vscode.TextEditor) - currently active text editor that was opened by user.

**Returns:**
- none

### DidSaveTextDocument Listener

Calls UpdateNumberOfCharactersAndLines after saving of a text document.

**Arguments:**
- `event` (vscode.TextDocument) - text document that was saved.

**Returns:**
- none

## Commands

### `saveinfo.turn_on`

Turns on the plugin.

**Command ID:** `saveinfo.turn_on`

**Display Name:** SaveInfo: turn on

### `saveinfo.turn_off`

Turns off the plugin.

**Command ID:** `saveinfo.turn_off`

**Display Name:** SaveInfo: turn off

### `saveinfo.toggle`

Toggles the plugin on/off.

**Command ID:** `saveinfo.toggle`

**Display Name:** SaveInfo: toggle

## Commit History

| Commit Hash | Message |
|-------------|---------|
| `6b1c381` | Added documentation |
| `f373712` | Added code comments |
| `892f4ce` | Implemented basic functionality |