var expect = require("chai").expect;

// expect( true ).to.be.true;

// for case 1
// function titleCase( title ){
//     return title;
// }

// case-2
// function titleCase( title ){
//     return title.toUpperCase();
// }

// case-3
// function titleCase( title ){
//     return title[0].toUpperCase() + title.substring(1);
// }

// case-4 - final one
function titleCase( title ){
    var words = title.split(" ");
    var titleCaseWords = words.map(( word )=>{
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
    });
    return titleCaseWords.join(" ");
}
// case-1
expect( titleCase( "the great mouse detective" ) ).to.be.a("string");
// case-2
expect( titleCase("a")).to.equal('A');
// case-3
expect( titleCase("vertigo")).to.equal("Vertigo");
// case-4
expect( titleCase( "the great mouse detective") ).to.be.equal("The Great Mouse Detective");