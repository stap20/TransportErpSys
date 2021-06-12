import endpoint from "reactor/endpoint";

export async function getCarsTypes(updateLoader, updateResponse) {
  endpoint("/get_cars_type").then((res) => {
    console.log(res);
    updateResponse(res); // entire response body
    updateLoader(false);
  });
}
