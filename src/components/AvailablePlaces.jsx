import { useEffect,useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvailableplaces}from '../http.js';
export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching,setIsFetching]=useState(false);
  const [availablePlaces,setAvailablePlaces]=useState([]);
  const [error,setError]=useState();
  useEffect(()=>{

    async function fetchPlaces(){
      setIsFetching(true)
      try{
        const places =await fetchAvailableplaces();

        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      }catch(error){
        setError({message: error.message||'Could not fetch places,please try again .'});
        setIsFetching(false);
      }

    }
    fetchPlaces();
  },[]);

  if(error){
    return <Error title="An error occurred !" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoding={isFetching}
      lodingText="Fetching Place Data...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
