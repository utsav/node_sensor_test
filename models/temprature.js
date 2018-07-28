const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempratureSchema = new Schema({
	sensorId: {
		type: String,
		require: true,
		trim: true,
	},
	temprature: {
		type: Number,
		require: true,
	}
}, {
	timestamps: true 
});

const temprature = mongoose.model('temprature', TempratureSchema);

module.exports = temprature;
