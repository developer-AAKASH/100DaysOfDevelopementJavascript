const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set( 'view engine', 'ejs' );
app.use( bodyParser.urlencoded({
  extended: true
}));

app.use( express.static( "public" ));

mongoose.connect( "mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
// ---------------------setting up all the things for the app...

// DB schema..........
const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model( "Article", articleSchema );
//------------------------------------------------------------------------------------
// -------------Request routes...............

// -----------------------getting all the things.....
app.route( "/article")
// getting all the articles...
.get( ( request, response )=>{
  Article.find( ( error, articles )=>{
    if( error ){
      console.log(error);
    } else {
      response.send( articles );
    }
  });
})
// adding articles....
.post( ( request, response )=>{
  const newArticle = new Article({
    title: request.body.title,
    content: request.body.content
  });

  newArticle.save( ( error )=>{
    if( error ){
      response.send( error );
    } else {
      response.send( "Succecfuly added new article...");
    }
  });
})
.delete( ( request, response )=>{
  Article.deleteMany( ( error )=>{
    if( error ){
      response.send( error );
    } else {
      response.send( "Succecfuly deleted all the articles..." );
    }
  });
});
//------------------------------------------------------------------------------------
// -----------------------doing on some particular things.....

app.route( "/article/:articleTitle" )
.get( ( request, response )=>{
  const title = request.params.articleTitle;

  Article.findOne({ title: title }, ( error, article )=>{
    if( article ){
      response.send( article );
    } else {
      response.send( "No articles found matching with the title..." );
    }
  });
})
.put( ( request, response )=>{
  const titleToSearch = request.params.articleTitle;
  const newTitle = request.params.title;
  const newContent = request.params.content;

  Article.update(
    { title: title },
    { title: newTitle, content: newContent },
    { overwrite: true },
    ( error )=>{
      if ( error ) {
        response.send( error );
      } else {
        response.send( "Succecfuly updated the selected article...");
      }
    }
  );
})
.patch( ( request, response )=>{
  const titleToSearch = request.params.articleTitle;
  const allData = request.body;

  Article.update(
    { title: titleToSearch },
    { $set: allData },
    ( error )=>{
      if( error ){
        response.send( error );
      } else {
        response.send( "Succecfuly updated the article..." );
      }
    }
  );
})
.delete( ( request, response )=>{
  const titleToSearch = request.params.articleTitle;

  Article.deleteOne(
    { title: titleToSearch },
    ( error )=>{
      if ( error ) {
        response.send( error );
      } else {
        response.send( "Succecfuly deleted the given article..." );
      }
    }
  );
});
//------------------------------------------------------------------------------------
// -----------------------setting the port to run...
app.listen( 9876, ()=>{
  console.log("App is running on 9876...");
});
