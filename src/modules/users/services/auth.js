// import endpoint from "reactor/endpoint";

// export async function login(form) {
//   return await endpoint("/login", new FormData(form));
// }

// export async function logout() {
//   return endpoint("/logout");
// }
  
import endpoint from "reactor/endpoint";

export async function login(form) {
  return endpoint.post("/login", new FormData(form));
}

export async function logout() {
  return endpoint.get("/logout");
}