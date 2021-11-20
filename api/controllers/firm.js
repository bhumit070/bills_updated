const db = require('../db/index');
const Firm = db.Firm

exports.getAllFirms = async (req, res) => {
	try {
		const firms = await Firm.findAll()
		return res.status(200).json({
			success: true,
			firms
		})
	} catch (error) {
		return res.status(500).json({
			message: 'Error getting all firms',
			error: true
		})
	}
}

exports.addNewFirm = async (req, res) => {
	try {
		const { name, pan, address } = req.body
		const firm = await Firm.create({
			name,
			pan,
			address
		})
		return res.status(201).json({
			success: true,
			firm
		})
	} catch (error) {
		console.log('error is ', error);
		return res.status(500).json({
			message: 'Error adding firms',
			error: true
		})
	}
}

exports.getOneFirm = async (req, res) => {
	try {
		const { firmId } = req.params

		const firm = await Firm.findByPk(firmId)

		if (!firm) return res.status(404).json({
			message: 'No firm found with id',
			error: true
		})

		return res.status(200).json({
			message: 'Firm',
			success: true,
			firm
		})

	} catch (error) {
		return res.status(500).json({
			message: 'Error getting firm',
			error: true
		})
	}
}

exports.removeFirm = async (req, res) => {
	try {
		const { firmId } = req.params
		await Firm.destroy({
			where: { id: firmId }
		})
		return res.status(200).json({
			success: true,
			message: 'firm removed successfully'
		})
	} catch (error) {
		console.log('error is ', error);
		return res.status(500).json({
			error: true,
			message: 'error removing firms'
		})
	}
}