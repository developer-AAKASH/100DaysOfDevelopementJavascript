const one = ()=>{
  return "--------One--------";
};

// const two = async()=>{
//   setTimeout(()=>{
//     return "--------Two--------";
//   }, 2000);
// };

const two = ()=>{
  return new Promise( (resolve, reject)=>{
      setTimeout(()=>{
        resolve("----------Two------");
        // reject("----------Two------");
      }, 2000);
  });
};

const three = ()=>{
  return "--------Three------";
};

const callOneTwoThree = async()=>{
  let callOne = one();
  console.log(callOne);

  let callTwo = await two();
  console.log(callTwo);

  let callThree = three();
  console.log(callThree);
}

callOneTwoThree();
