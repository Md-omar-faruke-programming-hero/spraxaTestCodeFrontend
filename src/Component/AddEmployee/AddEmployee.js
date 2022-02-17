import React, { useState } from 'react';
import swal from 'sweetalert';
import { Modal } from 'antd';
import 'antd/dist/antd.css';

const regexContactValidation = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4,5}$/;
const regexEmailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



const AddEmployee = ({ isModalVisible, handleCancel }) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorContact, setErrorContact] = useState('');

    const handleEmail = e => {
        if (regexEmailValidation.test(e.target.value) || e.target.value === "") {
            setEmail(e.target.value);
            setErrorEmail('');
        }

        else {
            setErrorEmail("Enter a valid email address ");
        }
    }

    const handleContact = e => {
        if (regexContactValidation.test(e.target.value) || e.target.value === "") {
            setContact(e.target.value);
            setErrorContact('');
        }

        else {
            setErrorContact("Enter a valid contact number ");
        }
    }


    const submit = e => {
        e.preventDefault();

        if (errorContact === "" && errorEmail === "") {
            const employeeInfo = { name, address, contact, department, email, isDeleted: 0 };

            fetch('http://localhost:5000/employee', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(employeeInfo)
            }).then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        swal({
                            title: "Done",
                            text: "New employee added",
                            icon: "success",
                            button: "ok",
                        });
                    }
                    handleCancel();
                })
        }
        else {
            swal({
                // 
                text: "Something went wrong !",
                icon: "error",
                button: "ok!",
            });

        }
    }
    return (
        <Modal visible={isModalVisible} footer={false} onCancel={handleCancel}>
            <h3 className='text-center'>Enter new employee information</h3>
            <form onSubmit={submit}>
                <input required onChange={(e) => setName(e.target.value)} type="text" className='w-75 my-2 form-control' placeholder="Name" />
                <div>
                    <input required onChange={handleEmail} type="text" className='w-75 my-2 form-control' placeholder="Email" />
                    <span className='text-danger'>{errorEmail}</span>
                </div>
                <input required onChange={(e) => setAddress(e.target.value)} type="text" className='w-75 my-2 form-control' placeholder="Address" />
                <div>
                    <input required onChange={handleContact} type="text" className='w-75 my-2 form-control' placeholder="Contact Number" />
                    <span className='text-danger'>{errorContact}</span>
                </div>
                <input required onChange={(e) => setDepartment(e.target.value)} type="text" className='w-75 my-2 form-control' placeholder="Department" />
                <input type="submit" className='w-75 my-2 btn-primary btn' />
            </form>
        </Modal>
    );
};

export default AddEmployee;