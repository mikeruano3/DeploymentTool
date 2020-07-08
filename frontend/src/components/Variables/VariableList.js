import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dataServiceCommon from "../../services/rawdata.service";
const dataService = new dataServiceCommon('data/global_vars');

const VariableList = props => {
    const [variables, setVariables] = useState([]);
    const [currentVariable, setCurrentVariable] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveVariables();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveVariables = () => {
      dataService.getAll()
          .then(response => {
            setVariables(response.data.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    const refreshList = () => {
        retrieveVariables();
        setCurrentVariable(null);
        setCurrentIndex(-1);
    };

    const setActiveVariable = (variable, index) => {
        setCurrentVariable(variable);
        setCurrentIndex(index);
    };

    const findByName = () => {
      dataService.findMany({ name: searchName})
          .then(response => {
            setVariables(response.data.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    return (
        <div className="container">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h4>Variables List</h4>
      
              <ul className="list-group">
                {variables &&
                  variables.map((variable, index) => (
                    <li
                      className={
                        "list-group-item " + (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveVariable(variable, index)}
                      key={index}
                    >
                      {variable.name}
                    </li>
                  ))}
              </ul>
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={refreshList}
              >
                Refresh List
              </button>
            </div>
            <div className="col-md-3">
              {currentVariable ? (
                <div>
                  <h4>Variable</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentVariable.name}
                  </div>
                  <div>
                    <label>
                      <strong>Value:</strong>
                    </label>{" "}
                    {currentVariable.value}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentVariable.description}
                  </div>
                  <Link
                    to={"/variables/" + currentVariable.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Variable...</p>
                </div>
              )}
            </div>
          </div>
        </div>
    );
};

export default VariableList;