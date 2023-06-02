const vscode = require('vscode');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
const testFolderName = 'test';
const testFolderPath = path.join(workspacePath, testFolderName);

var path1 = vscode.workspace.workspaceFolders[0].uri.fsPath + "/test"+0;
console.log(path1);
