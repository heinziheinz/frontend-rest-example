import React from 'react';


export default class RefTests extends React.Component{
    constructor(props){
     super(props);
     this.myRef = React.createRef();
     this.secondRef = React.createRef();
     this.thirdRef = React.createRef();
     this.fourthRef = React.createRef();
    }
    componentDidMount(){
        // console.log(this.myRef.current.innerHTML);
        // console.log( this.secondRef);
        // console.log(this.thirdRef.current.value = 'off');
        // console.log(this.fourthRef.current.innerHTML);
        // // this.thirdRef.current.checked = true;
    }
    render(){
        return(
            <React.Fragment>
            <h1 ref={this.myRef} >I´m your second ...</h1>
            <MyFunction ref={this.secondRef} myRef={this.fourthRef}/>
            <input defaultChecked={false} ref={this.thirdRef} type="radio" id="login" style={{ marginBottom: '1rem' }}/>
            </React.Fragment>
        );
    }
}

class MyFunction extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // console.log('did... mount');
    }
  render(){  
      return(<h4 ref={this.props.myRef}>hallomochlo</h4>);
        }
}