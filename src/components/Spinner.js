
import React, { Component } from 'react';
import { connect } from 'react-redux'

class Spinner extends Component {


componentDidMount(){


  const start =()=>{

return   console.log(+"spinner")

} 
 start();
  
}


  render() {

    const {loading,error}= this.props;
   


if(!loading){
  return null
}
    return (
      <div>

           <div>
        <svg clasName="lds-blocks" width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{background:"none"}}><rect x="19" y="19" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0s" calcMode="discrete"></animate>
      </rect><rect x="40" y="19" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.125s" calcMode="discrete"></animate>
      </rect><rect x="61" y="19" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.25s" calcMode="discrete"></animate>
      </rect><rect x="19" y="40" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.875s" calcMode="discrete"></animate>
      </rect><rect x="61" y="40" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.375s" calcMode="discrete"></animate>
      </rect><rect x="19" y="61" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.75s" calcMode="discrete"></animate>
      </rect><rect x="40" y="61" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.625s" calcMode="discrete"></animate>
      </rect><rect x="61" y="61" width="20" height="20" fill="#e15b64">
        <animate attributeName="fill" values="#f47e60;#e15b64;#e15b64" keyTimes="0;0.125;1" dur="1s" repeatCount="indefinite" begin="0.5s" calcMode="discrete"></animate>
      </rect>
      </svg>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state=>{
  console.log(state+"Loader")
  return{

      loading:state.auth.loading,
  
      
  }

}

export default connect(mapStateToProps,null)(Spinner);

