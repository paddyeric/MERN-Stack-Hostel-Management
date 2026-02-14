# MERN Hostel Management Web App

A full-stack web application for managing hostel rooms, bookings, and user accounts. Built with the MERN stack (MongoDB, Express, React, Node.js).

### User Features
- User Authentication: Register and login functionality
- User Profile: View and manage user profile information
- Browse Rooms: View available hostel rooms with details
- Room Booking: Search and book rooms with date selection
- Booking Management: View and manage personal bookings
- Payment Integration: Stripe and Paystack payment gateway support

### Admin Features
- Admin Dashboard: Comprehensive admin panel for hostel management
- Room Management: Add new room listings
- Booking Management: View and manage all hostel bookings
- User Management: Monitor and manage user accounts

### Additional Features
- Responsive Design: Works seamlessly across desktop, tablet, and mobile devices
- Date Range Selection: Easy-to-use date picker for booking dates
- Real-time Notifications: SweetAlert2 for user feedback
- Modern UI: Material-UI, Ant Design and Bootstrap components for professional appearance

## Tech Stack

### Frontend
- React 19.2.3 - UI library
- React Router DOM 7.12.0 - Client-side routing
- Material-UI 7.3.7 - Component library
- React Bootstrap 2.10.10 - Bootstrap components
- Axios 1.13.2 - HTTP client
- Stripe & Paystack - Payment processing
- SweetAlert2 - Alerts and notifications
- Ant Design - Additional UI components
- React Spinners - Loading indicators

### Backend
- Node.js & Express 5.2.1 - Server framework
- MongoDB - NoSQL database
- Mongoose 9.1.2 - MongoDB ODM
- Nodemon - Development server auto-reload
- CORS - Cross-origin resource sharing
- dotenv - Environment variable management

### For Users
1. Register - Create a new account on the registration page
2. Login - Sign in with your credentials
3. Browse Rooms - View available rooms on the home page
4. Book a Room - Select room and date range, then proceed to payment
5. View Bookings - Check your bookings in the profile section
6. Manage Profile - Update your personal information

### For Admins
1. Access the admin panel at `/admin`
2. Manage Rooms - Add new room listings
3. View Bookings - Monitor all bookings in the system
4. View Users - See all registered users