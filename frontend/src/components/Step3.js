import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

const Step3 = props => {
  if (props.currentStep !== 3) {
    return null;
  }

  return (
    <>
      {/* <p>We recommend creating a secure password for your account</p>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          value={props.password} // Prop: The username input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup> */}
      <div className="row mt-5">
        <div className="col-sm-4">
          <div className="form-check">
            <div className='row'>
              <div className='col-sm-9'>
                <p className='something'>Add price to services</p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_price"
                  onChange={(e) => props.handleCheck(e, !props.has_price)}
                  checked={props.has_price}
                  />
              </div>
            </div>
          </div>
        </div>
        { props.has_price && <div className="col">
            <div className="form-check form-check-inline mx-4">
              <label>
                <span>Pay in person</span>
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentType"
                  value="in person"
                  onClick={props.handleChange}
                  />
              </label>
            </div>
            <div className="form-check form-check-inline mx-4">
              <label>
                <span>Pay online</span>
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentType"
                  value="online"
                  onClick={props.handleChange}
                  />
              </label>
            </div>
            <div className="form-check form-check-inline mx-4">
              <label>
                <span>Pay with payment code</span>
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentType"
                  value="payment code"
                  onClick={props.handleChange}
                  />
              </label>
            </div>
        </div>}
      </div>  
      <div className="row mt-4">
        <div className="col-sm-4">
          <div className="form-check">
            <div className='row'>
              <div className='col-sm-9'>
                <p className='something'>Send email after reservation</p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_email"
                  onChange={(e) => props.handleCheck(e, !props.has_email)}
                  checked={props.has_email}
                  />
              </div>
            </div>
          </div>
        </div>
        {(props.has_email || props.has_forget_pass) && <>
        <div className="col-sm-3 mx-5">
          <input 
            className='form-control'
            type='email' 
            placeholder="email"
            name="email"
            onChange={props.handleChange} 
            value={props.email}
            />
        </div>
        <div className="col-md-3">
          <input 
            type='password' 
            className='form-control' 
            placeholder="password"
            name="password"
            onChange={props.handleChange}
            value={props.password} 
          />
        </div>
        </>}
      </div>      
      <div className="row mt-4">
        <div className="col-sm-4">
          <div className="form-check">
            <div className='row'>
              <div className='col-sm-9'>
                <p className='something'>Add forgot password feature </p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_forget_pass"
                  onChange={(e) => props.handleCheck(e, !props.has_forget_pass)}
                  checked={props.has_forget_pass}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>      
    </>
  );
};

export default Step3;
