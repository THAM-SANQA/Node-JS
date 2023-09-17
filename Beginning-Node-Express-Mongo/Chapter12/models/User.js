const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a Username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"]
    }
});

// validator will check for duplicate database entries 
// and report them like any other validation error
UserSchema.plugin(uniqueValidator);

// we tell mongoose that before we save any record into the Users Schema or collection,
// we first have to excecute the 2nd argument
UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;