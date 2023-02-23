# Phonebook exercise
This folder contains all the code for the Phonebook exercise.

Stuck on **2.14: The Phonebook step9**?
- So you have a component within the component folder to display the individual numbers
- In this exercise you add a delete button to each row
- How do you deal with the deletion?
Option 1:
You can import the file declared in the services folder and call the delete function on click.
This works but the state does not update immediately.

Option 2:
Create the delete function in app.js and pass the function as a prop to the component.
Within  the component call the delete function passed as a prop in a local event handler function and pass the person object.

Hope this helps.