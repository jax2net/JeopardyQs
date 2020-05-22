import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {

    state = { difficulty: "", question: "", answer: "", title: "", display: "", hasBeenClicked: false };

    componentDidMount() {
        this.getQ();
    }

    getQ = () => {
        axios
            .get("https://jservice.io/api/random")
            .then((response) => {
                console.log(response);
                const { answer, value, question } = response.data[0];
                const { title } = response.data[0].category;
                this.setState({
                    difficulty: value,
                    question: question,
                    answer: answer,
                    title: title,
                    hasBeenClicked: false
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleClick = () => {
        this.setState(prevState => ({
            hasBeenClicked: !prevState.hasBeenClicked 
        }));
    }

    render() {
        return (
<React.Fragment>
			<h1>Random Jeopardy Question</h1>
			<h3>Click inside the blue to see the answer</h3>
            <div className="app">
            <div className="card" onClick={this.handleClick}>
            <div id='desc'>In  <span id='categoryText'><i>{this.state.title}</i></span>   for   <span id='moneyText'>{this.state.difficulty}</span>... </div>
            <h2 className="heading">{this.state.hasBeenClicked ? this.state.answer : this.state.question}</h2>
            <button className="hvr-grow" onClick={this.getQ}>
            Next Question
            </button>
            </div>
            </div>
</React.Fragment>
        );
    }
}

export default App;
