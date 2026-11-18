// Adds an ASD block to the turbowarp editor
// It takes a string of code entered in CODE and evaluates it as Javascript
// there are two types COMMAND and REPORTER
// COMMAND executes a piece of code and returns nothing, while REPORTER executes a piece of code and returns a value.

class ScriptManager {
    constructor(runtime) {
        this.runtime = runtime;

        try { // check if the registery is available and prevent crashes if not
            window.registerExtension('https://dreamforge-forging-our-dreams-in-tech.github.io/Lucy/scriptmanager/scriptmanager.js');
        } catch (e) {
            console.warn('Extension registry not found, skipping extension registration. please install the extension builder first if you plan to use this extension with the extension builder.');
        }
    }
    getInfo() {
        return {
            id: 'scriptmanager', // Ensure this is lowercase/no symbols
            name: 'scriptmanager',
            color1: '#0088ff', // Main block color
            color2: '#0066cc', // Hover/Outline color
            menus:
            {
                event_objects
                    : {
                    acceptReporters:
                        false
                    , items: [
                        { text: Scratch.Cast.toString(`Stage`), value: Scratch.Cast.toString(`stage`) },
                        { text: Scratch.Cast.toString(`Sprite`), value: Scratch.Cast.toString(`sprite`) },
                    ]
                }
            },
            blocks: [
                {
                    opcode: 'evaluateExpression',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Evaluate expression [RAW_CODE]',
                    arguments: {
                        RAW_CODE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'alert()'
                        },

                    }
                },
                {
                    opcode: 'evaluateResult',
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Evaluate result [RAW_CODE]",
                    arguments: {
                        RAW_CODE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: '2 * 2'
                        },

                    }
                }
            ]
        };
    }

    // The function name MUST match the opcode above exactly
    evaluateResult(args) {
        return this.evalCode(args); // reuse evalCode to avoid code duplication, only reason for extra function is due to how turbowarp handles identification of blocks.
    }

    evaluateExpression(args) {
        try {
            const fn = new Function('a', `return ${args.RAW_CODE || args}`);
            return fn(); // keep return statement because reporter reuses the same function
        } catch (e) {
            return `Error: ${e.message}`;
        }
    }
}

Scratch.extensions.register(new ScriptManager(Scratch.vm.runtime));