# Giggle Gram

**Giggle Gram** is a social media platform where users can share their photos, view posts from others, and engage with the content through comments. The app is built using modern web development technologies to ensure a seamless user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Photo Sharing**: Users can upload and share their photos with the community.
- **News Feed**: Browse through a feed of photos posted by other users.
- **Comments**: Users can comment on others' posts and engage with the community.
- **Responsive UI**: Built with Tailwind CSS for a smooth and responsive user experience across devices.
- **Real-time Backend**: Powered by Appwrite for fast and secure user authentication, database interactions, and storage.

## Tech Stack

- **Frontend**: 
  - [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Redux Toolkit](https://redux-toolkit.js.org/) - A powerful tool for managing application state.
  - [React Router](https://reactrouter.com/) - For managing navigation and routes.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.

- **Backend**:
  - [Appwrite](https://appwrite.io/) - Backend-as-a-Service (BaaS) providing APIs for user authentication, database management, and more.

- **Tools & Libraries**:
  - [Vite](https://vitejs.dev/) - Next-generation frontend tooling.
  - [Axios](https://axios-http.com/) - For making HTTP requests.
  - Latest JavaScript frameworks and libraries for optimized performance.

## Installation

Follow the steps below to set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/giggle-gram.git
    cd giggle-gram
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure Backend**:
   - Set up your [Appwrite](https://appwrite.io/) instance and create a project.
   - Add the Appwrite credentials (API keys, project ID, etc.) to your `.env` file.

4. **Create `.env` file**:
   - Create a `.env` file in the root directory and add your environment variables:
     ```
     VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
     VITE_APPWRITE_PROJECT_ID=your-project-id
     ```

## Running the Project

Once the setup is complete, run the following command to start the development server:

```bash
npm run dev
