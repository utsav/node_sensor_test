const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SensorSchema = new Schema({
	sensorId: {
		type: String,
		require: true,
		trim: true,
		unique: true,
	},
	temprature: {
		type: Number,
		require: true,
	}
}, {
	timestamps: true 
});

const sensor = mongoose.model('sensor', SensorSchema);

module.exports = sensor;
