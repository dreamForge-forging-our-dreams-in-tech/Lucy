# Arguments

There are two ways you cna access your arguments, and the firsst way is supported by all kind of inputs.

## Way 1, self documenting JSON:

By default all functions accept a json object where the arguments are provided as a key value pair, the key is the argument name and the value is the value passed on to that argument.

THe argument name must be provided in the documentation!

for example: "Lucy.filepicker.get_file({TYPE: 'blob'});".

## Way 2, simple and fast.

This method only works when only one argument has to be passed to the function.

If the function only requires one argument and supports it then you can simply provide the argument value without using any json.

for example: "Lucy.filepicker.get_file('blob');".

This has to bew supported by the function which can be added by simply using args instead of going inside of the args object.

A good way of using this is by using variables, e.g. "let arguments = args.TYPE || args;"

Documentation has to mention support for this.

