// How you call self-executing function......
(
  function(){
    console.log("Self-Executing Anonymous Funcitons....");
  }
)();

(
  function(num){
    console.log("Self-Executing Anonymous Funcitons with number :: "+num);
  }
)(5);

// Lexical scoping in Javascript...
function init(){
    var firsName = "Aakash";
    function getFirstName(){
      console.log(firsName);
    }
    getFirstName();
}

init();
// first name will not be accessed here as the scope of it is completed at line 21
// console.log(firsName);
// but now, here the closure comes in a picture and it just allows us to accecs firsName but little bit wierdly.
// see second file...
