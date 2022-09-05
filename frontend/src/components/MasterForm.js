import React, { Component } from "react";
import {
  Form,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from "reactstrap";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import apiSettings from "./API";

// import styled from "styled-components";
import MultiStepProgressBar from "./MultiStepProgressBar";

class MasterForm extends Component {
  constructor(props) {
    super(props);

    // Set the intiial input values
    this.state = {
      currentStep: 1,
      name: "",
      description: "",
      type: "",
      theme:"",
      email:"",
      password:"",
      paymentType:"",
      has_email:false,
      has_img_item:false,
      has_img_service:false,
      has_price:false,
      has_description_service:false,
      has_description_item:false,
      has_large_number:false,
      has_forget_pass:false,
      logo:null,
      home_page_image:null,
      attributes:[]
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleList = this.handleList.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

    // Bind new functions for next and previous
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  // Use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleImageChange(event){
    const { name} = event.target;
    this.setState({
      [name]: event.target.files[0]
    });
  }

  handleCheck(event, val){
    const {name} = event.target;
    this.setState({
      [name]: val
    });
  }
  
  handleList(event, id){
    
    this.setState(prevState => {
      if (prevState.attributes.includes(id))
        return {
          attributes: prevState.attributes.filter(att => {
            return att !== id
          })
        }  
      return {
        attributes: [...prevState.attributes, id]
      }  
    })
  }


  // Trigger an alert on form submission
  handleSubmit = async(event) => {
    event.preventDefault();
    const {attributes, email, name, password, description, type, theme, has_description_item, has_email, has_description_service, has_img_item, has_img_service, has_large_number, has_price, } = this.state;
    const res = await apiSettings.createSystemEntry(this.state)
    console.log(res)
    // console.log(attributes)
  };

  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;

    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  // The "next" and "previous" button functions
  get previousButton() {
    let currentStep = this.state.currentStep;

    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color="secondary float-left" onClick={this._prev}>
          Previous
        </Button>
      );
    }

    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 4) {
      return (
        <Button color="primary float-right" onClick={this._next}>
          Next
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;

    // If the current step is the last step, then render the "submit" button
    if (currentStep > 3) {
      return <Button color="primary float-right">Submit</Button>;
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <CardHeader><h4>Generate System</h4></CardHeader>
            <CardBody>
              <CardTitle>
                <MultiStepProgressBar currentStep={this.state.currentStep} />
              </CardTitle>
              <CardText />
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                handleImageChange={this.handleImageChange}
                name={this.state.name}
                description={this.state.description}
              />
              <Step2
                currentStep={this.state.currentStep}
                handleCheck={this.handleCheck}
                has_description_item={this.state.has_description_item}
                has_description_service={this.state.has_description_service}
                has_img_item={this.state.has_img_item}
                has_img_service={this.state.has_img_service}
                has_large_number={this.state.has_large_number}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                handleCheck={this.handleCheck}
                email={this.state.email}
                password={this.state.password}
                has_price={this.state.has_price}
                has_email={this.state.has_email}
                has_forget_pass={this.state.has_forget_pass}
                paymentType={this.state.paymentType}               
              />
              <Step4
                currentStep={this.state.currentStep}
                handleCheck={this.handleCheck}  
                handleList={this.handleList}
                type = {this.state.type}             
                attributes = {this.state.attributes}             
              />
            </CardBody>
            <CardFooter>
              {this.previousButton}
              {this.nextButton}
              {this.submitButton}
            </CardFooter>
          </Card>
        </Form>
      </>
    );
  }
}

export default MasterForm;
