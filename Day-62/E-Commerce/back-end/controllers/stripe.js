const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid/v4");

exports.makePayment = ( request, response )=>{
    const { products, token } = request.body;

    console.log(products);

    let amount = 0;
        
    products.map( p => {
        amount = amount + p.price;
    });

    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then( customer =>{
        stripe.charge.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: "A test account",
            shipping: {
                name: token.card.name                
            }
        }, { idempotencyKey })
        .then( result => response.status(200).json( result ))
        .catch( error => console.log(error) );
    })
    .catch();
};