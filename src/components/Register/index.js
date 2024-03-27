import { Component } from "react";


class Register extends Component{
    state={firstName:"",lastName:"",phoneNumber:"",email:"",id:"",errorMsg:"",showSubmitError:false,responseData:""}

    onSubmitForm = async (event) => {
        event.preventDefault();
        const {firstName,lastName,phoneNumber,email,id} = this.state
        if(firstName!==""&&lastName!==""&&phoneNumber!==""&&email!==""&&id!==""){
          const studentDetails ={firstName,lastName,phoneNumber,email,id}
          const url = "https://student-details-backend-9vy4.onrender.com/new-student"
          const options = {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(studentDetails)}
          const response = await fetch(url, options)
          if (response.ok === true) {
            const responseData = await response.json()
            this.setState({responseData,firstName:'',lastName:'',phoneNumber:'',email:'',id:'',errorMsg:''})
          }else{
            console.log("Error in post")
          }
        }else{
            this.setState({errorMsg:"Please enter Valid details",showSubmitError:true})
        }
      };


     onChangeFirst = (event) =>{
        this.setState({firstName:event.target.value})
     } 

     onChangeLast = (event) =>{
        this.setState({lastName:event.target.value})
     } 

     onChangePhone = (event) =>{
        this.setState({phoneNumber:event.target.value})
     } 

     onChangeEmail = (event) =>{
        this.setState({email:event.target.value})
     } 

     onChangeId = (event) =>{
        this.setState({id:event.target.value})
     } 

     goToHomePage=()=>{
        const {history} = this.props
        history.push("/")
     }

    render(){
        const {first,last,phone,email,id,errorMsg,showSubmitError,responseData}= this.state
        return(
            <div className="Main-container">
                {responseData===""? 
                <div className="Main-container">
                <form className="card shadow-lg p-5 d-flex flex-column form-style" onSubmit={this.onSubmitForm}>
                    <div className="pb-3">
                      <label htmlFor="first" className="text-sm label">First Name</label>
                      <input id="first"type="text" required className="form-control" value={first} onChange={this.onChangeFirst}/>
                    </div>
                    <div className="pb-3">
                      <label htmlFor="last" className="text-sm label">Last Name</label>
                      <input id="last"type="text" required className="form-control" value={last} onChange={this.onChangeLast}/>
                    </div>
                    <div className="pb-3">
                      <label htmlFor="phone" className="text-sm label">Phone Number</label>
                      <input id="phone"type="text" required className="form-control" value={phone} onChange={this.onChangePhone}/>
                    </div>
                    <div className="pb-3">
                      <label htmlFor="email" className="text-sm label">Email</label>
                      <input id="email"type="email" required className="form-control" value={email} onChange={this.onChangeEmail}/>
                    </div>
                      <div>
                      <label htmlFor="id" className="text-sm label">Student Id</label>
                      <input type="id" className="form-control" required value={id} onChange={this.onChangeId}/>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary submit-button">Submit</button>
                    {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
                </form>
                <button type="button" className="btn btn-primary mt-2" onClick={this.goToHomePage}>Go to Home Page</button>
                </div>:
                <div className="Main-container">
                    <h1>{responseData}</h1>
                    <button type="button" className="btn btn-primary mt-5" onClick={this.goToHomePage}>Go to Home Page</button>
                </div>
                }
                  
            </div>
        )
    }
}
export default Register