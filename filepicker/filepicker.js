class filepicker {
    constructor(runtime = {}) {
        this.runtime = runtime;
        this.picked_file = ''; // variable to store the picked file
    }

    getInfo() {
        return {
            id: Scratch.Cast.toString(`filepicker`),
            name: Scratch.Cast.toString(`filepicker`),
            color1: Scratch.Cast.toString(`#0d9bb8`),
            blocks: [
                {
                    opcode: Scratch.Cast.toString(`select file`),
                    blockType: Scratch.BlockType.COMMAND,
                    text: Scratch.Cast.toString(`select_file`),
                },

                {
                    opcode: Scratch.Cast.toString(`selected file`),
                    blockType: Scratch.BlockType.REPORTER,
                    text: Scratch.Cast.toString(`selected_file`),
                },
            ],
        }
    }

    // prompt the user to select a file
    async select_file(args, util) {
        return new Promise((resolve, reject) => {
            // 1. Create a hidden file input element dynamically
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '*/*'; // Add specific types if needed, e.g., 'image/*'

            // 2. Listen for the change event once on this temporary input
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    this.picked_file = file;
                    resolve(file); // Successfully got the file
                } else {
                    this.picked_file = 'No file selected';
                    reject(new Error("No file selected"));
                }
            };

            // 3. Programmatically trigger the file browser dialog
            input.click();
        });
    }

    // returns the selected file
    selected_file (args, util) {
        return this.picked_file;
    }
}
Scratch.extensions.register(new filepicker(Scratch.vm.runtime));