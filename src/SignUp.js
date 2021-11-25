import React from "react"

function SignUp(){
        return(
          <div id="loginform">
            <FormHeader title="v-scholar" />
            <Form />
            <OtherMethods />
          </div>
        )
      }
      
      const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
      );
      
      
      const Form = props => (
       <div>
         <FormInput description="Username" placeholder="Enter your username" type="text" />
         <FormInput description="email" placeholder="Enter your email" type="text" />
         <FormInput description="Password" placeholder="Enter your password" type="password"/>
         <FormButton title="Sign Up"/>
       </div>
      );
      
      const FormButton = props => (
      <div id="button" class="row_1">
        <button>{props.title}</button>
      </div>
      );
      
      const FormInput = props => (
      <div class="row_1">
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder}/>
      </div>  
      );
      
      const OtherMethods = props => (
      <div id="alternativeLogin">
        
        
      </div>
      );

    export default SignUp;
