# notificationPanel
## User flow

1. **User clicks a bell icon** - Displays the number of unread notifications.
2. **Notification dropdown panel is shown**:
    - There is a button for adding a new notification:
        1. **Opens a modal with a form**:
            - Dropdown select for notification type.
            - Other fields that apply for the selected type (use validation)
            - **Create button** which adds the notification to the list.
            - **Close button** which cancels the creation of the notification.
    - Each notification has a type:
        1. **[Platform update]** → New features - see what’s new → On click, the app shows an alert(`"1.2.3"`).
        2. **[Comment Tag]** → `<Somebody>` tagged you in a comment → On click, the app takes you to `/comments` 
        3. **[Access granted]** → `<Somebody>` shared a chat with you → On click, the app takes you to `/chats`.
        4. **[Join workspace]** → `<Somebody>` joined your workspace → On click, the app takes you to `/workspace`.
    - Each notification type has a different color.
    - Notification type is selected when creating the notification.
    - **Release number** should be entered for the platform update notification type.
    - **Person name** should be entered (if applicable) for specific notification types.
    - Once a notification is clicked, it is considered read (default state is unread).
    - Each notification should have an **avatar** (if the notification comes from a person) and a **system icon** if it’s a platform update notification.
    - Backend to handle the notifications

## Tech Stack

## Stack and requirements
* **NextJS 14** (App Router)
* **TypeScript**
* **React 18**
* **PostgreSQL**
* **Prisma**
* **tRPC**
* **Tailwind CSS** (no other libraries)
* **Radix UI**
* **React Context**
* **React Hook Form** and **Zod**
* **useQuery**
* **Deployment on Vercel**