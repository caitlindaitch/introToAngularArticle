angular
	.module('toDoModule', [])
	.controller('toDoController', [
		ToDoControllerFunction
	]);

function ToDoControllerFunction(){
	var toDo = this;

	toDo.writeIntroTask = false;
}
