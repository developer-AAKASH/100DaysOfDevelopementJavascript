// ----------------------Part-1--System's EventListener-----------------------------
let button = document.getElementsByTagName("button")[0];
console.log(button);
/*
 so basically below code print the click event info
  because we calling it on click event and in addEventListener function, we passing two info,
    ->one is event,
    ->and second is what to do when this event is fired basically its called as callback function.
    ->we can pass function name there or can type anonumus function or we can write arrow function to.
*/
// THis will be called when we click on button...
button.addEventListener( "click", function( event ){
    // THis will print info if event which occured...
    console.log(event);
});

// ----------------------Part-2--Our-own-Event-Listener-----------------------------
// Now lets create our on event Event Listener function. it takes event name and callback function as parameter.
// From line 36, control will came here and execute following function...
function myAddEventListener( eventName, callback ) {
    // assume some-how we have detect the event code to indentify the event.
    // here eventName and callback hold info passed by line 36.

    // event listener have list of event info for all events like below
    var eventHappendInfo = {
          // we have put static value as the goal of this function is to understand the call back better so ignore it.
          eventType: "click",
          key: "a",
          durationOfKeyPress: 2
          // and like this, there are many more event info....
    };

    // Now in our case, we just have one event, so we just do this with one if-else but internally maybe they go through with all events using loops

    // We check that if event that occured match with existing events and if yes then we call our callback function...
    if( eventHappendInfo.eventType === eventName ){
        callback( eventHappendInfo );
    }
}

function callback( event ){
  console.log(event);
}

// from here we are calling event Listener but in this case we are calling our own addEventListener ---Calling it manually but its enough to understand the concept.
myAddEventListener( "click", callback );
