import React from 'react'
import "./update.css"
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Update() {

    // const params = useParams();
    const navigate = useNavigate();
    // const stdID = params.stdID;
    const { id } = useParams();

    const [StudentDetails, setStudentDetails] = useState({
        fullname: '',
        gender: '',
        age: '',
        faculty: '',
        department: '',
        email: '',
        mobilenumber: '',
    });

    useEffect(() => {
        async function fetchedData() {
            try {
                axios.get(`http://127.0.0.1:8090/api/collections/student_management/records/${id}`).then((response) => {
                    setStudentDetails(response.data);
                })
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchedData();
    }, [id]);

    const handleInput = (value) => {
        return setStudentDetails(student => {
            return { ...student, ...value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //console.log('Updating student details...')

        try {
            console.log(StudentDetails)
            const response = await axios.patch(`http://127.0.0.1:8090/api/collections/student_management/records/${id}`, StudentDetails)
                console.log(response);
            
            if (response) {
                setStudentDetails({
                    fullname: '',
                    gender: '',
                    age: '',
                    faculty: '',
                    department: '',
                    email: '',
                    mobilenumber: '',

                });
                console.log(response)
                navigate('/Table');
            }
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    return (

        <div className='main'>
            <div className="container">
                <div className='top' >
                <h2 style={{fontWeight:"400"}}>Update Student Details</h2><br />
                </div>
                <div className='form-content'>
                <form onSubmit={handleSubmit} >
                    <div className='form-fields'>
                        <div className='form-label'>
                        <label htmlFor="fullname">FullName</label>
                        </div>
                        <div>
                        <input id='fullname' name='fullname' type='text' value={StudentDetails.fullname} onChange={e => handleInput({ fullname: e.target.value })} />
                        </div>
                        
                    </div>

                    <div className='form-fields'>
                        <div className='form-label'>
                        <label htmlFor="gender">Gender</label>
                        </div>
                        <div>
                        <input id='gender' name='gender' type='text' value={StudentDetails.gender} onChange={e => handleInput({ gender: e.target.value })} />
                        </div>
                        
                    </div>

                    <div className='form-fields'>
                        <div className='form-label'>
                        <label htmlFor="age">Age</label>
                        </div>
                        <div>
                        <input id='age' type='text' name='age' value={StudentDetails.age} onChange={e => handleInput({ age: e.target.value })} />
                        </div>
                        
                    </div>

                    <div className='form-fields'>
                        <div className='form-label'>
                        <label htmlFor="faculty">Faculty</label>
                        </div>
                        <div>
                        <input id='faculty' name='faculty' className="form-control" type='text' value={StudentDetails.faculty} onChange={e => handleInput({ faculty: e.target.value })} />
                        </div>
                        
                    </div>

                    <div className='form-fields'>
                        <div className='form-label'>
                        <label htmlFor="email">Email</label>
                        </div>
                        <div>
                        <input id='email' name='email' className="form-control" type='text' value={StudentDetails.email} onChange={e => handleInput({ email: e.target.value })} />
                        </div>
                        
                    </div>

                    <div className='form-fields'>
                        <div className='form-label'>
                        <label htmlFor="department">Department</label>
                        </div>
                        <div>
                        <input id='department' name='department' className="form-control" type='text' value={StudentDetails.department} onChange={e => handleInput({ department: e.target.value })} />
                        </div>
                    </div>

                    <div className='form-fields'>
                        <div className='form-label'>
                        <label htmlFor="mobilenumber">MobileNumber</label>
                        </div>
                        <div>
                        <input id='mobilenumber' name='mobilenumber' className="form-control" type='number' value={StudentDetails.mobilenumber} onChange={e => handleInput({ mobilenumber: e.target.value })} />
                        </div>
                    </div>


                    <div className='form-fields'>
                        <input className="submit-button" type='submit' value='Submit' />
                    </div>
                </form>
                </div>
            </div>
        </div>

    )
}

export default Update