# User Management Dashboard

A responsive React-based User Management Dashboard that allows users to view, search, sort, filter, add, edit, and delete user records using the JSONPlaceholder REST API.

---

## Project Overview

This project demonstrates a complete CRUD (Create, Read, Update, Delete) application built with React and Vite.

The application fetches user data from the JSONPlaceholder API and provides an intuitive interface for managing users with additional features such as search, sorting, filtering, pagination, validation, and responsive design.

> **Note:** JSONPlaceholder is a mock REST API. POST, PUT, and DELETE requests simulate successful responses but do not persist changes after a page refresh.

---

## Features

- View users from JSONPlaceholder API
- Add new users
- Edit existing users
- Delete users
- Search users
- Sort users by:
  - ID
  - First Name
  - Last Name
  - Email
  - Department
- Filter users by:
  - First Name
  - Last Name
  - Email
  - Department
- Pagination
  - 10
  - 25
  - 50
  - 100 entries
- Client-side validation
- Loading spinner
- Error handling
- Toast notifications
- Responsive design
- Unit tests using Vitest and React Testing Library

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript (ES6+)
- CSS3

### API

- Axios
- JSONPlaceholder REST API

### Testing

- Vitest
- React Testing Library

### Notifications

- React Toastify

---

## Folder Structure

```
src/
│
├── api/
│   ├── axios.js
│   └── userApi.js
│
├── components/
│   ├── FilterPopup/
│   ├── Loader/
│   ├── Pagination/
│   ├── SearchBar/
│   ├── UserForm/
│   └── UserTable/
│
├── hooks/
│   └── useUsers.js
│
├── pages/
│   ├── Dashboard.jsx
│   └── Dashboard.css
│
├── tests/
│   ├── SearchBar.test.jsx
│   ├── UserForm.test.jsx
│   ├── UserTable.test.jsx
│   └── setup.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/user-management-dashboard.git
```

Go to the project

```bash
cd user-management-dashboard
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

## Running Tests

```bash
npm test
```

---

## Build for Production

```bash
npm run build
```

---

## API Used

JSONPlaceholder

https://jsonplaceholder.typicode.com/users

---

## Assumptions

- JSONPlaceholder is a mock backend.
- Added, edited, or deleted users are maintained only in the application's local state.
- Refreshing the page reloads the original API data.
- Departments are assigned locally for demonstration purposes.

---

## Challenges Faced

- Implementing sorting while maintaining search and filter functionality.
- Managing shared state between Add and Edit forms.
- Combining pagination with search, sorting, and filtering.
- Creating reusable React components for scalability.

---

## Future Improvements

- Persistent backend database
- User authentication
- Role-based access
- Export users to CSV or Excel
- Dark mode
- Advanced filters
- Infinite scrolling
- Server-side pagination

---

# Live Published through Netlify
stupendous-dolphin-c12ad6.netlify.app

## Author

**B. Vasanth**
