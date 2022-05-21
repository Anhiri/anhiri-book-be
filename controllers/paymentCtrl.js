const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, phoneNumber, name, address} = req.body;

            const {_id, email} = user;
            for (const c of cart) {
                const product = await Products.findById(c.product._id);
                if (!product) {
                    return res.status(400).json({msg: "Product not found."})
                }

                if (product.total < c.quantify) {
                    return res.status(400).json({msg: "Sold out."})
                }
            }

            const newPayment = new Payments({
                user_id: _id, name, email, cart, phoneNumber, address
            })

            await Promise.all(cart.map(item => {
                return sold(item.product._id, item.quantify)
            }))


            await newPayment.save()
            res.json({msg: "Payment Succes!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    statistic:async  (req, res, next) => {
        try {
            const [{total}] = await Payments.aggregate([
                {
                    "$addFields": {
                        "cart": {
                            "$map": {
                                "input": "$cart",
                                "as": "row",
                                "in": {
                                    "id": "$$row.product.id",
                                    "total": { "$multiply": [ '$$row.quantify', "$$row.product.price" ]},
                                }
                            }
                        },
                    }
                },
                {
                    "$unwind": "$cart"
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: '$cart.total'
                        }
                    }
                }
            ])


            res.json({total})

        } catch (e) {
            return res.status(500).json({msg: e.message})
        }
    }
}

const sold = async (id, quantity) =>{
    await Products.updateOne({_id: id}, {
        $inc: {
            sold: quantity,
            total: -quantity
        }
    })
}

module.exports = paymentCtrl
