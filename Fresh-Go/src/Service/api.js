import axios from "axios";

const URL = "http://localhost:8080";

export const test = async () => {
  return await axios.get(`${URL}`);
};

export const signUp = async (signupdata) => {
  
  return await fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(signupdata),
  });
};

export const logIn = async(logindata) => {
    return await fetch(`${URL}/login`,{
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify(logindata)
    })

}
export const addNewProduct = async (newProduct) =>{
  console.log(`${URL}/addNewProduct`)
  return await fetch(`${URL}/addNewProduct`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(newProduct)
  })
}

export const getAllProduct = async() =>{
    console.log(`${URL}/allProduct`)
    return await fetch(`${URL}/allProduct`,{
       method:"POST",
       header:{"content-type":"application/json"},
       body:"Request for prouct data"
    })
}

export const getAllCartData = async () =>{
  console.log(`${URL}/cartAll`)
  return await fetch(`${URL}/cartAll`,{
    method:"POST",
    header:{"content-type":"json/application"},
    body:{message:"Get Cart data Successfully"}
  })
}

export const addItemsCart =async (cartItem) =>{
  console.log(`${URL}/addCart`)
  console.log("cart api data",cartItem)
  return await fetch(`${URL}/addCart`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(cartItem)
  })
}