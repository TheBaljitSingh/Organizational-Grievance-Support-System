const mongoose = require('mongoose');

function generateUniqueId() {
  return new mongoose.Types.ObjectId().toHexString();
}

module.exports = generateUniqueId;