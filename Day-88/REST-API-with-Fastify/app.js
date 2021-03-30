const fastify = require("fastify")({
    logger: true
});
const mongoose = require("mongoose");

// bringing routes...
const courseRoutes = require("./src/routes/course");

// db-connection...
mongoose.connect( "mongodb://localhost/fastify-learning" )
.then(()=> console.log("Mongo is ready") )
.catch( error => console.log(error));

// routes
fastify.get("/", async( request, reply )=>{
    return { visiter: "AakashIsBest.in" }
});

courseRoutes.forEach(( route, index )=>{
    fastify.route( route );
});

// starting Server...
const start = async()=>{
    try {
        await fastify.listen( 3000 );
        fastify.log.info(`Server is running at ${ address }`);
    } catch (error) {
        
    }
};

start();