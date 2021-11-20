const db = require('../db')
const People = db.People

exports.getAllPeople = async (req, res) => {
	try {
		const people = await People.findAll()
		res.status(200).json({
			success: true,
			people
		})
	} catch (err) {
		res.status(500).send({
			error: true,
			message: 'unable to get people'
		})
	}
}

exports.addPerson = async (req, res) => {
	try {
		const { name, place } = req.body
		const person = await People.create({
			name,
			place
		})
		return res.status(200).json({
			success: true,
			person
		})
	} catch (err) {
		return res.status(500).send({
			error: true,
			message: 'unable to add person'
		})
	}
}

exports.updatePerson = async (req, res) => {
	try {
		const { personId } = req.params
		const { name, place } = req.body
		const person = await People.update({
			name,
			place
		}, {
			where: {
				id: personId
			}
		})
		return res.status(200).json({
			success: true,
			person
		})
	}
	catch (err) {
		return res.status(500).send({
			error: true,
			message: 'unable to update person'
		})
	}
}

exports.removePerson = async (req, res) => {
	try {
		const { personId } = req.params
		await People.destroy({
			where: {
				id: personId
			}
		})
		return res.status(200).json({
			success: true,
			message: 'Person removed successfully'
		})
	}
	catch (err) {
		return res.status(500).send({
			error: true,
			message: 'unable to remove person'
		})
	}
}

exports.getOnePerson = async (req, res) => {
	try {
		const { personId } = req.params
		const person = await People.findOne({
			where: {
				id: personId
			}
		})
		return res.status(200).json({
			success: true,
			person
		})
	}
	catch (err) {
		return res.status(500).send({
			error: true,
			message: 'unable to get person'
		})
	}
}