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

// export const deleteUser = async (id) => {
//     return await axios.delete(`${usersUrl}/${id}`);
// }

// export const editUser = async (id, user) => {
//     return await axios.put(`${usersUrl}/${id}`, user)
// }
