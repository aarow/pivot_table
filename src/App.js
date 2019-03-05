import React, { Component } from "react";
import "./App.css";
import Table from "./components/Table";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <Table />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
