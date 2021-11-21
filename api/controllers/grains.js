const db = require('../db');
const Grain = db.Grain;

exports.addGrain = async (req, res) => {
	try {
		const grain = await Grain.create(req.body);
		return res.status(201).json({
			success: true,
			grain
		});
	} catch (err) {
		return res.status(400).json({
			error: true,
			message: "unable to add grain"
		});
	}
};

exports.getGrains = async (req, res) => {
	try {
		const grains = await Grain.findAll();
		return res.status(200).json({
			success: true,
			grains
		});
	} catch (err) {
		return res.status(400).json({
			error: true,
			message: "unable to get grains"
		});
	}
}

exports.deleteGrain = async (req, res) => {
	try {
		const grain = await Grain.destroy({
			where: {
				id: req.params.id
			}
		});
		return res.status(200).json({
			success: true,
			grain
		});
	} catch (err) {
		return res.status(400).json({
			error: true,
			message: "unable to delete grain"
		});
	}
}