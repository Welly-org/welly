const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        default: new mongoose.Types.ObjectId("65b9c8665d118eb8717acc5a") // temporary: spongebob is default group creator 
    }, 
    members: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user', 
            default: []
        }
    ], 
    currentGoal: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'goal'
    }, 
    pastGoals: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'goal', 
            default: []
        }
    ], 
	pledge: {
		type: Number, 
		default: 0
	}
});

module.exports = Group = mongoose.model('group', GroupSchema);