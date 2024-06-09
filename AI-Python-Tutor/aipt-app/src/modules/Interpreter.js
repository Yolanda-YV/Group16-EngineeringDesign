let pyop = document.querySelector("#python-out");
let runBtn = document.querySelector("#run-btn");

const codemirrorEditor = CodeMirror.fromTextArea(
	document.querySelector("#codearea"),
	{
		lineNumbers: true,
		mode: "python",
		theme: "base16-dark",
	}
);

codemirrorEditor.setValue(`# Hello World!
`)

function makeop(s){
	console.log(s);
	pyop.innerHTML = s;
}

runBtn.addEventListener("click", (e) => {
	let pycode = codemirrorEditor.getValue();
	pyop.innerHTML = "";
	runPython(pycode);
})
var autorun =

setInterval(function(){

let pycode = codemirrorEditor.getValue();

pyop.innerHTML = "";

runPython(pycode);

}, 2000);

let startcode = `
import sys, io, traceback
namespace = {}  # use separate namespace to hide run_code, modules, etc.
def run_code(code):
    """run specified code and return stdout and stderr"""
    out = io.StringIO()
    oldout = sys.stdout
    olderr = sys.stderr
    sys.stdout = sys.stderr = out
    try:
        # change next line to exec(code, {}) if you want to clear vars each time
        exec(code, {})
    except:
        traceback.print_exc()

    sys.stdout = oldout
    sys.stderr = olderr
    return out.getvalue()
`
function setup_pyodide(startcode) {
	// setup pyodide environment to run code blocks as needed
	pyodide.runPython(startcode)
  }

languagePluginLoader.then(() => {
	// Pyodide is now ready to use...
	setup_pyodide(startcode)
	pyodide.globals.code_to_run = `Waiting for code...")`;
	makeop(pyodide.runPython(`run_code(code_to_run)`));
  });


function runPython(pycode) {
// run code currently stored in editor
	pyodide.globals.code_to_run = pycode
	makeop(pyodide.runPython('run_code(code_to_run)'))
}

function evaluatePython(pycode) {
	pyodide.runPythonAsync(pycode)
    .then(output => makeop(output))
    .catch((err) => { makeop(err) });
}


function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevents adding a new line
        sendMessage();
    }
}

// AI-Chatbot

// function sendMessage() {
//     var userInput = document.getElementById('user-input').value.trim();
//     if (userInput !== '') {
//         var chatMessages = document.getElementById('chat-messages');
        
//         // Add user message
//         var userMessageElement = document.createElement('div');
//         userMessageElement.textContent = 'You: ' + userInput;
//         chatMessages.appendChild(userMessageElement);
        
//         // Add auto reply
//         var autoReplyElement = document.createElement('div');
//         var autoReply = getAutoReply();
//         autoReplyElement.textContent = 'AI Bot: ' + autoReply;
//         chatMessages.appendChild(autoReplyElement);
        
//         // Clear user input
//         document.getElementById('user-input').value = '';
//     }
// }

// function getAutoReply() {
//     var replies = ["Ok", "Cool", "Nice!"];
//     var randomIndex = Math.floor(Math.random() * replies.length);
//     return replies[randomIndex];
// }


//codeArea.onUpdate( e => console.log(e))