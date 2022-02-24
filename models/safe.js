const mongoos = require("mongoose");

const safeSchema = new mongoos.Schema({
  safeName: {
    type: String,
    required: true,
    unique: true,
  },
  safeOwner: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  secrets: {
    type: Array,
    uniqueItems: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoos.model("safe", safeSchema);
