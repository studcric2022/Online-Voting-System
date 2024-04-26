import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Skeleton from './skeleton';
import moment from 'moment'; // import the Moment.js library


const Dashboard = () => {
  const navigate = useNavigate();

  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPollLoaded,setIsPollLoaded] = useState(false);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    
    fetch('https://elect-server-opal.vercel.app/api/auth/polls',{headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    },}).then((res) => {
      //return res.json();
      if(!res.ok){
        console.log(res)
        throw Error("fetching is not successful");
      }
      else{
        return res.json();
      }
    }).then((data) => {
      setPolls(data.polls);
      setIsLoading(false);
      setIsPollLoaded(true);
      setError(null);
    }).catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  // const handleAddingVoterField = () => {
  //   setVoters([...voters, {votermail:"", voterid: ""}])
  // }

//    function handleAddingVoters (e, i) {
//     // if(e.target.value !== ""){
//       const votermail = e.target.value;
//       if(emailRegex.test(e.target.value)){
//       Promise.all([
//         fetch('https://plum-curious-katydid.cyclic.app/api/poll/voterlist/'+id,{method: 'GET',headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer '+token,
//         },}),
//         fetch('http://localhost:3001/api/poll/generate' , {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//       ]).then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
//       .then(([data1, data2]) => {
//         console.log(data1, data2);
//         const onchangeVal = [...voters]
//         if(!onchangeVal.some((obj) => obj.votermail === votermail) && !data1.voter.some((object) => object.votermail === votermail)){
//           onchangeVal[i]={votermail: votermail, voterid: data2.id}
//           setVoters(onchangeVal);
//         }
//       })
//       .catch(error => console.error(error));}
    
//   }

//   const handleRemovingVoterField = (e, i) => {
//     const deleteVal = [...voters]
//     deleteVal.splice(i,1)
//     setVoters(deleteVal);
//   // }
  
// }

  

  const handleResultClick = (id) => {
    navigate('/result',{state: {id: id}});
  }

  const handleListClick = (id) => {
    navigate('/voterlist',{state: {id: id}});
  }

  // const handleAddVoterClick = async(electId) => {
  //   let data;
  //   try {
  //     console.log(voters)
  //     voters.map(async(voter) => {
  //       const response = await fetch('https://plum-curious-katydid.cyclic.app/api/poll/addvoter/'+electId+'/'+voter.votermail+'/'+voter.voterid, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },});

  //       data = await response.json();
  //       if(data.status === "notok") alert("Election already started!");
  //     });

  //     if(data.status === "ok"){
  //     voters.map(async(voter) => {

  //       await fetch('https://plum-curious-katydid.cyclic.app/api/mail/?eid='+electId+'&vid='+voter.voterid+'&vmail='+voter.votermail);
  //     });
  //   }
  //     // data['voter'].map(async index => await fetch('http://localhost:3001/api/mail/?eid='+eid+'&vid='+index.voterid+'&vmail='+index.votermail))
      
  //   } catch (error) {
  //     setError(error.message);
  //     console.log("fail")
  //   }
  //   // setShowDialog(true);
  //   // navigate('/result',{state: {id: id}});
  // }

  // const handleAddOptionClick = (id) => {
  //   navigate('/result',{state: {id: id}});
  // }
  // console.log(new Date.toLocaleString())
  const pollElements = polls && polls.map((poll) => 
  <div className='d-flex justify-content-center'>
    {/* <a href="#" onClick={() => handleClick(poll._id)}> */}
        <article style={{position: 'relative'}} className="poll m-4 d-flex justify-content-center">
          <h3 className="poll__name ">{poll.title}</h3>
          

            
          
          <p className="poll__time">Starting Time: {moment(poll.startTime).subtract(6, 'hours').format('lll')}</p>
          <p className="poll__time">Ending Time: {moment(poll.endTime).subtract(6, 'hours').format('lll')}</p>
          <button type="button"  className="btn btn-primary" onClick={() => handleResultClick(poll._id)}>
              Result
            </button>

            <button type="button" className="btn btn-primary" onClick={() => handleListClick(poll._id)}>
              Voter List
            </button>
            {/* <button type="button"  className="btn btn-primary" onClick={openModal}>Add Voter</button>

            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <h2>Modal Title</h2>
              <div class="col mb-3">
              <label for="voter" class="form-label fw-bold">Add Voter </label>
              <button type="button" class="btn btn-sm btn-outline-dark m-3" onClick={handleAddingVoterField}> + </button>
              {
                  voters.map((val,i)=>
                    <div style={{display: 'flex'}}>
                        <input type="email" id="voter" class="form-control" placeholder='Enter Voter E-mail' value={val.votermail} onChange={(e) => handleAddingVoters(e, i)} required/>
                        <button type="button" class="btn btn-sm btn-outline-dark m-3" onClick={(e) => handleRemovingVoterField(e, i)}> - </button>
                    </div>
                  )
              }
              
            </div>

              <button onClick={closeModal}>Close Modal</button>
            </Modal> */}

      {/* <button type="button" className="btn btn-primary" onClick={() => handleClick(poll._id)}>
        Add Voter
      </button>
      

            <button type="button"  className="btn btn-primary" onClick={() => handleAddOptionClick(poll._id)}>
              Add Option
            </button> */}
        </article>
    {/* </a> */}
  </div>
    );
  // console.log(poll)
  return (
    <div>
      {/*<button onClick={handleLogout}>Log out</button>*/}
      {error && <p>{error}</p>}
      {isLoading && [1,2,3,4,5,6,7].map((n) => <Skeleton    key={n}/>)}
      {isPollLoaded && <h1 className='text-center'>Your Polls</h1>}
      {pollElements}
      {/* {showDialog && <DialogBox onClose={() => setShowDialog(false)} title="hi"/>} */}
    </div>
  )
}

export default Dashboard