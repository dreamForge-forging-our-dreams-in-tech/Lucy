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
                    opcode: Scratch.Cast.toString(`select_file`),
                    blockType: Scratch.BlockType.REPORTER,
                    text: Scratch.Cast.toString(`select file`),
                },

                {
                    opcode: Scratch.Cast.toString(`get_file_info`),
                    blockType: Scratch.BlockType.REPORTER,
                    text: Scratch.Cast.toString(`get file [TYPE]`),
                    arguments: {
                        TYPE: { type: Scratch.ArgumentType.STRING, menu: Scratch.Cast.toString(`file_info`) },
                    },
                },
            ],
            menus:
            {
                file_info
                    : {
                    acceptReporters:
                        false
                    , items: [
                        { text: Scratch.Cast.toString(`BLOB url`), value: Scratch.Cast.toString(`blob`) },
                        { text: Scratch.Cast.toString(`Name`), value: Scratch.Cast.toString(`name`) },
                        { text: Scratch.Cast.toString(`Last Modified`), value: Scratch.Cast.toString(`lastModifiedDate`) },]
                }

            },
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
    get_file_info(args, util) {
        //return this.picked_file;

        let type = args.TYPE || args;

        if(type == 'blob') {
            return URL.createObjectURL(this.picked_file);
        } else if(type == 'name') {
            return this.picked_file.name;
        } else if(type == 'lastModifiedDate') {
            return this.picked_file.lastModifiedDate;
        }
    }
}
Scratch.extensions.register(new filepicker(Scratch.vm.runtime));