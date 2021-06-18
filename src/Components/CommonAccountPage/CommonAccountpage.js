import React from 'react'
import { Link ,useHistory} from 'react-router-dom'
import  '../../cssStyle/Style1.css';
import logo from '../../cssStyle/image_pager.png'

function CommonAccountPage({heading}) {

    const history=useHistory();
    let screenHeight=window.innerHeight;


    const goToStudentDetails=()=>{
        history.push("/commonPage")
    }

    
    return (
        <div className="boxGrid" style={{height:`${screenHeight}px`}}>
        <div className="box" >
            <img src={logo} alt="" width="180px" height="50px" className="headImg"></img>
            <div className="boxborder">
            {(heading==="LoginAccountPage")?<h2 className="boxHeading">Login to your account</h2>:<h2 className="boxHeading">Create a new Account</h2>}
                <form className="boxForm">
                    <div className="formInput">
                    <label>Email ID/Phone Number</label>
                    <input type="text" style={{width:'100%'}} />
                    </div>
                    <div className="formInput">
                    <label>Password</label>
                    <input type="password" ></input>
                    </div>
                   <div className="formInput">
                    <input type="submit" value="Submit" className="submit" onClick={goToStudentDetails} ></input>
                   </div>
                   {(heading==="LoginAccountPage")?
                    <div className="boxLink">
                    <Link to="/createAccountPage">Forget password/Claim your Account</Link>
                    </div>:null}
                </form>
            </div>
        </div>
        </div>
    )
}

export default CommonAccountPage;
