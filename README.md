# To-Do App ✅

A simple To-Do application to help you manage tasks efficiently. Built with Vite React JS, this app allows users to create, update, delete, and organize tasks with ease. The app also leverages AI for correcting grammar and other language issues in task text, ensuring tasks are clear and well-written.

## Features 🎉

- Add new tasks
- Mark tasks as complete or incomplete
- Edit or delete existing tasks
- Sort tasks based on All, Done, Pending, and Date
- Persistent data storage
- View total count of tasks
- Responsive design for desktop and mobile use
- AI based text improvement

## Tech Stack 🚀

- **Frontend:** React JS  
- **Tooling:** Vite  
- **Styling:** CSS and MUI
- **Testing:** Jest and React Testing Library
- **Context:** React Context API
- **Deployment** Vercel
- **AI Integration:** OpenAI

## Tools Selection 🔧

- **Vite:** Lightweight to set up and develop quickly.
- **MUI:** To create a clean, modern and consistent design.
- **Jest & React Testing Library:** Provides stable testing of the components and logic of the application.
- **React Context API:** Simple state management that doesn't need extra libraries.
- **Vercel** Robust integration with frontend frameworks and easy deployment.

## View Deployed app 🌐
- https://to-do-app-sammam.vercel.app

## Prerequisites 🗒️

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v22.x or higher)
- [npm](https://www.npmjs.com/) (v10.x or higher)
- OpenAI key (for AI text improvement, provided in zipped project folder) 
- A modern web browser (e.g., Safari, Chrome, Firefox, Edge)

## Environment Variables ⚙️

This app needs OpenAI key for AI text improvement.
For demo purposes, the key is provided in zipped file.

**If you are using the project clone**:
   - Create a .env file in the root of the project folder
   - Create a variable with the name VITE_OPENAI_API_KEY
   - Assign it your OpenAI API key

## How to Run ✈️

1. **Start the app using the command**:
   - The app will automatically open in your browser
   ```bash
   npm install && npm run dev
   ```
2. **Start the dev server (node_modules already installed)**:
   ```bash
   npm run dev
   ```
3. **View the app**:
   - Open your browser and navigate to `http://localhost:5173`
   - If unable to view the app click the link provided by Vite on npm run dev

4. **Run Tests**:
   ```bash
   npm test
   ```

## Project Structure

```
to-do-app/
├── src/                  # Source code
|   |── __tests__/        # Unit test files 
|   |── assets/           # Static assets (images)
│   ├── components/       # Reusable UI components
│   ├── context/          # React context for state management
│   ├── hooks/            # Custom React hooks
│   ├── Layout/           # Main app structure 
│   ├── models/           # Data model for the task in local storage
│   ├── utils/            # Constants and functions
│   └── App.js            # Main application component
├── .env                  # Environment variables
├── jest.config.cjs       # Jest configuration file
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Contact 🤝

For questions or feedback, reach out to [sammamsohail1@gmail.com](mailto:sammamsohail1@gmail.com)

---

Happy task managing! 🥂
