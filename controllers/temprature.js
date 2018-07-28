const Temprature = require('./../models/temprature');
const Sensor = require('./../models/sensor');
const io = require("socket.io").listen(3001);
const lastMinute = 3;
const maxPercentageDiff = 10;

exports.create = (req, res) => {

	const data = {
		sensorId: req.body.sensorId,
		temprature: req.body.temprature,
	}

	Temprature.create(data, (err, temprature) => {

		if (err) return res.status(400).send(err);

		res.send(true);

		io.emit("sensor", data);

		Sensor.update({
			sensorId : req.body.sensorId
		}, data, {
			upsert: true
		}, function(err) {
			if (err) console.log("err", err);
		});

		Temprature.aggregate([
				{
		            "$match": {
		                "createdAt": {"$gt": new Date( (new Date().getTime()) - 1000 * 60 * lastMinute)}
		            }
		        },
		        {
		            "$group": {
		                "_id": null,
		                "max": { "$max": "$temprature" }, 
        				"min": { "$min": "$temprature" } 
		            }
		        }
			], function (err, result) {
	        if (err) {
	            console.log("err", err);
	        } else {
	        	if (!result || !result[0]) { return; }
	        	const tempdiff = result[0];
				if (getDiffInPercentage(tempdiff.max, temprature.temprature) >= maxPercentageDiff) sentEmail();
				if (getDiffInPercentage(tempdiff.min, temprature.temprature) >= maxPercentageDiff) sentEmail();
	        }
	    });
	});
};

function sentEmail() {
	//sent mail code here
	console.log("sentmail");
}

function getDiffInPercentage(val1, val2) {
	if (val1 > val2) {
		return (val1-val2)/val2 * 100;
	} else {
		return (val2-val1)/val1 * 100;
	}
}