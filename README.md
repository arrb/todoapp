# Todo App

This is a Todo app that allows users to manage tasks, update due dates, and track overdue or upcoming tasks. The app uses React for the frontend, styled-components for styling, and integrates with a mock API to fetch and update data.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** 
- **npm** 

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/todo-app.git
```

2. Navigate into the project directory:
```bash
cd todo-app
```


3. Install dependencies and start:
```bash
npm install && npm start
```

4. This will start the app on http://localhost:3000 by default.

## Environmental Variables
1. Create a file named .env in the root of the project.
2. Add the following line to the .env file:
```bash
REACT_APP_API_KEY=your-api-key-here
```
3. Restart the server by running npm start


## Features
1. Edit Todos: Change the due date of a task.
2. Complete Todos: Mark a task as complete by checking the checkbox.
3. Track Overdue Tasks: Overdue tasks are highlighted in red and show how many days past the due date.
4. Track Upcoming Tasks: Upcoming tasks show how many days left until the due date.
5. Clear Due Date: You can clear the due date for a task by clicking the "×" button.

## todo
Add a way to add more tasks

## Technologies Used
- React: Frontend library for building user interfaces.
- styled-components: CSS-in-JS styling library for styling React components.
- date-fns: Library for working with JavaScript dates (used for formatting and comparing dates).
- Axios: Library for making HTTP requests to the API.
- React-datepicker: A date picker library for selecting dates.
