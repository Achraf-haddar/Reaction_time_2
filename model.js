var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        gender: {type: String, required:[true, 'Please enter a gender']},
        age: {type: String, required:[true, 'Please enter an age']},
        score1: {type: String, required:[true, 'Please enter a score 1']},
        score2: {type: String, required:[true, 'Please enter a score 2']},
        score3: {type: String, required:[true, 'Please enter a score 3']},
        average_score: {type: String, required:[true, 'Please enter an average score']},
        app: {type: String, required:[true, 'Please enter the app name']},
        created_at: {
            type:Date, 
            default:Date.Now
        }
    }
);

// Fonction de h
userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

userSchema.set('toJSON', {virtuals: true});

// fire a function before doc saved to db (hash the password)
userSchema.pre('save', function(next){
    var currentDate = new Date();
    if (!this.created_at){
        this.created_at = currentDate
    }
    next(); //appeler le prochain trigger
});


// fire a function after doc saved to db
userSchema.post('save', function(doc, next){
    console.log('new user info was created & saved', doc);
    next();
});


const User = mongoose.model('user', userSchema);
module.exports = User;
