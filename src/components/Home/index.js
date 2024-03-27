import { Component } from "react";
import Cookies from "js-cookie";
import {Grid} from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component{
  state={data:[],apiStatus:apiStatusConstants.initial}

  componentDidMount(){
    this.getData()
  }

  getData=async()=>{
    this.setState({apiStatus:apiStatusConstants.inProgress})
    const url = "https://student-details-backend-9vy4.onrender.com/all-students"
    const response = await fetch(url)
    if(response.ok){
      const responseData = await response.json()
    this.setState({data:responseData,apiStatus:apiStatusConstants.success})
    }else{
      this.setState({apiStatus:apiStatusConstants.failure})
    }
    }

  addNewStudent=()=>{
    const {history} = this.props
    history.push('/new-student')
  }

  removeStudent=()=>{
    const {history} = this.props
    history.push('/remove-student')
  }
  onLogout=()=>{
    Cookies.remove("cookie");
    const {history} = this.props
    history.replace('/login')
  }

  renderLoadingView = () => (
    <div className="main-container-loader">
       <div className="products-loader-container">
        <Grid  color="#0b69ff" height="50" width="50" />
       </div>
    </div>
  )

  renderFailureView=()=>(
    <div className="main-container">
      <img
      src="https://res.cloudinary.com/dpglcx4ft/image/upload/v1711465678/No_data-pana_gezvxt.png"
      alt="FailureView"
      className="failure-view"
    />
    <button type="button" onClick={this.getData} className="btn btn-primary">Try Again</button>
    </div>
  )

  noDataView=()=>(
    <div className="main-container">
      <h1 className="heading-no-data">No student details were added</h1>
      <img src="https://res.cloudinary.com/dpglcx4ft/image/upload/v1711466618/3582365_jfh9co.jpg"
        alt="No Data Found"
        className="No-data-view"/>
      <button className="btn btn-warning m-3" type="button" onClick={this.addNewStudent}>Add new Student</button>
      <button type="button" onClick={this.onLogout} className="btn btn-primary mt-5">Log Out</button>
    </div>
  )

  dataView=()=>{
    const {data} = this.state
    const length = data.length
    return(
      <div className="main-container"> 
        <h1>Students List</h1>
        <p>Students Count:{length}</p>
      <div className="main-buttons">
        <button className="btn btn-warning m-3" type="button" onClick={this.addNewStudent}>Add new Student</button>
        <button className="btn btn-warning m-3" type="button" onClick={this.removeStudent}>Remove Student</button>
      </div>
      <div className="card">
        <div className="main-card">
        {data.map(each=>(
          <ul key={each.id} className="student-card">
            <li>Student Id: {each.id}</li>
            <li>Name: {each.first_name} {each.last_name}</li>
            <li>Ph.no: {each.phone_number}</li>
            <li>Email: {each.email}</li>
          </ul>
        ))}
        </div>
    </div>
    <button type="button" onClick={this.onLogout} className="btn btn-primary mt-5">Log Out</button>
    </div>
    )
  }
    

  renderSuccessView=()=>{
    const {data} = this.state
    const length = data.length
    return(<>
      {length===0? <>{this.noDataView()}</>:<>{this.dataView()}</>}
    </>
    )
  }

  render(){
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }

    }

  }
export default Home;
