# Lallan AI - Next.js Application

Welcome to Lallan AI, a Next.js application! This README.md file provides an overview of the project structure and guides you on how to get started.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

## Project Structure

Lallan AI follows a standard Next.js 13 project structure. Below is an overview of the main directories and files you'll find in this application:

<pre>
lallan-ai/
   |- public/
   |    |- assets/
   |    |- svg/
   |- scr/
   |    |- app/  
   |    |- components/
   |    |- context/
   |    |- hooks/
   |    |- services/
   |    |- styles/
   |    |- types/
   |    |- utills/
   |    |- middleware.ts
   |- styles/
   |- .env.local
   |- next.config.js
   |- package.json
   |- README.md
</pre>

- **.next/**: This directory is automatically generated by Next.js when you run the development or production build. It contains the compiled and optimized version of your application.

- **components/**: This directory holds reusable React components used throughout the application. You can create and organize your components here.

- **app/**: The `app` directory is where you define your application's custom logic, utilities, and services. This includes hooks, context providers, API functions, and other application-specific code.

- **public/**: This directory is used to store static assets such as images, fonts, or any other files that need to be publicly accessible.

- **styles/**: In this directory, you can define global styles, CSS modules, or any other styling solution you prefer for your application.

- **.env.local**: This file is used to store environment variables for your application in a local development environment. You can define various settings or API keys here. Remember not to commit this file to version control.

- **next.config.js**: This file allows you to configure Next.js and customize the build process. You can set up plugins, configure webpack, and define other Next.js-specific settings here.

- **package.json**: This file contains the project's dependencies and scripts. You can use npm or Yarn to install dependencies and run various scripts defined in this file.

## Getting Started

To get started with Lallan AI, follow these steps:

1. Clone the repository to your local machine.

   `git clone git@github.com:viitoradmin/lallanai-frontend.git`

2. Navigate to the project directory.

   `cd lallanai-frontend`

3. Install the dependencies using npm or Yarn.

   `npm install` or `yarn install`

4. Start the development server.

   `npm run dev` or `yarn dev`

5. Open your browser and visit http://localhost:3000 to see the application running.

Before you start codding, please take note that we have implemented the `supabase` in this project. So before running this project add the configuration inside `.env`/`.env.local` file.
