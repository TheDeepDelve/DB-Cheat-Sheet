
# DB Cheat Sheet Web App

>A modern, interactive web app providing quick reference cheat sheets for MongoDB, SQL, and PostgreSQL commands. Built with React and Tailwind CSS.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**DB Cheat Sheet** is a single-page web application that helps developers quickly find and copy essential database commands for MongoDB, SQL, and PostgreSQL. It features categorized sections, search, and a clean, responsive UI.

## Features
- Cheat sheets for MongoDB, SQL, and PostgreSQL
- Fast command search and filtering
- Categorized sections for each database
- Example reference tables

## Tech Stack
- [React](https://react.dev/) (v19)
- [Tailwind CSS](https://tailwindcss.com/)
- [Create React App](https://create-react-app.dev/)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```bash
git clone https://github.com/TheDeepDelve/DB-Cheat-Sheet.git
cd db-cheat-sheets
npm install
```

### Running Locally
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```
Output will be in the `build/` directory.

## Available Scripts

- `npm start` — Start the development server
- `npm test` — Run tests in watch mode
- `npm run build` — Build for production
- `npm run eject` — Eject configuration (not recommended)

## Folder Structure

```
db-cheat-sheets/
├── public/           
├── src/              
│   ├── App.js        
│   ├── App.css       
│   ├── index.js      
│   ├── index.css     
│   └── ...           
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Contributing

Contributions, suggestions, and improvements are welcome! Please open an issue or submit a pull request.

