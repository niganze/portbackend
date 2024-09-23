"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _db = _interopRequireDefault(require("./config/db.js"));
var _contactRoutes = _interopRequireDefault(require("./routes/contactRoutes.js"));
var _projectRoutes = _interopRequireDefault(require("./routes/projectRoutes.js"));
var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes.js"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport2 = require("./config/passport.js");
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();

// Middleware to parse JSON
app.use(_express["default"].json());
var corsOptions = {
  origin: ["http://localhost:5173", "https://portbackend-it4o.onrender.com", "https://niganzealain.vercel.app"],
  optionsSuccessStatus: 200,
  credentials: true
};

// Use CORS middleware with options
app.use((0, _cors["default"])(corsOptions));

// Connect to MongoDB
(0, _db["default"])();

// Express Session
app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport and session
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

// Google Strategy
(0, _passport2.googleStrategy)(_passport["default"]);

// Use routes
app.use('/api', _contactRoutes["default"]);
app.use('/api/projects', _projectRoutes["default"]);
app.use('/api/blogs', _blogRoutes["default"]);
app.use(_authRoutes["default"]);

// Example route
app.get('/', function (req, res) {
  res.send('API is running...');
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});