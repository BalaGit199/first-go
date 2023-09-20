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
// export const deleteUser = async (id) => {
//     return await axios.delete(`${usersUrl}/${id}`);
// }

// export const editUser = async (id, user) => {
//     return await axios.put(`${usersUrl}/${id}`, user)
// }
