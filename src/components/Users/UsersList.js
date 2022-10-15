import classes from './Users.module.css';
import { deleteUserAsync } from '../../store/users/UserSlice';
import { useDispatch } from 'react-redux';

const UsersList = ({user, idx}) =>{
    const {name, address, email, phoneNumber, id} = user;
    const dispatch = useDispatch();

    const deleteHandler = () => {
        console.log(id)
        dispatch(deleteUserAsync({id}));
    }
    return(
        <tbody>
        <tr>
            <td>{idx+1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{address}</td>
            <td>{phoneNumber}</td>
            <td onClick={deleteHandler}><i className="fa-solid fa-trash"></i></td>
        </tr>
    </tbody>
    )
}

export default UsersList;