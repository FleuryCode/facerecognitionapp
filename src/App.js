import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import { apiKeysData } from './components/ApiKeys/ApiKeys.js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';



const app = new Clarifai.App({
  apiKey: apiKeysData.CLARIFAI_KEY
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });

  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState({isSignedIn: false})
    }else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  }

  render() {
    return (
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit} />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : (
            this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
