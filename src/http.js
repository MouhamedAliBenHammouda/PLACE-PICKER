export async function fetchAvailableplaces(){

    const response=await fetch('http://localhost:3000/places');
    const resData = await response.json();

        if(!response.ok){
          throw new Error("Failed to fetch places");
        }
    return resData.places;
}

export async function fetchUserplaces(){

    const response=await fetch('http://localhost:3000/user-places');
    const resData = await response.json();

        if(!response.ok){
          throw new Error("Failed to fetch user places");
        }
    return resData.places;
}


export async function updateUserPlaces(places){
const response =await fetch("http://localhost:3000/user-places",{
    method:'put',
    body:JSON.stringify({places}),
    headers:{
        'content-Type' : 'application/json'
    }
});
const resData =await response.json();
if(!response.ok){
    throw new Error("Failed to update user data");
}
return resData.messge;
}