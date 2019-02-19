import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import quizQuestions from "./api/quizQuestions";
import quizCategories from "./api/quizCategories";
import Quiz from "./components/Quiz";
import Result from "./components/Results";
import Categories from "./components/Categories";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selectedCategory: "",
      filteredQuestions: [],
      counter: 1,
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      goodAnswer: [],
      answersCount: {
      },
      result: ""
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.onCategorySelected = this.onCategorySelected.bind(this);
    this.onReturnToCategories = this.onReturnToCategories.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );

    

    //get a random question
    let randomIndex = Math.floor(Math.random() * this.currentIndex);
    console.log(randomIndex);

    this.setState({
      categories: quizCategories
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onCategorySelected(category) {
    // search questions related to that category
    let categoryQuestions = quizQuestions.filter(
      question => question.category === category
    );

    categoryQuestions = this.shuffleArray(categoryQuestions);

    if (this.state.counter < categoryQuestions.length) {
      this.setState(
        { filteredQuestions: categoryQuestions, selectedCategory: category },
        () => {
          this.setNextQuestion();
        }
      );
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.counter - 1 < this.state.filteredQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    let categoryAnswerCount = this.state.answersCount[
      this.state.selectedCategory
    ];

    if (!categoryAnswerCount) {
      categoryAnswerCount = {
        correct: 0,
        incorrect: 0
      };
    }

    if (answer === this.state.goodAnswer.type) {
      categoryAnswerCount.correct = categoryAnswerCount.correct + 1;
    } else {
      categoryAnswerCount.incorrect = categoryAnswerCount.incorrect + 1;
    }
    this.setState(state => ({
      answersCount: {
        ...state.answersCount,
        [this.state.selectedCategory]: categoryAnswerCount
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter;
    const questionId = this.state.questionId;
    this.setState({
      counter: counter + 1,
      questionId: questionId + 1,
      question: this.state.filteredQuestions[counter - 1].question,
      answerOptions: this.state.filteredQuestions[counter - 1].answers,
      answer: "",
      goodAnswer: this.state.filteredQuestions[counter - 1].goodAnswer
    });
  }

  getResults() {
    return this.state.answersCount[this.state.selectedCategory];
  }

  setResults(result) {
    this.setState({ result: result });
  }

  renderQuiz() {
    return (
      <Quiz
        counter={this.state.counter - 1}
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.filteredQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      <Result
        onReturnToCategories={this.onReturnToCategories}
        quizResult={this.state.result}
      />
    );
  }

  onReturnToCategories() {
    this.setState({
      selectedCategory: "",
      counter: 1,
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      goodAnswer: [],
      result: "",
      filteredQuestions: []


    });
  }

  render() {
    return (
      <div className="App relative">
        {this.state.question === "" ? (
          <Categories
            onCategorySelected={this.onCategorySelected}
            categories={this.state.categories}
            statusCategory = {this.state.answersCount}
          />
        ) : null}

        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
