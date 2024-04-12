import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideBar from '../../components/SideBar';

export default function PrescriptionCreateForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        prescriptionID: '',
        firstname: '',
        lastname: '',
        age: '',
        contactNo: '',
        MedicationNames: '',
        units: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValue(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 'Active' : 'Inactive') : value
        }));
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addPrescription = await axios.post('http://localhost:3000/api/create', value);
            const response = addPrescription.data;
            if (response.success) {
                toast.success(response.message, {duration: 4000});
                setTimeout(() => {
                    navigate('/Prescription-management');
                });
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(value);
    };

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1'>
                <div className='bg-paleblue justify-between flex px-10 py-8'>
                    <h1 className='text-4xl font-bold text-blue'>Prescription Form</h1>
                    <div className='flex gap-2'>
                        <img className='w-12 h-12 border-2 border-white rounded-full' src="https://avatars.githubusercontent.com/u/130960790?s=96&v=4" alt="tania andrew" />
                        <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between font-bold">
                                <h1>Mohamed Shahmi</h1>
                            </div>
                            <p className='text-xs '>Prescription Manager</p>
                        </div>
                    </div>
                </div>
                <div className='p-10 bg-paleblue m-10 rounded-3xl max-w-4xl border-2 border-light-blue'>
                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label className='font-semibold text-black'>Prescription ID</label>
                            <input type="text" placeholder='Enter Prescription ID' id="prescriptionID" name="prescriptionID" value={value.prescriptionID} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>First Name</label>
                            <input type="text" placeholder='Enter First Name' id="firstName" name="firstName" value={value.firstname} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Last Name</label>
                            <input type="text" placeholder='Enter Last Name' id="lastName" name="lastName" value={value.lastname} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            <label className='font-semibold text-black'>Age</label>
                            <input type="text" placeholder='Enter Age' id="age" name="age" value={value.age} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                            <label className='font-semibold text-black'>Contact Number</label>
                            <input type="text" placeholder='Enter Contact Number' id="contactNumber" name="contactNumber" value={value.contactNumber} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>

                            
                            <input type="submit" value="Submit" className='bg-light-blue hover:bg-blue font-semibold text-white p-3 rounded-lg w-full cursor-pointer'/>
                        </div>

                        <div className='flex flex-col gap-1 flex-1'>
                        <label className='font-semibold text-black'>Medication Name</label>
                            <input type="text" placeholder='Enter Medication Name' id="medicationName" name="medicationName" value={value.MedicationNames} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>


                            <label className='font-semibold text-black'>Unites</label>
                            <input type="text" placeholder='Enter unites' id="unites" name="unites" value={value.units} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4' required/>
                            
                            <label className='font-semibold text-black'>Notes</label>
                            <textarea type="textarea" placeholder='Enter notes' id="notes" name="notes" value={value.notes} onChange={handleChange} className='border-2 border-gray outline-none rounded-md p-2 mb-4 ' required/>

                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}