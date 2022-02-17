import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const regexContactValidation = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4,5}$/;
const regexEmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const EditEmployee = () => {

    const { id } = useParams();
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [errorEmail, setErrorEmail] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();
    console.log(employeeDetails)

    useEffect(() => {
        fetch(`http://localhost:5000/allEmployee/${id}`)
            .then(res => res.json())
            .then(data => setEmployeeDetails(data))
    }, [id]);

    const editName = (e) => {

        const editname = e.target.value;
        const newInfo = { ...employeeDetails };
        newInfo.name = editname;
        setEmployeeDetails(newInfo);
    }
    const editEmail = (e) => {

        if (regexEmailValidation.test(e.target.value) || e.target.value === "") {
            const editemail = e.target.value;
            const newInfo = { ...employeeDetails };
            newInfo.email = editemail;
            setEmployeeDetails(newInfo);
            setErrorEmail('');
            document.getElementById("submit").removeAttribute('disabled')
        }

        else {
            const editemail = e.target.value;
            const newInfo = { ...employeeDetails };
            newInfo.email = editemail;
            setEmployeeDetails(newInfo);
            setErrorEmail("Enter a valid email address ")
            document.getElementById("submit").setAttribute('disabled', true)
        }
    }
    const editAddress = (e) => {
        const editaddress = e.target.value;
        const newInfo = { ...employeeDetails };
        newInfo.address = editaddress;
        setEmployeeDetails(newInfo);
    }
    const editContact = (e) => {
        if (regexContactValidation.test(e.target.value) || e.target.value === "") {
            const editContact = e.target.value;
            const newInfo = { ...employeeDetails };
            newInfo.contact = editContact;
            setEmployeeDetails(newInfo);
            document.getElementById("submit").removeAttribute('disabled');
            setError('');
        }
        else {
            const editContact = e.target.value;
            const newInfo = { ...employeeDetails };
            newInfo.contact = editContact;
            setEmployeeDetails(newInfo);
            setError("Enter a valid contact number");
            document.getElementById("submit").setAttribute('disabled', true)
        }



    }

    const submit = e => {

        e.preventDefault()
        fetch(`http://localhost:5000/allEmploye/${id}`, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(employeeDetails)
        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    swal({
                        text: "Edit information successfully!",
                        icon: "success",
                        button: "ok!",
                    });

                    history.push('/home')

                }
            })



    }




    return (
        <div>
            <h1 className="text-center my-2">Edit employee information</h1>
            <div className='my-5'>
                <form onSubmit={submit} >
                    <input required type="text" className='mb-3 mx-auto w-50 form-control' onChange={editName} value={employeeDetails.name || ""} placeholder='Name' />

                    <div>
                        <input required type="text" className='mb-3  mx-auto  w-50 form-control' onChange={editEmail} value={employeeDetails.email || ""} placeholder='Email' />
                        <p className='text-center text-danger'>{errorEmail}</p>
                    </div>
                    <input required type="text" className='mb-3  mx-auto  w-50 form-control' onChange={editAddress} value={employeeDetails.address || ""} placeholder='Address' />

                    <div>
                    <input required type="text" className='mb-3  mx-auto  w-50 form-control' onChange={editContact} value={employeeDetails.contact || ""} placeholder='Contact' />
                    <p className='text-danger text-center'>{error}</p>
                    </div>
                    <input id='submit' className="btn btn-danger mt-3 form-control  mx-auto d-block  w-50  " type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;