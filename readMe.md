# JavaScript Frameworks: Intro to Angular

I've always found that the biggest hurdle in learning to program--the one that holds you back from making big leaps in understanding--is grasping the answer to the question, "why do I care?"

When learning JavaScript for the first time, you start with the concept of loops. You write a basic for loop, iterate 10 times and print out the index each time. It works, and you're reasonably satisfied. But then you stare at the code you just wrote and say to yourself, "when am I ever going to need this?" Often it's not until much later, when you're working on solving your own problem, that you think of something you want to do and realize you can't do it without a loop. It's only then that understanding finally clicks into place. So, in the interest of real-world application, I'm going to try to explain the benefits of a JavaScript framework in the most applicable way possible.

So, let's set the stage and assume you're working for a company that needs a customized to-do list to track developer's progress (let's disregard the need for a database and back-end architecture to persist the state after leaving the page).

Here are your options:

1. Create a customized application using JavaScript event handling that will manage the states for you. Create a button where you can add a block of HTML that contains a checkbox and an input field. Unfortunately, you're probably going to need to hard-code a lot of the HTML in your JavaScript file, and that can get messy fast. You add several items to your to-do list, and then complete a task in the middle of the list. Unfortunately, now you need to do some tricky DOM traversal to navigate up to the parent element, find the label element, and add a strike-through class to the text to indicate that it was finished. By the end, you have a very fragile application that required a lot of complicated logic to implement simple functionality.

2. Use a JavaScript framework, such as AngularJS. The beauty of Angular is that you can connect anything in the application to a model value, and manipulate all of them simultaneously with minimal code. Simply define a model value on the checkbox element and use conditional styling around the label which will automatically update when the checkbox is checked or unchecked. Don't worry if this isn't totally clicking yet; just keep reading.

## Your First AngularJS App

This introduction uses AngularJS version 1.6, which I consider ideal for beginners since it's well established, has a significant support base, and doesn't require TypeScript. AngularJS is still widely used and is an excellent first JavaScript framework to learn. Once you have the basics, you'll be in a much better place to start working with Angular 2 or Angular 4, and even React.

### Step One: Starter Code

First, as you probably know, you need a boilerplate HTML file and a JavaScript file to start with. We'll use the following starter code for our HTML, and you can save it as `to-do-app.html`.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Sample</title>
	</head>
	<body>
		<h1>Caitlin&rsquo;s To-Do List</h1>
		<input type="checkbox" />
		<label>Write Intro to AngularJS article</label>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js"></script>
		<script src="./script.js"></script>
	</body>
</html>
```

In our `script.js` file, I like to start out with a simple `console.log('Hello');` statement to ensure that it's referenced properly.

### Step Two: Angular Initialization

An AngularJS application is initialized by creating an app, also known as an Angular module, which surrounds your entire application. To do this, we'll write some very simple code which will link our HTML to the angular application we'll be writing.

To create an AngularJS module, add this line of code to your JavaScript file:

```js
angular.module('toDoModule', []);
```

The app name is defined in the first parameter of the method, and the empty brackets are where you would inject any dependencies of your angular application. Need drag-and-drop functionality in your application? Find an AngularJS library with the functionality you need, and inject it into your toDoModule application.

Now, creating the app in your JavaScript file alone is not enough to connect it to your HTML. You will need to use the ng-app attribute on the container element that surrounds your entire application (for instance, the `<body>` tag), which should look like this:

`ng-app="toDoModule"`

### Step Three: Start Writing Your App

For the purposes of this introduction, we're simply going to link our checkbox's value to the label contents. The label text should display a strike through it once the input has been checked, indicating that the task has been completed.

First we should declare a controller which all our model attributes and functions will be defined upon. We can define it in our JavaScript file as follows:

```js
angular
	.module('toDoModule', [])
	.controller('toDoController', [
		ToDoControllerFunction
	]);

function ToDoControllerFunction(){
	var toDo = this;
}
```

*Note: the controller function uses PascalCase capitalization because it is considered a constructor function*

By stringing a controller method after the module definition, we are attaching our controller to the Angular app we've already defined. The controller declaration mirrors the way we defined our module; the first parameter is the name of the controller, and the second uses array notation to list the dependencies of our controller. The difference is that the final value in the array will be a callback function, which will pass in any dependencies (if they exist) into the controller method you will be writing. The first line in our controller method will allow us to define all future variables and functions on "this", which represents the controller itself and will also be accessible in the HTML.

All we have to do to initialize the controller in our HTML is add the following attribute to our body tag: `ng-controller="toDoController as toDo"`. Our opening body tag should now look like this:

`<body ng-app="toDoModule" ng-controller="toDoController as toDo">`

By setting the ng-controller attribute to "toDoController as toDo", we are using the "controller as" syntax to define how we will be referencing the Angular controller within the HTML.

Now, we need to declare what model attribute will be connected to the checkbox. We can do this by adding an attribute to the input called ng-model, and we will set it equal to the value "todo.writeIntroTask", which will be a variable in our controller. Your input element should now look like this:

```html
<input type="checkbox" ng-model="toDo.writeIntroTask" />
```

writeIntroTask is the variable that represents the value of the checkbox, and it is attached to our controller that we have already defined as toDo. Now, let's go back to our controller function and add the following line of code:

```js
toDo.writeIntroTask = false;
```

By adding this line, we are explicitly setting the value of writeIntroTask to false upon initialization. Until you check the box, we can assume that we have not yet completed the task.

Here's the good news: your application is all set up. You've attached a model value, which is defined in your controller, to a checkbox which inherently has a value of true or false (checked or unchecked). You've set it to false (unchecked) initially, and now when you check the box it will change the value of toDo.writeIntroTask to true.

Now that we have that set up, let's change the styling of our label depending on whether the checkbox is checked or not. First, we can add a style tag to the top of our head with a strike-through class that we will add and remove.

```html
<style type="text/css">
	.text-decoration-strike {
		text-decoration: line-through;
	}
</style>
```

All we have to do now is leverage the ng-class AngularJS directive, which can be applied as an attribute onto an element and sets a class to a boolean value. The ng-class attribute takes an object, where each key is a string correlating to the CSS class that will be conditionally added and removed, and the value is the respective boolean variable or expression that will determine whether the class is added or removed. Your label HTML element should now look like this:

```html
<label ng-class="{ 'text-decoration-strike' : toDo.writeIntroTask }">
```

That's it! You're done. Now, when you check the input attached to toDo.writeIntroTask, you are setting the boolean value to true. When this happens, ng-class will register the change in value of toDo.writeIntroTask and will add the class 'text-decoration-strike' to the label element.

Thanks to Angular, you have created the foundation of a to-do list application with only a few lines of JavaScript. It's an incredibly powerful tool that only becomes more exciting and interesting as you delve deeper into it.
