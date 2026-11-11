# Filepicker extension

## select_file

Opens the device's native file picker dialog and returns the selected file as a blob URL.

### Access.

You can access this function by using: "await Lucy.filepicker.select_file();" or dragging the "select file" reporter block from the filepicker category.

## get_file

Returns the requested information of the selected file.

### Info

Argument name: TYPE.
Requires JSON: false.

### Access.

You can access this function by using: "Lucy.filepicker.get_file();" or dragging the "get file [DROPDOWN]" reporter block from the filepicker category.

### Usage

Getting a file object:

To get a file object simply call "Lucy.filepicker.get_file();" without passing any arguments, this is a js only future as scratch does not use JSON or objects.

Getting the file blob URL:

To get a file object simply call "Lucy.filepicker.get_file('blob');", the argument tells the function which part of information the function needs to return, in scratch simply select the "BLOB url" option from the blocks dropdown menu.

Getting the file name:

To get the name of the file simply call "Lucy.filepicker.get_file('name');", the argument tells the function which part of information the function needs to return, in scratch simply select the "Name" option from the blocks dropdown menu.

Getting the file modification date:

To get the last modificatio ndate of a file call "Lucy.filepicker.get_file('lastModifiedDate');", the argument tells the function which part of information the function needs to return, in scratch simply select the "Last Modified" option from the blocks dropdown menu.