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
    let data = await res.json();
    if (this.state.city == '' || this.state.address == '') {
      this.setState({
        status: "empty"
      })
    }
    else if (data.success == true && data.data !== undefined && data.data.length != 0) {
        console.log(data.data[0].post_code);
        this.setState({
          code: data.data[0].post_code,
          city: data.data[0].city,
          address: data.data[0].address,
          status: "success"
        });
    } 
    else {
      this.setState({
        status: "error"
      })
    }
    event.preventDefault();
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