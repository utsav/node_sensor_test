const Sensor = require('./../models/sensor');

exports.get = (req, res) => {
	Sensor.find().lean().exec((err, sensors) => {
		if(err) return res.status(400).json(err);
		return res.json(sensors);
	});
}