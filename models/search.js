//create Search
const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  search: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Search', SearchSchema);
