"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var projectSchema = new _mongoose["default"].Schema({
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
    required: true // URL for project image
  },
  techStack: {
    type: [String],
    // Array of technologies used
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});
var Project = _mongoose["default"].model('Project', projectSchema);
var _default = exports["default"] = Project;