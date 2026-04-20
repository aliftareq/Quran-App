# Al-Quran

**Al-Quran** is a modern, full-stack web application designed for reading and reciting the Holy Quran with ease. It provides a structured interface where users can navigate through Surahs (chapters), access verse-by-verse translations, and customize their reading experience through a personalized typography system.

The platform is built with a focus on accessibility and performance, ensuring a seamless spiritual experience for users across all devices.

---

## Project Overview

The Al-Quran web app was developed to bridge the gap between traditional scripture and modern digital interfaces. Recognizing that every reader has different visual needs, this project prioritizes a "Typo System" that allows for high levels of readability customization.

This project consists of two parts:

- **Client Side** – A high-performance Next.js frontend providing an interactive and responsive reading interface.
- **Server Side** – A robust Node.js/Express backend following MCR (Middleware-Controller-Route) architecture for efficient data delivery.

---

# Client Side Repository

The frontend is built with the latest web technologies to ensure fast loading times and a smooth user interface. It focuses on clean layouts, searchability, and user-centric customization.

## Features

- **Surah Navigation**: Browse the Quran structurally by chapter.
- **Verse-by-Verse Translation**: Access detailed translations for every single verse.
- **Advanced Search**: Quickly find specific verses or translations using the built-in search functionality.
- **Typography Customization (Typo System)**:
  - Choose favorable fonts for Arabic script and translations.
  - Adjustable font sizes for comfortable reading and recitation.
- **Theme Support**: Integrated dark/light mode via `next-themes`.
- **Responsive UI**: Fully optimized for mobile, tablet, and desktop views using Tailwind CSS and Shadcn UI.

## Live Link

- **Hosted on Vercel** → [Al-Quran Live](https://al-quran-snowy-chi.vercel.app/)

## Technologies Used

- **Next.js** – 16.2.4
- **React** – 19.2.4
- **Tailwind CSS** – 4.x
- **Lucide React** – Icon library
- **Shadcn UI** – Accessible component primitives
- **Next Themes** – Theme management

---

# Server Side Repository

The backend service handles the data logic and serves the Quranic content through a structured API. It is designed using ESM (ECMAScript Modules) for modern JavaScript standards.

## Features

- **Built with Express.js** – Version 5.2.1
- **MCR Architecture** – Clean separation of concerns for better maintainability.
- **ESM Integration** – Uses native `import/export` syntax.
- **CORS Support** – Securely handles requests from the frontend.
- **Environment Management** – Secure configuration using `dotenv`.
- **Development Workflow** – Integrated with `nodemon` for rapid development.

## Live Link

- **Hosted on Vercel** → [Al-Quran API](https://quran-app-pearl-mu.vercel.app/)

## Technologies Used

- **Express.js** – 5.2.1
- **Node.js**
- **CORS** – 2.8.6
- **Dotenv** – 17.4.2
- **Nodemon** – 3.1.0 (Dev)

---

# Core Functionalities

Across the Al-Quran project, the core focus remains on:

- **Structural Integrity**: Organizing data logically by Surah and Ayah.
- **Readability**: The Typo System ensures that users of all ages can recite comfortably.
- **Performance**: Leveraging Next.js for server-side rendering and optimized Core Web Vitals.
- **Searchability**: Making the vast text of the Quran easily accessible through keyword search.

---

# Purpose of the Project

The goal of Al-Quran is to provide a digital sanctuary for readers. By combining sacred text with modern technology, the project aims to:

- **Enhance Understanding**: Providing translations alongside the original Arabic.
- **Improve Accessibility**: Allowing users to modify the "Typo System" to suit their eyesight requirements.
- **Ensure Speed**: Providing a lightweight alternative to heavy PDF files or cluttered apps.

---

# Author Note

This project was built with a commitment to writing clean, scalable code and providing a meaningful tool for the community. As a web developer, I focused on making the interface as intuitive as possible to allow the content to remain the primary focus.
