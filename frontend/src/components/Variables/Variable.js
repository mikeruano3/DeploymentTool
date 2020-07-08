import React, { useState, useEffect } from "react";
import dataServiceCommon from "../../services/rawdata.service";
const dataService = new dataServiceCommon('data/global_vars');

const Variable = props => {
    const initialVariableState = {
      id: null,
      name: "",
      value: "",
      description: ""
    };
    const [currentVariable, setCurrentVariable] = useState(initialVariableState);
    const [message, setMessage] = useState("");
  
    const getVariable = id => {
      dataService.findOne({id: id})
        .then(response => {
          setCurrentVariable(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
        getVariable(props.match.params.id);
    }, [props.match.params.id]);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentVariable({ ...currentVariable, [name]: value });
    };
  
    const updateVariable = () => {
      dataService.update({ id: currentVariable.id }, currentVariable)
        .then(response => {
          setMessage("The variable was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteVariable = () => {
      dataService.remove({ id: currentVariable.id })
        .then(response => {
          console.log(response.data);
          props.history.push("/variables");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    return (
        <div>
          {currentVariable ? (
            <div className="edit-form">
              <h4>Variable</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currentVariable.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="value">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="value"
                    name="value"
                    value={currentVariable.value}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={currentVariable.description}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
              <button className="badge badge-danger mr-2" onClick={deleteVariable}>
                Delete
              </button>
    
              <button
                type="submit"
                className="badge badge-success"
                onClick={updateVariable}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Variable...</p>
            </div>
          )}
        </div>
    );    
};
  
export default Variable;