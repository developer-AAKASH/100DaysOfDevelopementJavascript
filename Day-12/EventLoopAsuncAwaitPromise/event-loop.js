const one = ()=>{
  console.log("--------One--------");
};

const two = ()=>{
  setTimeout(() => {
    console.log("I am waiting for two.........");
  }, 2000);
  console.log("--------Two--------");
};

const three = ()=>{
  console.log("--------Three------");
};

one();
two();
three();
