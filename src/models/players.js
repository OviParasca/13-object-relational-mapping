'use strict';

import mongoose from 'mongoose';


const playerSchema = mongoose.Schema({
  name: {type: String, required: true},
  position: {type: String, required: true},
  bats: {type: String, default: 'R'},
  throws: {type: String, enum:['L', 'R']},
});

playerSchema.pre('save', function(next) {
  this.position = this.position.toUpperCase();
  this.bats = this.bats.toUpperCase();
  this.throws = this.throws.toUpperCase();
  next();
});


export default mongoose.model('players', playerSchema);
