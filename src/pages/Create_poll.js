import React, { useState } from 'react'

const Create_poll = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [starttime, startTime] = useState("");
  const [endtime, endTime] = useState("");
  const [voters, setVoters] = useState([{votermail: "", voterid: ""}]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{option: "", votes: 0}]);
  const [emailError, setEmailError] = useState("");

  // const re = /\S+@\S+\.\S+/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleStartTimeChange = (e) => {
    
    const curTime = new Date()
    const cur = new Date()
    cur.setHours(cur.getHours() + 6)
    const newCur = cur.toISOString().slice(0,16)
    const start = new Date(e.target.value)
    if(start - curTime < 0) {startTime(newCur)}
    else startTime(e.target.value);
  }

  const handleEndTimeChange = (e) => {
    endTime(e.target.value);
  }

  const handleAddingVoters = async(e, i) => {
    let voterid =-1;
    // if(e.target.value !== ""){
      const votermail = e.target.value;
      const onchangeVal = [...voters]
      onchangeVal[i]={votermail: votermail, voterid: voterid}
      setVoters(onchangeVal);
      try {
        if(e.target.value === "") setEmailError("");
        else{
          // setVoters(onchangeVal);
          if(emailRegex.test(e.target.value)){
            
            const response = await fetch('https://elect-server-opal.vercel.app/api/poll/generate' , {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const data = await response.json();
            voterid = data.id;
            console.log(voterid)
            setEmailError("");
          }else {
            // set the error message
            setEmailError("Not a valid email");
          }
        }
        console.log(onchangeVal[i].voterid)
        onchangeVal.splice(i, 1, {votermail: '', voterid: -1})
        if(!onchangeVal.some((obj) => obj.votermail === votermail)){
          onchangeVal[i]={votermail: votermail, voterid: voterid}
          setVoters(onchangeVal);
          console.log(onchangeVal)
        }
      } catch (error) {
        setError(error.message);
      }
    
  }

  const handleRemovingVoterField = (e, i) => {
      const deleteVal = [...voters]
      if(deleteVal.length > 1){
        deleteVal.splice(i,1)
        setVoters(deleteVal);
      }
  
}

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }

  const handleAddingOption = (e, i) => {
    // if(e.target.value !== null){
      const option = e.target.value
      console.log(option)
      const votes = 0;
      const onchangeVal = [...options]
      // onchangeVal[i]={option: option, votes: votes}
      if(option === "") onchangeVal[i]={option: "", votes: votes}
      else if(!onchangeVal.some((obj) => obj.option === option)){
        // if(option !== ""){
          onchangeVal[i]={option: option, votes: votes}
        // }
        // setOptions(onchangeVal);
      }
      setOptions(onchangeVal);
    // }
    
  }

  const handleRemovingOptionField = (e, i) => {
      const deleteVal = [...options]
      if(deleteVal.length > 1){
        deleteVal.splice(i,1)
        setOptions(deleteVal);
      }
    
  }

  const handleAddingOptionField = () => {
    setOptions([...options, {option: "", votes: 0}])
  }

  const handleAddingVoterField = () => {
    setVoters([...voters, {votermail:"", voterid: ""}])
  }

  const handleSubmitChange = async (e) => {
    const curTime = new Date()
    const cur = new Date()
    cur.setHours(cur.getHours() + 6)
    // const start = new Date(starttime)
    const end = new Date(endtime)
    const newCur = cur.toISOString().slice(0,16)
    const start = new Date(starttime)
    
    console.log(starttime)
    console.log(newCur)
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("Please wait...Poll is being created");
    console.log("first")
    const token = localStorage.getItem('token');
    console.log(token)
   
    
    if(end - start > 0 && end - curTime > 0){
      if(options.length >= 2){
        try {
          console.log(starttime)
          const response = await fetch('https://elect-server-opal.vercel.app/api/poll/add_poll' , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token,
            },
            body: JSON.stringify({
              title: title,
              startTime: starttime,
              endTime: endtime,
              voter: voters,
              question: question,
              options: options
            }),
          }) 
          console.log(response)
          const data = await response.json()
          if(data.status === "notconfirmed"){
            setMessage("");
            alert("Please verify your email by clicking on the link sent to your email address");
          }
          console.log(data['voter'][0]._id)
          const eid = data['id']
          data['voter'].map(async index => await fetch('https://elect-server-opal.vercel.app/api/mail/?eid='+eid+'&vid='+index.voterid+'&vmail='+index.votermail, {mode: 'no-cors'}))
          if(eid){
            setMessage("Poll created successfully! Email containing election id & voter id being sent to voters");
          }
          window.location.href = '/dashboard'
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } catch (error) {
          setMessage("");
          setLoading(false);
          setError(error.message);
        }
      }else{
        setMessage("");
        setLoading(false);
        alert("There must be at least 2 options");
      }
    }else{
      setMessage("");
      setLoading(false);
      alert("Wrong time input");
    }
    

    

    //await fetch('http://localhost:3001/api/mail/?id='+data['id'])
    // if(data.token) {
    //   localStorage.setItem('token', data.user)
    //   window.location.href = '/'
    // }
}

  return (
      <div class="container bg-light my-5">
          <div class="title text-center mb-3 pt-3">
              <h1>Create a Poll</h1>
          </div>
          
          <div className='d-flex justify-content-center'>
          <form class="p-3 w-50" onSubmit={handleSubmitChange}>
            <div class="mb-3">
              <label for="title" class="form-label fw-bold">Title </label>
              <input type="text" id="title" class="form-control" placeholder='e.g. CSEDU Students Club' value={title} onChange={handleTitleChange} required/>
            </div>

            <div class="row mb-3">
              <div class="col">
              <label for="start" class="form-label fw-bold">Starting Time </label>
              <input type="datetime-local" id="start" class="form-control" value={starttime} onChange={handleStartTimeChange} required/>
              </div>
              
              <div class="col">
              <label for="end" class="form-label fw-bold">Ending Time </label>
              <input type="datetime-local" id="end" class="form-control" value={endtime} onChange={handleEndTimeChange} required/>
              </div>
            </div>

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
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            
            <div class="mb-3">
              <label for="questions" class="form-label fw-bold">Question </label>
              <input type="text" id="questions" class="form-control" placeholder='Questions' value={question} onChange={handleQuestionChange} required/>
            </div>

            <div class="col mb-3">
              <label for="option" class="form-label fw-bold">Add Options </label>
              <button type="button" class="btn btn-sm btn-outline-dark m-3" onClick={handleAddingOptionField}> + </button>
              {
                  options.map((val,i)=>
                  <div style={{display: 'flex'}}>
                        <input type="text" id="option" class="form-control" placeholder='Add Option' value={val.option} onChange={(e) => handleAddingOption(e, i)} required/>
                        <button type="button" class="btn btn-sm btn-outline-dark m-3" onClick={(e) => handleRemovingOptionField(e, i)}> - </button>
                    </div>
                  )
              }
              
            </div>



            <div class="mb-3 pt-2">
              <button type="submit" class="btn btn-lg btn-dark" disabled={loading}>
                {loading ? (
                  <div className="loading-indicator"></div>
                ) : (
                  'Continue'
                )}
              </button>
              {message && <p>{message}</p>}
            </div>
          </form>
          
          </div>
          {error && <p>{error}</p>}
      </div>
  )
}

export default Create_poll