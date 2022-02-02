import axios from "axios";
import React, {useState} from "react";

const PROXY = "https://jekaloapitest.herokuapp.com/api/user";



const UserForm=()=>{
  const [invalidator, setInvalidator] = useState({});
  const [processing, setProcessing] = useState(false);
  const [response, setResponse] = useState(null);

  /** DD-MM_YYYY Date formatter */
  const dmyFormat=(date)=>{
    if(!date) return;
    let day = date.getDate(), month = date.getMonth()+1;
    day = day< 10?`0${day}`:day;
    month = month< 10?`0${month}`:month;
    return `${day}-${month}-${date.getFullYear()}`;
  }

  const submitter=async(e)=>{
    e.preventDefault();
    if(processing) return;
    let {target} = e;
    let checkers = ["first_name", "username", "date_of_birth"];
    let payload = {last_name: target.last_name.value};

    checkers.forEach(async(element) => {
      // console.log(target[element]);
      if(!target[element]['value'] || !target[element]['value'].trim()){
        await setInvalidator((prev)=> ({...prev, [element]: true}));
      }else{
        if(element === "date_of_birth"){
          payload[element] = dmyFormat(new Date(target[element]['value']))
        }else{
          payload[element] = target[element]['value'];
        }

        await setInvalidator((prev)=> ({...prev, [element]: false}));
      }    
    });

    let validator = Object.entries(invalidator);
    console.log(validator);
    if(validator.flat().includes(true) || !validator.length) return;
    try {
      setProcessing(true);
      setResponse(null);
      let {data} = await axios.post(PROXY, payload)
      
      console.log(data);
      setResponse({error:false, message: "User Successfully added"})
      
    } catch (error) {
      // console.log(Object.entries(error));
      setResponse({error:true, message:error.response?.data?.message})
    }finally{
      setProcessing(false)
    }
    
  }

  return (<div>
    <form onSubmit={submitter} className="form-grid">

      <div className="control-grid">
        {/* first name */}
        <div className="form-cover">
          <label htmlFor="first_name">First name</label>
          <input type="text"
            className="form-control" name="first_name" 
            id="first_name"  placeholder="First Name" 
          />
          {invalidator.first_name && 
            <small  className="form-text text-muted">FIrst name is required</small>
          }
        </div>

        {/* last name */}
        <div className="form-cover">
          <label htmlFor="last_name">Last name</label>
          <input type="text" className="form-control" name="last_name" 
            id="last_name"  placeholder="Last Name" 
          />
        </div>

        {/*  username */}
        <div className="form-cover">
          <label htmlFor="username">Username</label>
          <input type="text"  className="form-control" name="username" 
            id="username"  placeholder="username" 
          />
          {invalidator.username && 
            <small  className="form-text text-muted">Username is required</small>
          }
        </div>

        {/* date of birth */}
        <div className="form-cover">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input type="date" className="form-control" name="date_of_birth" 
            id="date_of_birth"  placeholder="Date of Birth" 
          />
          {invalidator.date_of_birth && 
            <small  className="form-text text-muted">Date of birth is required</small>
          }
        </div>

      </div>

      <div className="button-grid">
        <button type="submit">{processing?"PROCESSING...":"SUBMIT"}</button>
      </div>


    </form>

      {response &&
        <div class="response">
          {response.message}
        </div>
      }

  </div>)
}

export default UserForm