import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyComponent = (props) => {
    console.log(props.anotherSelectedFile);
    return (
        null
    );
}

export default class ProfileAddingAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            anotherSelectedFile: [],//TODO checing out
            selectedName: '',
            cookie: Cookies.set('myCookie', false, { secure: true })
        }
    }
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        console.log(event.target.files);
        //TODO hier mit loop die File in ein array pushen

        this.setState({
            selectedFile: event.target.files[0],
        });
    }

    multiSelectFileHandler = event => {
        var myArray = [];
        console.log(event.target.files[0]);
        const myNumber = 2;
        this.setState({
            anotherSelectedFile: [].push(event.target.files[myNumber])
        });
        Cookies.set('myCookie', true, { secure: true });
    }
    fileNameHandler = event => {
        console.log(event.target.value);
        this.setState({
            selectedName: event.target.value
        });
        this.checkingFilesize();
    }
    checkingFilesize = () => {
        // var fileSize =this.state.selectedFile.size;
        // console.log(fileSize);
    }

    fileUploadHandler = () => {
        console.log(this.state.selectedName);
        console.log(this.state.anotherSelectedFile.length);
        console.log('nnnnenenenenen');
        //TODO hier in einem loop die files appened
        //handling file size
        const fd = new FormData();
        fd.append('myImage', this.state.selectedFile, this.state.selectedFile.name);//TODO figuring out the third argument
        fd.append('name', this.state.selectedName);
        console.log(fd);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] =  'http://localhost:3000';
        axios.post(process.env.REACT_APP_URL + 'api/loggedin/prime', fd, {
            onDownloadProgress: progressEvent => {
                console.log('Upload Progress' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
            }
        })
            .then(res => {
                console.log(res);
            });
    }
    render() {
        console.log(Cookies.get('myCookie') === 'true');
        const { error, isLoaded, anotherSelectedFile } = this.state;
        if (Cookies.get('myCookie') === 'true') {
            console.log(typeof anotherSelectedFile);
            return <MyComponent anotherSelectedFile={anotherSelectedFile} />;
        }
        return (
            <div>
                <input
                    // style={{ display: 'none' }}
                    type="file"
                    onChange={this.fileSelectedHandler}
                // ref={fileInput = this.fileInput = fileInput}
                />
                <input
                    // style={{ display: 'none' }}
                    type="file"
                    onChange={this.multiSelectFileHandler}
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


