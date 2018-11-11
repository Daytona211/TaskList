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

    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "checkBox";
    checkBox.id = checkBox.className + liCounter;

    para = document.createElement("p");
    para.className = "textField";
    if (getTextBox("taskInput") == "") { // if the user tries to enter a blank task
        alert("A task can't be empty");
        return;
    } else {
        para.textContent = getTextBox("taskInput");
    }

    var editBtn = document.createElement("button");
    var clearBtn = document.createElement("button");
    editBtn.className = "editButton";
    editBtn.textContent = "Edit";

    divider = document.createElement("p");
    divider.className = "divider";
    divider.textContent = "|";

    clearBtn.className = "clearButton";
    clearBtn.textContent = "Clear";

    listItem.appendChild(checkBox);
    listItem.appendChild(para);
    listItem.appendChild(editBtn);
    listItem.appendChild(divider);
    listItem.appendChild(clearBtn);
    list.appendChild(listItem);
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
        para.style.textDecoration = "none"; 
    else
        para.style.textDecoration = "line-through"; 
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

    $("#taskInput").on("keydown", function (e) { // if the user hits enter while editing the task
        if (e.keyCode == 13) {
            addToList(getTextBox("taskInput"), ulTaskList, liCounter);
            liCounter++;
            document.getElementById("taskInput").value = ""; // clear the input field
        }
    });

    $("#addTaskBtn").on("click", function (){
        addToList(getTextBox("taskInput"), ulTaskList, liCounter);
        liCounter++;
    });

    $("#addTaskBtn").on("keydown", function (e){
        if(e.keyCode == 13){
            addToList(getTextBox("taskInput"), ulTaskList, liCounter);
            liCounter++;
        }
    });

    $("#addTaskBtn").on("keydown", function (e){
        if(e.keyCode == 13){
            disableAllEditable();
        }
    });

    $("*").on("click", function(e){
        if(e.target && e.target.className == "checkBox")
            strikeThrough(e.target);
    });

    $("*").on("click", function (e) {
        if (e.target && e.target.className == "editButton") {
            userEditTask(e);
        } else if (e.target && e.target.className == "clearButton") {
            clearTask(e);
        } else if (e.target && e.target.className != "textField") {
            disableAllEditable();
        }
    });
}
main();