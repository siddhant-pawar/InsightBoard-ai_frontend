
<p align="center"><h1 align="center">INSIGHTBOARD-AI_FRONTEND</h1></p>
<p align="center">
	<em>An AI-powered frontend dashboard for task management and transcript analytics</em>
</p>

---

## Overview

**InsightBoard-AI_FRONTEND** is the TypeScript and React-based frontend application for InsightBoard-AI. It provides an interactive dashboard, task management interface, and transcript analysis tools. Designed with modern UI components and optimized for productivity, it works seamlessly with the InsightBoard-AI backend API.

---

## Features

- **Task Management UI**: Create, edit, filter, and manage tasks efficiently.
- **Dashboard & Analytics**: Visualize stats and insights through charts and cards.
- **Transcript Processing**: Display and analyze transcripts from backend AI services.
- **Reusable UI Components**: Fully modular UI built with React, Tailwind CSS, and custom hooks.
- **TypeScript Support**: Type-safe frontend development.
- **Dockerized Deployment**: Easy deployment using Docker.
- **Testing Suite**: Includes basic frontend tests for components and API services.

---

## Project Structure

```sh
└── InsightBoard-ai_frontend/
    ├── Dockerfile
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── src/
    │   ├── App.css
    │   ├── App.tsx
    │   ├── components/
    │   ├── hooks/
    │   ├── index.css
    │   ├── lib/
    │   ├── main.tsx
    │   ├── services/
    │   ├── types/
    │   ├── utils/
    │   └── vite-env.d.ts
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
````

### Project Index

* `src/main.tsx`: Entry point for React application.
* `src/App.tsx` & `App.css`: Main app layout and styles.
* `src/components/`: Modular UI components for tasks, dashboard, transcripts, and general UI elements.
* `src/hooks/`: Custom hooks like `useTasks` and `use-toast`.
* `src/lib/`: Utility functions for frontend logic.
* `src/services/api.ts`: API interface connecting to backend.
* `src/types/`: TypeScript type definitions.
* `src/utils/`: Constants and helper functions.
* `index.html`: Root HTML file.
* `package.json` & `package-lock.json`: Project dependencies.
* `vite.config.ts`: Vite configuration for development and build.
* `tailwind.config.js` & `postcss.config.js`: Tailwind CSS setup.
* `Dockerfile`: Containerized deployment.

---

## Getting Started

### Prerequisites

Before starting, ensure your environment includes:

* **TypeScript 4.x+**
* **Node.js & npm 18+**
* **Docker** (optional for container deployment)

### Installation

**Build from source:**

```sh
git clone https://github.com/siddhant-pawar/InsightBoard-ai_frontend
cd InsightBoard-ai_frontend
npm install
```

**Using Docker:**

```sh
docker build -t insightboard-ai_frontend .
docker run -it insightboard-ai_frontend
```

---

### Usage

**Start with npm:**

```sh
npm start
```

**Start with Docker:**

```sh
docker run -it insightboard-ai_frontend
```

---

### Testing

Run the test suite:

```sh
npm test
```

---

## Project Roadmap

* [x] **Task 1**: <strike>Implement core task management UI.</strike>
* [ ] **Task 2**: Implement dashboard analytics features.
* [ ] **Task 3**: Add advanced transcript visualization tools.

---

## Contributing

* **💬 [Join Discussions](https://github.com/siddhant-pawar/InsightBoard-ai_frontend/discussions)**
* **🐛 [Report Issues](https://github.com/siddhant-pawar/InsightBoard-ai_frontend/issues)**
* **💡 [Submit Pull Requests](https://github.com/siddhant-pawar/InsightBoard-ai_frontend/blob/main/CONTRIBUTING.md)**

<details closed>
<summary>Contributing Guidelines</summary>

1. Fork the repository.
2. Clone locally:

   ```sh
   git clone https://github.com/siddhant-pawar/InsightBoard-ai_frontend
   ```
3. Create a new branch:

   ```sh
   git checkout -b feature-name
   ```
4. Make and test changes.
5. Commit changes:

   ```sh
   git commit -m "Description of feature"
   ```
6. Push and submit a Pull Request.

</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/siddhant-pawar/InsightBoard-ai_frontend/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=siddhant-pawar/InsightBoard-ai_frontend">
   </a>
</p>
</details>

---

## Acknowledgments

* Built with React, TypeScript, and Tailwind CSS.
* Inspired by modern AI-powered productivity tools.
* Open-source contributors in frontend development and UI libraries.

