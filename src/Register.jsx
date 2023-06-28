//import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


const schema = yup.object().shape({
  fullname : yup.string().required('fullname is required').min(4, 'Minimum 4 chars required').max(15, 'Enter upto 15 chars only'),
  email : yup.string().email('pls enter valid Email').required('Enter Email'),
  //password : yup.string().required().min(4, 'Minimum 4 chars required').max(15, 'Enter upto 15 chars only'),
  mobilenumber: yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  // .matches(phoneRegExp, 'Phone number is not valid')
  .required('A phone number is required'),
  age: yup
    .number()
    .required("Please supply your age")
    .min(18, "You must be at least 18 years")
    .max(21, "You must be at most 60 years"),

    // gender: yup.string().when(['gender'], {
    //   is: (gender) => gender=== 'others' || 'female' ,
    //   // is: (gender) => gender === "others" || gender === "female" ,
    //   then: yup.string().required('Gender is Required')
    //  }) ,

    gender: yup.string().required('Gender is required'),

     faculty: yup.string().required('Faculty is required'),

     department: yup.string().required('Department is required'),
     careerCounseling: yup.boolean().oneOf([true], 'Please agree to book the career counseling session')


})
   
import './register.css'
function Register() {
  const navigate = useNavigate();

  const {register,handleSubmit,formState: { errors, isValid ,isDirty},reset} = useForm ({resolver: yupResolver(schema),mode: 'onChange'});
  //const [errorMessage, setErrorMessage] = useState('');
  const handleRegister= async (data) => {
    try {
      
      const response=await axios.post('http://127.0.0.1:8090/api/collections/student_management/records', data);
      navigate('/Table');
    
    

console.log(response.data);
      // Reset the form
      reset();
    } catch (error) {
      console.log(error);
      // if (error.response) {
      //   setErrorMessage(error.response.data.message);
      // } else {
      //   setErrorMessage('An error occurred during signup');
      // }
      
    }
  };
  return (
    <form onSubmit={handleSubmit((handleRegister))}>
      
    <div className='container1'>
        <div>
          <header>
            <h2>Cairo University</h2>
          </header>
        </div>
        <div className='container2'>

          <div className='content'>
            <p>Registration Form</p>
          </div>
          <div className='container3'>
            <div className='left-box'>
              <div><p style={{ fontSize: "1.3em", fontWeight: "600" }}>Personal Information</p></div>

              <div className="input-group">
                <div className="span">Full name</div>
                <input type="text" className="input-box" {...register('fullname')} />
                {errors.fullname && <p>{errors.fullname.message}</p>}
              </div>

              <div className="input-group">
                <div className="span">Gender</div>
                <div style={{display:"flex",gap:"1em"}}>
                <input type="radio" name="gender" {...register('gender')} value="Male" />
                <div >Male</div>
                <input style={{marginLeft:"14em"}}type="radio" name="gender" {...register('gender')} value="Female"  />
                <div>Female</div>
                </div>
                {errors.gender && <p>{errors.gender.message}</p>}
              </div>

              <div className="input-group">
                <div className="span" >Age</div>
                <input type="text" className="input-box" {...register('age')}/>
                {errors.age && <p>{errors.age.message}</p>}
              </div>

              <div className='input-group'><p style={{ fontSize: "1.3em", fontWeight: "600", paddingTop:"1em"}}>University Details</p></div>
              <div className='dropdown'>
              <div className="span">Faculty</div>
              <div>
                <select name="faculty" id="faculty" className='input-box' {...register('faculty')}>
                  <option></option>
                  <option value="john">John</option>
                  <option value="peter">Peter</option>
                  <option value="michael">Michael</option>

                </select>
              </div>
              {errors.faculty && <p>{errors.faculty.message}</p>}
              </div>
              <div className='dropdown'>
              <div className="span">Department</div>
              <div>
                <select name="department" id="department" className='input-box' {...register('department')}>
                <option></option>
                  <option value="ece">ECE</option>
                  <option value="cse">CSE</option>
                  <option value="it">IT</option>

                </select>
              </div>
              {errors.department && <p>{errors.department.message}</p>}
              </div>
              

            </div>
            <div className='right-box'>
              <div><p style={{ fontSize: "1.3em", fontWeight: "600" }}>Contact Details</p></div>

              <div className='right-input'>
              <div className="input-group">
                <div className="span">E-mail</div>
                <input type="email" className="input-box" {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div className="input-group" style={{paddingTop:".5em"}}>
                <div className="span">Mobile Number</div>
                <input type="number" className="input-box" {...register('mobilenumber')}/>
                {errors.mobilenumber && <p>{errors.mobilenumber.message}</p>}
              </div>

              </div>
              

              <div><p style={{ fontSize: "1.3em", fontWeight: "600", paddingTop: "1em",paddingBottom:".5em" }}>Career Counseling Service</p></div>

              <div className='right-content'>
                <p>Career counseling is a 45-minute free service provided by <br />Cairo University to advice
                  students on the best career <br />choices.</p>
              </div>

              <div className='right-checkbox' style={{ display: "flex",padding:".5em 0em 1.3em 0em" }}>
                <div>
                  <input type="checkbox" {...register('careerCounseling')} />
                </div>
                <div style={{ paddingLeft: "1em" }}>
                  <p>I want to book the career counseling session</p>
                </div>
                
              </div>
              {errors.careerCounseling && <p>{errors.careerCounseling.message}</p>}

              <div className='submit-bt'>
                <button type="submit" disabled={isDirty && !isValid  }>Submit</button>

              </div>


            </div>

          </div>






        </div>

      </div>
    </form>
  )
}

export default Register