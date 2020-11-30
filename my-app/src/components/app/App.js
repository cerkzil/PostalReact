import './app.scss';
import Header from '../header/Header';
import Navigation from '../nav/Nav';
import Home from '../home/Home';
import Footer from '../footer/Footer';
import Privacy from '../privacy/Privacy';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      address: '',
      code: '',
      status: 'default'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    let res = await fetch("https://api.postit.lt/?term=" + this.state.address + "+" + this.state.city + "&key=postit.lt-examplekey");
    let jsonRes = await res.json();
    this.setState({
      status: this.handleValidation(jsonRes)
    })
    event.preventDefault();
  }

  handleValidation(jsonRes) {
    if (this.state.city === '' || this.state.address === '') {
      this.setState({
      })
      return "empty";
    }
    else if (jsonRes.success === true && jsonRes.data !== undefined && jsonRes.data.length !== 0) {
      console.log(jsonRes.data[0].post_code);
      this.setState({
        code: jsonRes.data[0].post_code,
        city: jsonRes.data[0].city,
        address: jsonRes.data[0].address,
      });
      return "success";
    }
    else {
      return "error";
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Navigation />
          <Header city={this.state.city}
            address={this.state.address}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange} />
          <Switch>
            <Route exact path="/" component={() =>
              (<Home city={this.state.city}
                code={this.state.code}
                address={this.state.address}
                status={this.state.status} />)} />
            <Route path="/privacy" component={Privacy} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App; 