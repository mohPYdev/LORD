import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      {/* <p>How can we reach you?</p> */}
      <div className="row mt-2">
        <div className="col mt-4">
          <input className="form-control" name="name" value={props.name}  type='text' placeholder="name" onChange={props.handleChange} />
        </div>
        <div className="col something ">
          <label>
            <span className="mx-5">homepage image</span>
            <input type='file' className="form-control mx-5"
                  name="home_page_image"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {props.handleImageChange(e)}}
              />
          </label>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <textarea className="form-control mt-4" name="description"  type='text' placeholder="description" onChange={props.handleChange}/>
        </div>
        <div className="col something mt-4">
          <label>
            <span className="mx-5">logo image</span>
            <input type='file' className="form-control mx-5"
                  name="logo"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {props.handleImageChange(e)}}
              />
          </label>
        </div>
      </div>
      <div className="row mt-4">                        
        <div className='col'>
          <div className="row">
          <div className="col-sm-4">
            <p>type of system</p>
          </div>
          <div className="col">

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="place"
                id="radiotype1"
                onClick={props.handleChange}
                />
              <label className="form-check-label" for="radiotype1">
                Place
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="person"
                id="radiotype2"
                onClick={props.handleChange}
                />
              <label className="form-check-label" for="radiotype2">
                Human
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="type"
                value="resource"
                id="radiotype3"
                onClick={props.handleChange}
                />
              <label className="form-check-label" for="radiotype3">
                Resource
              </label>
            </div>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className="row">
            <div className="col-sm-4">
              <p>theme</p>
            </div>
            <div className="col">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="theme"
                  value="light"
                  id="radiotheme1"
                  onClick={props.handleChange}
                  />
                <label className="form-check-label" for="radiotheme1">
                  Light
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="theme"
                  value="dark"
                  id="radiotheme2"
                  onClick={props.handleChange}
                  />
                <label className="form-check-label" for="radiotheme2">
                  Dark
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
