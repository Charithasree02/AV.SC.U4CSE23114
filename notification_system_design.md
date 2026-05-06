# Campus Notification System Design

## Project Overview

This project is a frontend notification system built using Next.js and TypeScript.

The application fetches notifications from the provided evaluation API and displays them in a clean and responsive interface.

The project also includes a reusable logging middleware to track important frontend events.

---

# Features

- Fetch notifications from API
- Display top 10 notifications
- Priority-based sorting
- Filter notifications by type
- Pagination support
- Read and unread notification tracking
- Responsive UI for desktop and mobile
- Logging middleware integration

---

# Technologies Used

- Next.js
- Next.js API Routes
- TypeScript
- Tailwind CSS
- Axios

---

# Folder Structure

```txt
src/
│
├── app/
├── components/
├── services/
├── utils/
├── middleware/
└── types/
```

# Notification Priority Logic

Notifications are sorted using the following priority:

1. Placement
2. Result
3. Event

If two notifications have the same priority, the newest notification is shown first based on timestamp.

Only the top 10 notifications are displayed.

# Read and Unread Notifications

When a user clicks a notification, it becomes marked as viewed.

Viewed notification IDs are stored using browser localStorage so the state remains even after refreshing the page.

# Filtering

Users can filter notifications using:

- All
- Placement
- Result
- Event

Filtering is connected to API query parameters.

# Pagination

Pagination is implemented using the page query parameter from the API.

Users can navigate between pages using Previous and Next buttons.

# Logging Middleware

A reusable logging middleware was created using the provided logging API.

Logs are generated for:

- Page loads
- API success and failure
- Filter changes
- Notification views

# UI Design

The UI was designed using Tailwind CSS.

The design focuses on:

- simplicity
- readability
- responsiveness
- clean notification cards

Different notification types use different badge colors for better visibility.

# Conclusion

This project demonstrates a simple and scalable frontend notification system with API integration, filtering, sorting, logging, and responsive design.
