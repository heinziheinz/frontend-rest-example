import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedName: '',
            imageList: [],
        };
    }
    onClearArray = event => {
        console.log(event.target.files[0]);
        this.setState({
            imageList: this.state.imageList.concat(event.target.files[0])
        });
    }

    fileNameHandler = event => {
        console.log(event.target.value);
        this.setState({
            selectedName: event.target.value
        });
    }

    fileUploader = event => {
        const { imageList } = this.state;
        if (imageList.length >= 5) {
            alert('nur maximal 5 Foto erlaubt');
        }
        //TODO wie liefere ich die name des Arrays mit?
        console.log(process.env.REACT_APP_TEN_NAMES_FOR_IMAGE_ARRAY);
        const string = process.env.REACT_APP_TEN_NAMES_FOR_IMAGE_ARRAY;
        let imageNames = string.split(",");
        console.log(imageNames.length);
        console.log(imageList.length);
        console.log(imageNames.length);
        imageNames.length = imageList.length;
        var imageString = JSON.stringify(imageNames);
        console.log(imageNames);
        const formData = new FormData();
        for (let i = 0; i < imageList.length; i++) {
            formData.append(imageNames[i], imageList[i], imageList[i].name);
            console.log(imageNames[i]);
            console.log(imageList[i]);
            console.log(imageList[i].name);
        }
        formData.append('name', this.state.selectedName);
        formData.append('namearray', imageString);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(process.env.REACT_APP_URL + 'api/loggedin/prime', formData,{timeout:1000})
            .then(res => {
                console.log(res);
            });

    }
    render() {
        const { imageList } = this.state;
        console.log(imageList);
        return (
            <div>
                {/* <ul>
                    {this.state.imageList.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul> */}
                <input
                    type="file"
                    onChange={this.onClearArray}
                />
                <input
                    type="text"
                    placeholder="nameoftheperson"
                    onChange={this.fileNameHandler}
                />
                <button type="button" onClick={this.fileUploader}>
                    Check on Array
        </button>
            </div>
        );
    }
}
export default App;