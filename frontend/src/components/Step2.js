import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const Step2 = props => {
  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      <h4 className=" mt-4">Select your desirable features about the system</h4>
      <div className="row mt-5">
      <div className="col">
          <div className="form-check">
            <div className='row'>
              <div className='col'>
                <p className='something'>Large number of reservation items which are identical e.g. stadium seats</p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_large_number"
                  onChange={(e) => props.handleCheck(e, !props.has_large_number)}
                  checked={props.has_large_number}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-check">
            <div className='row'>
              <div className='col-sm-9'>
                <p className='something'>Add description to services</p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_description_service"
                  onChange={(e) => props.handleCheck(e, !props.has_description_service)}
                  checked={props.has_description_service}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="form-check">
            <div className='row'>
              <div className='col-sm-9'>
                <p className='something'>Add description to items</p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_description_item"
                  onChange={(e) => props.handleCheck(e, !props.has_description_item)}
                  checked={props.has_description_item}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>      
      <div className="row">
        <div className="col-sm-4">
        <div className="form-check">
            <div className='row'>
              <div className='col'>
                <p className='something'>Add image for items
                </p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_img_item"
                  onChange={(e) => props.handleCheck(e, !props.has_img_item)}
                  checked={props.has_img_item}
                  />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col">
          <div className="form-check">
            <div className='row'>
              <div className='col'>
                <p className='something'>Large number of reservation items which are identical e.g. stadium seats</p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  // onChange={(e) => setHasLargeNum(!has_large_number)}
                  // checked={has_large_number}
                  />
              </div>
            </div>
          </div>
        </div> */}
        <div className="col-sm-4">
          <div className="form-check">
            <div className='row'>
              <div className='col-sm-9'>
                <p className='something'>Add image for service
                </p>
              </div>
              <div className='col-sm-1'>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="has_img_service"
                  onChange={(e) => props.handleCheck(e, !props.has_img_service)}
                  checked={props.has_img_service}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>      
      
    </>
  );
};

export default Step2;
