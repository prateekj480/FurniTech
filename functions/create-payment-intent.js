const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
    const { totalAmount, shippingFee } = JSON.parse(event.body)

    const calculateOrderAmount = () => {
        return totalAmount + shippingFee
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(),
            currency: 'usd',
            description: 'Software development services',
            shipping: {
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            }
        })
        return ({
            statusCode: 200,
            body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
        })
    } catch (error) {
        return ({
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        })
    }
}