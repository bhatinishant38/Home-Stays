# Home Stay Clone

A full-stack web application that replicates core features of Home Stay, built with Node.js, Express.js, MongoDB, and EJS. Users can browse properties, create listings as hosts, manage bookings, and maintain favorites.

## 🌟 Features

- **User Authentication**: Sign up and login with secure password encryption using bcryptjs
- **Dual User Roles**:
  - **Hosts**: Can list properties, manage listings, view bookings
  - **Guests**: Can browse properties, add to favorites, make bookings
- **Property Management**:
  - Create, edit, and delete home listings
  - Upload property images
  - Add detailed descriptions and pricing
  - Rate properties
- **Favorites System**: Save and manage favorite properties
- **Booking Management**: View and manage property bookings
- **Session Management**: Secure session handling with MongoDB session store
- **File Uploads**: Image upload for property listings with validation
- **Responsive UI**: Built with EJS templates and Tailwind CSS styling

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework (v5.2.1)
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling (v9.7.4)
- **Express Session** - Session management
- **Multer** - File upload handling (v2.2.0)
- **Bcryptjs** - Password encryption (v3.0.3)
- **Express Validator** - Input validation (v7.3.2)

### Frontend

- **EJS** - Templating engine (v6.0.1)
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5/CSS3**

### Development

- **Nodemon** - Auto-restart server during development
- **PostCSS** - CSS transformation

## 📁 Project Structure

```
Home Stay/
├── app.js                     # Application entry point
├── package.json               # Dependencies and scripts
├── controllers/               # Route handlers
│   ├── authController.js      # Authentication logic (login/signup)
│   ├── hostController.js      # Host property management
│   ├── storeController.js     # Guest/store browsing logic
│   └── error404.js            # 404 error handling
├── models/                    # Database schemas
│   ├── home.js                # Property listing model
│   └── user.js                # User model
├── routes/                    # API routes
│   ├── authrouter.js          # Authentication routes
│   ├── hostRouter.js          # Host management routes
│   └── storeRouter.js         # Store/browsing routes
├── views/                     # EJS templates
│   ├── 404.ejs                # 404 error page
│   ├── style.css              # Global styles
│   ├── Auth/                  # Authentication pages
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── host/                  # Host management pages
│   │   ├── edit-home.ejs
│   │   ├── home-Added.ejs
│   │   └── host-home-list.ejs
│   ├── store/                 # Guest/store pages
│   │   ├── bookings.ejs
│   │   ├── favourite-list.ejs
│   │   ├── home-detail.ejs
│   │   ├── home-list.ejs
│   │   └── index.ejs
│   └── partials/              # Reusable components
│       ├── head.ejs
│       ├── nav.ejs
│       └── favourites.ejs
├── public/                    # Static files
│   ├── home.css
│   └── images/
├── uploads/                   # Uploaded property images
└── utils/                     # Utility functions
    └── pathUtil.js            # Path utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Home Stay
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure MongoDB Connection**
   - Update the `DB_PATH` in `app.js` with your MongoDB connection string
   - Replace the current connection string with your MongoDB Atlas URI or local MongoDB URI

4. **Create required directories**

```bash
mkdir -p uploads public/images
```

5. **Start the development server**

```bash
npm start
```

The application will start on `http://localhost:5009`

## 📋 Environment Configuration

Update the following in `app.js`:

- **DB_PATH**: MongoDB connection string
- **PORT**: Server port (default: 5009)
- **SESSION_SECRET**: Session encryption secret (currently hardcoded - consider using environment variables)

## 🔑 Key API Endpoints

### Authentication

- `GET /auth/login` - Login page
- `POST /auth/login` - Submit login
- `GET /auth/signup` - Signup page
- `POST /auth/signup` - Submit signup
- `POST /auth/logout` - Logout

### Store (Guest)

- `GET /` - Homepage with property listings
- `GET /homes/:id` - Property details
- `POST /homes/:id/favorite` - Add to favorites
- `GET /favorites` - View favorite properties
- `GET /bookings` - View user bookings
- `POST /bookings` - Create new booking

### Host Management

- `GET /host` - Host dashboard
- `GET /host/add-home` - Add property form
- `POST /host/add-home` - Create new property
- `GET /host/edit/:id` - Edit property form
- `POST /host/edit/:id` - Update property
- `POST /host/delete/:id` - Delete property

## 🔐 Security Features

- **Password Encryption**: Passwords are hashed using bcryptjs
- **Session Management**: Secure session storage in MongoDB
- **Input Validation**: Express-validator for server-side validation
- **File Upload Validation**: Only JPEG and PNG images allowed
- **Protected Routes**: Host routes require authentication

## 📸 File Upload

The application uses Multer for handling property image uploads:

- **Destination**: `uploads/` folder
- **Filename**: Generated with random string prefix to avoid conflicts
- **Allowed Types**: JPEG, PNG, JPG
- **Size Limit**: Default Multer settings (no explicit limit configured)

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Custom CSS**: Additional styling in `views/style.css` and `public/home.css`
- **Responsive Design**: Mobile-friendly layouts using Tailwind utilities

## 🔧 Available Scripts

```bash
# Start development server with auto-restart
npm start

# Run tests (not configured)
npm test
```

## 📝 Usage Examples

### Create a User Account

1. Navigate to the signup page
2. Enter email and password
3. Select user type (Host or Guest)
4. Submit to create account

### As a Host: Create a Property Listing

1. Login as a host
2. Navigate to "Add Home"
3. Fill in property details (name, price, location, rating, description)
4. Upload property photo
5. Submit to create listing

### As a Guest: Browse and Book

1. Login as a guest
2. Browse available properties on homepage
3. Click on a property for details
4. Add to favorites if interested
5. Make a booking by submitting booking form

## 🐛 Known Issues & Improvements

- Session secret is hardcoded (should use environment variables)
- MongoDB connection string is hardcoded (should use .env file)
- Error handling could be more comprehensive
- Input validation could be expanded
- Consider adding password reset functionality
- File upload size limits should be configured
- Add unit and integration tests

## 🚀 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications for bookings
- [ ] Rating and review system
- [ ] Search filters and sorting
- [ ] Map integration for property locations
- [ ] User profile management
- [ ] Admin panel for moderation
- [ ] Real-time notifications
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Docker containerization
- [ ] Automated testing
- [ ] Dark mode support

## 📜 License

ISC

## 👤 Author

Created as a practice project for learning full-stack web development.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements or bug fixes.

---

**Note**: This is a practice/learning project. Before deploying to production, ensure to:

- Use environment variables for sensitive data
- Implement comprehensive error handling
- Add input validation and sanitization
- Set up proper logging
- Configure CORS appropriately
- Add authentication middleware improvements
- Use HTTPS in production
- Implement rate limiting
