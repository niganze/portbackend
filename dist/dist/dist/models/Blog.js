"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var commentSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var blogSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // Image URL
  date: {
    type: Date,
    "default": Date.now
  },
  // Post date
  views: {
    type: Number,
    "default": 0
  },
  // View count
  owner: {
    type: String,
    required: true
  },
  // Owner's name
  comments: [commentSchema] // Array of comments
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});
var Blog = _mongoose["default"].model('Blog', blogSchema);
var _default = exports["default"] = Blog;