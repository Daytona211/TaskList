// Name: Zachary Norcross Subject: Jahnel Group JS1 Project 
/** getTextBox- takes in the if of a textBox object and returns the text within the box
 * @param textBoxid- The id of the textbo which e want to get the content from
 * @return returns the value of the textBox object with the matching ID
 */
function getTextBox(textBoxID) {
    return document.getElementById(textBoxID).value
}

/** addToList- reads the input in the textbox and adds it as an LI to the to do list
 * @param itemToAdd - The etxt to add to the todo list
 * @param list - a reference to the UL list object
 * @param liCounter - a counter keeping track of how many elements are in the list for the ID's
 */
function addToList(itemToAdd, list, liCounter) {
    var listItem = document.createElement("li");
    listItem.id = "listItem" + liCounter;
    //Set up the checkbox
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "checkBox";
    checkBox.id = checkBox.className + liCounter;

    // Set up the text from the textbox (inside a <p> tag)
    para = document.createElement("p");
    if (getTextBox("taskInput") == "") { // if the user tries to enter a blank task
        alert("A task can't be empty");
        return;
    } else {
        para.textContent = getTextBox("taskInput");
    }
    para.style.display = "inline";
    para.className = "textField";
    // setup edit button
    var editBtn = document.createElement("button");
    var clearBtn = document.createElement("button");
    editBtn.className = "editButton";
    // create a divider between the two buttons
    divider = document.createElement("p");
    divider.textContent = "|";
    divider.style.display = "inline";
    divider.style.color = "#0645AD";

    // setup the clear button
    clearBtn.className = "clearButton";
    styleEditBtn(editBtn);
    styleEditBtn(clearBtn);
    clearBtn.textContent = "Clear";
    // add all the items to the LI then add the LI to the UL
    listItem.appendChild(checkBox);
    listItem.appendChild(para);
    listItem.appendChild(editBtn);
    listItem.appendChild(divider);
    listItem.appendChild(clearBtn);
    list.appendChild(listItem);
}

/** styleEditBtn takes in a reference to the button object we want to style then sets the properties for the button's style
 * @param button -  reference to the button object that we want style */
function styleEditBtn(button) {
    button.style.height = "15px";
    button.style.width = "40px";
    button.style.background = "none";
    button.style.border = "none";
    button.textContent = "Edit"
    button.style.color = "#0645AD"
}
/** userEditTask - sets the property contentEditable for the given list element to true
 * @param liToEdit - the list element that we want to set the property of
 */
function userEditTask(liToEdit) {
    var pTag = liToEdit.target.parentElement.getElementsByTagName('p')[0];
    pTag.contentEditable = true;
}

/** clearTask - clears the current list element from the tasklist (UL)
 * @param event  the event that was trigered by the clear button being clicked down
 */
function clearTask(event) {
    var listItemToRemove = event.target.parentElement;
    var parent = (event.target.parentElement.parentElement);
    parent.removeChild(listItemToRemove);
}

/** strikeThrough - sets the textDecoration property for the given li after the checkbox event is triggered
 * @param checkBox - The checkbox that was checked to trigger the event
 */
function strikeThrough(checkBox) {
    var para = checkBox.parentElement.getElementsByTagName('p')[0];
    if (para.style.textDecoration == "line-through")
        para.style.textDecoration = "none"; // remove the line-through
    else
        para.style.textDecoration = "line-through"; // set the line-through
}
/** disableAllEditable disables the contentEditable property for all li's in the tasklist
 */
function disableAllEditable() {
    var editable = document.getElementsByClassName("textField");
    for (var i = 0; i < editable.length; i++) { // disable all editable elements in the taskList
        editable[i].contentEditable = false;
    }
}
/** main - the main diver of the program. Handles ll function calls and general flow of the program.
 */
function main() {
    var liCounter = 0;
    var checkBoxes = document.getElementsByClassName("checkBox"); // list of checkboxes
    var ulTaskList = document.getElementById("taskList"); // lis of tasks 

    document.getElementById("taskInput").addEventListener("keydown", function (e) { // if the user hits enter while editing the task
        if (e.keyCode == 13) {
            addToList(getTextBox("taskInput"), ulTaskList, liCounter);
            liCounter++;
            document.getElementById("taskInput").value = ""; // clear the input field
        }
    });

    // if the addTaskBtn is clicked 
    document.getElementById("addTaskBtn").addEventListener("click", function () {
        addToList(getTextBox("taskInput"), ulTaskList, liCounter);
        liCounter++;
    });

    // if the add taskbtn is hit with the enter key
    document.getElementById("addTaskBtn").addEventListener("keydown", function (e) {
        if (e.keycode == 13) { // 13 = enterkey
            addToList(getTextBox("taskInput"), ulTaskList, liCounter);
            liCounter++;
        }
    });
    //if the enter key is pressed down
    document.addEventListener("keydown", function (e) { 
        if (e.keyCode == 13) {
            disableAllEditable();
        }
    });

    // if there is a chan with the checkboxes
    document.addEventListener("change", function (e) {
        if (e.target && e.target.className == "checkBox") {
            strikeThrough(e.target);
        }
    });
    // if there is a click on the screen
    document.addEventListener("click", function (e) {
        if (e.target && e.target.className == "editButton") { // click on an edit button
            userEditTask(e);
        } else if (e.target && e.target.className == "clearButton") { //click on a clear button
            clearTask(e);
        } else if (e.target && e.target.className != "textField") { // click on something other than a textField
            disableAllEditable();
        }
    });
}

main(); // call the main