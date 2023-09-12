# Asset Management Frontend

This is the frontend of the Asset Management system, which allows users to manage street lights and drainage information.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed.
- Backend server: Ensure the backend server is up and running.
- `.env` file: Create a `.env` file in the project root directory and define the necessary environment variables (see Environment Variables).

## Installation

To install the project dependencies, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/asset-managment-fe.git

2. Change your directory to the project folder:

   ```bash
   cd asset-managment-fe

3. Install the project dependencies:

   ```bash
   npm install

## Environment Variables

Create a .env file in the root directory of the project and add the following environment variables


## Usage

    ```bash
    npm start

The application will be available at http://localhost:3000.


### Folder Structure

The project is organized into the following main folders:

- `src/components`: Contains reusable components used throughout the application.
- `src/pages`: Contains individual pages/routes of the application.
- `src/store`: Contains Redux store configuration and slices.
- `src/templates`: Contains page templates for consistent layout.
- `src/types`: Contains TypeScript type definitions used in the application.
- `src/utils`: Contains utility functions.

### Features

The Asset Management Frontend offers the following features:

- View a list of street lights and drainage information.
- Add, edit, and delete street lights and drainage data.
- Search for street lights and drainage data.
- User authentication and login/logout functionality.

### Built With

This project is built using the following technologies:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Redux Toolkit](https://redux-toolkit.js.org/) - A library for efficient Redux development.
- [Axios](https://axios-http.com/) - A promise-based HTTP client for making requests.
- [Formik](https://formik.org/) - A library for building forms in React.
- [Yup](https://github.com/jquense/yup) - A JavaScript schema builder for form validation.
- [Google Maps API](https://developers.google.com/maps/documentation) - For displaying maps and location data.
- [Material-UI](https://material-ui.com/) - A popular React UI framework.
- [TypeScript](https://www.typescriptlang.org/) - A statically typed superset of JavaScript.
- [Styled-components](https://styled-components.com/) - For styling React components.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

We would like to acknowledge the following technologies and tools that have contributed to the development of this project:

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) - The foundation for bootstrapping the React application.
- [Redux Toolkit](https://redux-toolkit.js.org/) - For state management.
- [Material-UI](https://material-ui.com/) - For UI components.
- [Formik](https://formik.org/) - For form handling.
- [Yup](https://github.com/jquense/yup) - For form validation.
- [Axios](https://axios-http.com/) - For HTTP requests.
- [Google Maps API](https://developers.google.com/maps/documentation) - For maps and location services.
