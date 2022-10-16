import { Fragment, useEffect } from 'react';
import UsersList from './UsersList';
import classes from './Users.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {getUserAsync} from '../../store/users/UserSlice';
    
const Users = () =>{
   const userData = useSelector(state => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getUserAsync());
   }, [dispatch]);

    return (
        <Fragment>
        <h1>Users List</h1>
        <table className={classes['table-container']}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>PhoneNumber</th>
                    <th>Delete</th>
                </tr>
            </thead>
            {userData.map((user, idx) => <UsersList idx={idx} user={user} key={user.id} />)}
        </table>
        </Fragment>
    )
}
export default Users;
