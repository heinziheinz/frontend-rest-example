import React from 'react';
import axios from 'axios';

export default class ProfileAddingAdmin extends React.Component {
    state = {
        selectedFile: null,
        selectedName:''
    }

    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            isLoaded: false
        });
    }
    fileNameHandler= event =>{
        console.log(event.target.value);
        this.setState({
            selectedName:event.target.value
        });
        this.checkingFilesize();
    }
    checkingFilesize =()=>{
        var fileSize =this.state.selectedFile.size;
        console.log(fileSize);
    }

    fileUploadHandler = () => {
        console.log(this.state.selectedName);
        console.log('slslslslslslsl');
        const fd = new FormData();
        fd.append('myImage', this.state.selectedFile, this.state.selectedFile.name);//TODO figuring out the third argument
        fd.append('name', this.state.selectedName);    
        //handling file size
        const request = new Request('/api/loggedin/prime', {
            //TODO abort Controller hinzufügen und IE
            credentials: 'include',
            mode: 'cors',
            method: 'POST',
            body: fd,
            headers: new Headers({    
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data;',
            'Access-Control-Allow-Origin':'https://localhost:3000/'
           }),
          }
          );
          fetch(request)
            .then(res => {
              console.log(res);//wird im falle eines Fehlers nicht aktiviert
              if (res.ok) {
                if (res.status === 200) {
                  console.log('status 200');
                }
                if (res.status === 422) {
                  console.log('invalid credentials');
                }
              }
              return res;
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
            
              //a cookie is set
              //Boolean is returned as a string
              // Cookie expires after 30 minutes. That`s too short.
              if (res.success) {
                console.log(res);
              }
              return res;
            })
            .then(
              (result) => {
      
                this.setState({
                  isLoaded: true,
                });
              },
              (error) => {
                console.log(error);
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
    }
    render() {
        //TODO this fileInput herausfinden, wie das genau funktioniert
        return (
            <div>
                <input
                    // style={{ display: 'none' }}
                    type="file"
                    onChange={this.fileSelectedHandler}
                // ref={fileInput = this.fileInput = fileInput}
                />
                <input
                type="text"
                onChange={this.fileNameHandler}
                />
                {/* <button onClick={() => this.fileInput.click()}>Pick file</button> */}
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }
}
//TODO checking out how this outcommented ref technique works
// der link wies geht, vielleicht habe ich etwas bei der erf Technik übersehen
// https://www.youtube.com/watch?v=XeiOnkEI7XI
