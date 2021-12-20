const { Op } = require('sequelize')
const db = require('../db/index')
const Bill = db.Bills

exports.getOneBill = async (req, res) => {
	try {
		const { billId } = req.params
		const bill = await Bill.findByPk(billId, {
			include: [{
				model: db.People,
				as: 'buyer',
				attributes: ['id', 'name', 'place'],
			}, {
				model: db.People,
				as: 'seller',
				attributes: ['id', 'name', 'place'],
			}, {
				model: db.Grain,
				as: 'grain',
				attributes: ['id', 'name'],
			}]
		})
		if (!bill) return res.status(404).json({
			message: 'No bill found with id',
			error: true
		})
		return res.status(200).json({
			message: 'Bill',
			success: true,
			bill
		})
	} catch (error) {
		console.log('error is ', error)
		return res.status(500).json({
			message: 'Server error',
			error: true
		})
	}
}

exports.createBills = async (req, res) => {
	try {
		const { bills } = req.body
		const createdBills = await Bill.bulkCreate(bills)
		return res.status(201).json({
			success: true,
			bills: createdBills
		})
	} catch (error) {
		console.log('error is ', error)
		return res.status(500).json({
			message: 'Server error',
			error: true
		})
	}
}

exports.removeBill = async (req, res) => {
	try {
		const { billId } = req.params
		const bill = await Bill.findByPk(billId)
		if (!bill) return res.status(404).json({
			message: 'No bill found with id',
			error: true
		})
		await bill.destroy()
		return res.status(200).json({
			message: 'Bill deleted',
			success: true
		})
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: true
		})
	}
}

exports.updateBill = async (req, res) => {
	try {
		const { billId } = req.params
		const { bill } = req.body
		const billToUpdate = await Bill.findByPk(billId)
		if (!billToUpdate) return res.status(404).json({
			message: 'No bill found with id',
			error: true
		})
		await billToUpdate.update(bill)
		return res.status(200).json({
			message: 'Bill updated',
			success: true
		})
	} catch (error) {
		return res.status(500).json({
			message: 'Server error',
			error: true
		})
	}
}

exports.getBillsByBuyerId = async (req, res) => {
	try {
		const { buyerId, firmId } = req.params
		const bills = await Bill.findAll({
			where: {
				[Op.and]: {
					buyer_id: buyerId,
					firm_id: firmId
				}
			},
			include: [{
				model: db.People,
				as: 'buyer',
				attributes: ['id', 'name', 'place'],
			}, {
				model: db.People,
				as: 'seller',
				attributes: ['id', 'name', 'place'],
			}, {
				model: db.Grain,
				as: 'grain',
				attributes: ['id', 'name'],
			}, {
				model: db.Firm,
				as: 'firm',
				attributes: ['id', 'name'],
			}
			],
			order: ['date']
		})
		if (!bills) return res.status(404).json({
			message: 'No bill found with id',
			error: true
		})
		return res.status(200).json({
			message: 'Bill',
			success: true,
			bills
		})
	} catch (error) {
		console.log('error is ', error)
		return res.status(500).json({
			message: 'Server error',
			error: true
		})
	}
}