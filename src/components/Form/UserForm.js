import { useState } from 'react';
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from './UserForm.module.css';
import { useDispatch} from 'react-redux';
import {addUserAsync} from '../../store/users/UserSlice';

const initialState = {
    name: '',
    email: '',
    address: '',
    phoneNumber: ''
}

const UsersForm = () =>{
    const [userData, setUserData] = useState(initialState);

    const dispatch = useDispatch();

    const { name, email, address, phoneNumber } = userData;

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUserData((prevData) => {
            return {
            ...prevData,
            [name]: value
        }})
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addUserAsync({
            name,
            email,
            address,
            phoneNumber
        }));
        setUserData(initialState);
    }
    
    return(
       <form onSubmit={submitHandler}>
        <Input type="text" name="name" placeholder="Enter your email" value={name}
        label="Name" onChange={inputHandler} />
        <Input type="email" name="email" placeholder="Enter your email" value={email}
        label="Email" onChange={inputHandler} />
        <Input type="text" name="address" placeholder="Enter your address" value={address}
        label="Address" onChange={inputHandler} />
        <Input type="tel" name="phoneNumber" placeholder="Enter your phone number" value={phoneNumber}
        label="PhoneNumber" onChange={inputHandler} />
        <Button type="submit">Add</Button>
       </form>
    )
}

export default UsersForm;