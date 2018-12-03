// Name: Zachary Norcross Subject: Jahnel Group JS1 Project 

/** addToList- reads the input in the textbox and adds it as an LI to the to do list
 * @param itemToAdd - The etxt to add to the todo list
 * @param list - a reference to the UL list object
 * @param liCounter - a counter keeping track of how many elements are in the list for the ID's
 */
function addToList(list, liCounter) {
    var li = $("<li></li>")
    li.attr("id", "listItem" + liCounter);
    // var listItem = document.createElement("li");
    // listItem.id = "listItem" + liCounter;
    // var checkBox = $("input").attr("type", "checkbox");
    // checkBox.attr("class", "checkBox");
    // checkBox.attr("id", "checkBox" + liCounter);
    var checkBox = $("<input></input>").attr({
        type:"checkbox",
        class: "checkBox",
        id: "checkbox" + liCounter
    });
    var para = $("<p></p>").attr("class", "textField");

    var r = $("#taskInput");
    if(r[0].value == ""){
        alert("Can't have an empty task");
        return;
    }
    para.append(r[0].value);
    
    
    var editBtn = $("<button/>").attr({
        class: "editButton",
    });
    editBtn.html("Edit");
    var clearBtn = $("<button/>").attr({
        class: "clearButton",
    });
    clearBtn.html("Clear");
    var divider = $("<p></p>").attr({
        class: "divider",
    });
    divider.html("|");
    // add to ul
    li.append(checkBox[0]);
    li.append(para[0]);
    li.append(editBtn[0]);
    li.append(divider[0]);
    li.append(clearBtn);
    list.append(li[0]);
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
    var editable = $(".textField");
    for (var i = 0; i < editable.length; i++) { // disable all editable elements in the taskList
        editable[i].contentEditable = false;
    }
}

function clearAllCompletedTasks(){
    var membersOfList = $("#taskList").children();
    console.log(membersOfList);
    for(var i = 0; i < membersOfList.length; i++){
        if(membersOfList[i].children[0].checked){
            membersOfList[i].remove();
        }
    }
    
}
/** main - the main diver of the program. Handles ll function calls and general flow of the program.
 */
function main() {
    var liCounter = 0;
    var checkBoxes = $(".checkBox"); // list of checkboxes
    var ulTaskList = $("#taskList"); // lis of tasks 
    ulTaskList = ulTaskList[0];
    $("#taskInput").on("keydown", function (e) { // if the user hits enter while editing the task
        if (e.keyCode == 13) {
            addToList(ulTaskList, liCounter);
            liCounter++;
            $("#taskInput").val(""); // clear the input field
        }
    });

    $("#addTaskBtn").on("click", function (){
        addToList(ulTaskList, liCounter);
        liCounter++;
    });

    $("#addTaskBtn").on("keydown", function (e){
        if(e.keyCode == 13){
            addToList(ulTaskList, liCounter);
            liCounter++;
        }
    });

    $("#clearAllCompletedTasksBtn").on("click", function(e){
        clearAllCompletedTasks();
    });

    $("#addTaskBtn").on("keydown", function (e){
        if(e.keyCode == 13){
            disableAllEditable();
        }
    });

    $(this).on("click", function(e){
        if(e.target && e.target.className == "checkBox"){
            strikeThrough(e.target);
        }
    });
 
    $(this).on("keydown", function(e){ // if enter is hit disable all editing
        if(e.keyCode == 13)
            disableAllEditable();
    });

    $(this).on("click", function (e) {
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