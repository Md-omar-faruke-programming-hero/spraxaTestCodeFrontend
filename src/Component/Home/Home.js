import React, { useEffect, useState } from 'react';
import AddEmployee from '../AddEmployee/AddEmployee';
import Header from '../Header/Header';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const [employe, setEmployes] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/allEmployee?isDeleted=${0}`)
            .then(res => res.json())
            .then((data) => {
                setEmployes(data)
            })
    }, [employe]);

    const columns = [
        {
            title: 'PersonName',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact'
        },
        {
            title: 'Action',
            key: 'buttons',
            render: (record) => <><Link to={`/edit/${record._id}`}><button className='btn btn-primary me-1'>Edit</button></Link>
                <button onClick={() => deleteEmoployee(record._id)} className='btn btn-danger'>Delete</button></>
        }
    ];

    const deleteEmoployee = (id) => {
        const deleteinfo = {
            isDeleted: 1
        }

        fetch(`http://localhost:5000/allEmployee/${id}`, {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(deleteinfo)

        }).then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    swal({
                        text: "Delete member successfully!",
                        icon: "success",
                        button: "ok!",
                    });
                }
            })
    }
    return (
        <>
            <Header></Header>

            <div>
                <h1 className='text-center mt-2'>Welcome to the website</h1>
                <div className='text-center my-3'>
                    <button onClick={showModal} className='btn btn-primary'>Add employee</button>
                </div>
                <div style={{ textAlign: "center", margin: "0px 5px", padding: "0 20px" }}>
                    <Table dataSource={employe} columns={columns} />
                </div>
            </div>

            <AddEmployee isModalVisible={isModalVisible} handleCancel={handleCancel} />

        </>
    );
};

export default Home;