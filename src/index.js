import React from "react"
import ReactDom from "react-dom"
import './index.css';
import axios from 'axios';

const ethereum = window.ethereum;
const wave1 = "https://media0.giphy.com/media/ZCwUKGiF877e01bDz3/giphy.gif?cid=ecf05e47c34d3c24a46dd084d8d954fabcb688123d61308b&rid=giphy.gif";
const wave2 = "https://media.giphy.com/media/xNT2CcLjhbI0U/giphy.gif";

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            account: null,
            imgCheck: true,
            hasMM: true,
            wave_img: wave1
        };
    }

    // Next two functions will get users MetaMask public key
    // This will occur before rendering
    componentDidMount() {
        this.connectMM();
    }

    async connectMM() {
        try {
            this.setState({account: await ethereum.enable()}, () => {
                console.log(this.state.account);
            });
        }
        catch{
            this.componentDidCatch();
        }
        
    }

    // Catch error created by not having metamask downloaded
    // Setting hasMM to false will cause the class to render a page that does not have
    // a button to request tokens and prompts the user to download MetaMask
    componentDidCatch(error, errorInfo) {
        this.setState({
            hasMM: false
        });
    }

    // change wave image on click
    changeImg() {
        if (this.state.imgCheck){
            this.setState({wave_img: wave2})
            this.setState({imgCheck: false})
        }
        else{
            this.setState({wave_img: wave1})
            this.setState({imgCheck: true})
        }
        
    }

    // Send tokens
    sendHello() {
        window.alert('Obtained 1 Hello Token');

        this.changeImg();

        var apiAddress = "http://13.56.163.182:8000/transfer-token";
        axios.post(apiAddress, {
            ticker: "HELLO",
            amount: 1,
            to: this.state.account[0],
            hookUrl: "done",
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    

    render(){
        // Render this if user has MetaMask
        if (this.state.hasMM){
            return (
                <div className = "container">
                    <div className = "titles">
                        <h1>Hi, There!</h1>
                        <h2> Request A Hello Token To Wave Back!</h2>
                    </div>
                    <div className = "waveGif">
                        <img className = "wave" src = {this.state.wave_img}/>
                    </div> 
    
                    <div className="metaMaskButton">
                        <button className="button" onClick={() => {this.sendHello()}}>
                            Give me a Hello Token
                        </button>
                    </div>
    
                    <div className = "advLogo">
                        <img className = "logo" src = "http://13.57.47.139/adventure-logo.png"/>
                    </div>
                </div>
            );
        }
        
        // Render this if user does not have MetaMask
        else {
            return (
                <div className = "container">
                    <div className = "titles">
                        <h1>Hi, There!</h1>
                        <h2> Download MetaMask To Be Able To Request a Hello Token</h2>
                    </div>
                    <div className = "waveGif">
                        <img className = "wave" src = {this.state.wave_img}/>
                    </div> 
    
                    <div className = "advLogo">
                        <img className = "logo" src = "http://13.57.47.139/adventure-logo.png"/>
                    </div>
                </div>
            );
        }

        
    } 
}


ReactDom.render(<App />,document.getElementById("root"));