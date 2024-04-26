import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Skeleton from './skeleton';

const VoterList = () => {
    const location = useLocation();
    console.log(location.state.id)
    const id = location.state.id;

  const [voters, setVoters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVotersLoaded, setIsVotersLoaded] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    // if(location.state !== null){
    //   id = location.state.id;
    // }
    fetch('https://elect-server-opal.vercel.app/api/poll/voterlist/'+id,{headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    },}).then((res) => {
      //return res.json();
      if(!res.ok){
        console.log(res)
        throw Error("fetching is not successful");
      }
      else {
        console.log(res)
        return res.json();
      }
    }).then((data) => {
        console.log(data)
        setVoters(data.voter);
        setIsLoading(false);
        setIsVotersLoaded(true);
        setError(null);
      
    }).catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);
  console.log(voters)
  console.log(voters)

  const votersElements = voters && voters.map((index) =>
  <div className='d-flex justify-content-center'>
      <article className="poll m-4 d-flex justify-content-center">
        <p className="poll__name text-center fs-4 fw-bold">{index.votermail}</p>
      </article>
    
  </div>
    );

  return (
    <div>
      
        {error && <p>{error}</p>}
        {isLoading && [1,2,3,4,5,6,7].map((n) => <Skeleton    key={n}/>)}
        {isVotersLoaded && <h1 className="text-center">Voter List</h1>}
        {votersElements}
        

       </div>
  );
}

export default VoterList