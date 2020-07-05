import React, { Component } from "react";
import dataService from "../../services/rawdata.service";
dataService.setTable('projects');

export default class AddProject extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.saveProject = this.saveProject.bind(this);
      this.newProject = this.newProject.bind(this);
  
      this.state = {
        id: null,
        name: "",
        description: "",

        submitted: false
      };
    }
  
    onChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }
  
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }
  
    saveProject() {
      var data = {
        name: this.state.name,
        description: this.state.description
      };
  
      dataService.insertOne(data)
        .then(response => {
          this.setState({
            id: response.data.data.id,
            name: response.data.data.name,
            description: response.data.data.description,
  
            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    newProject() {
      this.setState({
        id: null,
        name: "",
        description: "",
  
        submitted: false
      });
    }
  
    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newProject}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="title"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>
    
                <button onClick={this.saveProject} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
    }
}