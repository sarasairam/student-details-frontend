import { Component } from "react"
import Cookies from "js-cookie";


class Remove extends Component{
    state={id:"",responseData:"",errorMsg:""}

    onSubmitForm = async (event) => {
        event.preventDefault();
        const {id} = this.state
        if(id!==""){
          const studentDetails ={id}
          const url = "https://student-details-backend-9vy4.onrender.com/remove-student"
          const options = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(studentDetails)}
          const response = await fetch(url, options)
          const responseData = await response.json()
          if (response.ok === true) {
            this.setState({responseData,errorMsg:'',id:''})
          }else{
            console.log("Error in data")
          }
        }else{
            this.setState({errorMsg:"Please enter Valid details",showSubmitError:true})
        }
      };

     onChangeId = (event) =>{
        this.setState({id:event.target.value})
     } 

     goToHomePage=()=>{
        const {history} = this.props
        history.push("/")
     }

     onLogout=()=>{
      Cookies.remove("cookie");
      const {history} = this.props
      history.replace('/login')
    }

    render(){
        const {id,errorMsg,showSubmitError,responseData}= this.state
        return(
            <div className="Main-container">
                {responseData===""? 
                <div className="Main-container"> 
                <form className="card shadow-lg p-5 d-flex flex-column form-style" onSubmit={this.onSubmitForm}>
                      <div>
                      <label htmlFor="id" className="text-sm label">Student Id To Remove</label>
                    <input type="id" className="form-control" value={id} onChange={this.onChangeId}/>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary submit-button">Submit</button>
                    {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
                </form>
                <button type="button" className="btn btn-primary mt-2" onClick={this.goToHomePage}>Go to Home Page</button>
                </div>:
                <div className="Main-container">
                    <h1>{responseData}</h1>
                    <button type="button" className="btn btn-primary mt-5" onClick={this.goToHomePage}>Go to Home Page</button>
                    <button type="button" onClick={this.onLogout} className="btn btn-primary mt-5">Log Out</button>
                </div>
                }
                  
            </div>
        )
    }
}
export default Remove