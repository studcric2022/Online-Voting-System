import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Skeleton from './skeleton';

const Voting_page = () => {
  const {electId, voterId} = useParams();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [clicked, setClicked] = useState(-1);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const[isVote, setIsVote] = useState(false);
  const [error, setError] = useState(null);
  // const token = localStorage.getItem('token');

  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    fetch('https://elect-server-opal.vercel.app/api/vote/poll/'+electId,{
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer '+token,
    },
  },
    ).then((res) => {
      //return res.json();
      if(!res.ok){
        console.log(res)
        throw Error("fetching is not successful");
      }
      else{
        return res.json();
      }
    }).then((data) => {
      setQuestion(data.question);
      setOptions(data.options);
      setIsLoading(false);
      setIsVote(true);
      setError(null);
    }).catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  

  const handleClick = (e, index, chosen) => { 
    setClicked(index);
    setOption(chosen);
    e.preventDefault();
  }

  const handleSubmit = async() => {
    setLoading(true);
    console.log(clicked)
    console.log(option)
    try {
      const response = await fetch('https://elect-server-opal.vercel.app/api/poll/addVote/'+electId+'/'+voterId+'/'+ option, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
     })

     const data = await response.json();
     if(data.status === "success"){
      setLoading(false);
      setMessage("You have successfully voted "+option);
     }
     if(data.status === "failed"){
      setLoading(false);
      setMessage("Failed to vote...try again");
     }
     if(data.status === "finished"){
      setLoading(false);
      alert('Election already finished')
     }
     if(data.status === "voted"){
      setLoading(false);
      alert('You have already voted once')
     }
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(error.message);
    }
  }

  const voteElements = options && options.map((article, index) => (
  <div className='d-flex justify-content-center'>
    
    <a href="/#" onClick={(e) => handleClick(e, index, article.option)}>
   
      <article key={index} index={index} className={index === clicked? 'clicked m-4 d-flex justify-content-center' : "poll m-4 d-flex justify-content-center"}>
      {console.log(clicked)}
        <p className="poll__name text-center fs-4 fw-bold">{article.option}</p>
      </article>
    </a>
    
  </div>)
    );

  return (
       <div>
        {error && <p>{error}</p>}
        {isLoading &&  [1,2,3,4,5,6,7].map((n) => <Skeleton    key={n}/>)}
        {isVote && <h1 className='text-center'>{question}</h1>}
        {voteElements}
        <button type="btn" style={{margin: 'auto',display: 'flex',justifyContent: 'center', alignItems: 'center'}} className="btn btn-dark justify-content-center" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <div className="loading-indicator"></div>
              ) : (
                'Submit'
              )}
        </button>
        {message && <p>{message}</p>}
       </div>
  )
}

export default Voting_page