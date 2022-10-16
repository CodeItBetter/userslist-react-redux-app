import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';
import axios from 'axios';

export const getUserAsync = createAsyncThunk(
    'user/getUserAsync',
    async () => {
        try {
            const response = await axios.get('https://users-list-app.herokuapp.com/user');
            console.log(response);
            const user = await response.data;
            return { user };
          } catch (error) {
            console.error(error);
          }
    }
)

export const addUserAsync = createAsyncThunk(
  'user/addUserAsync',
  async (payload) => {
    try{
      const response = await axios({
        method: 'post',
        url: 'https://users-list-app.herokuapp.com/user',
        data: {
          name: payload.name,
          email: payload.email,
          address: payload.address,
          phoneNumber: payload.phoneNumber
        }
      })
      const user = await response.data;
      return { user };
    } catch (error) {
      console.error(error);
    }       
  }
)

export const deleteUserAsync = createAsyncThunk(
	'user/deleteUserAsync',
	async (payload) => {
		const response = await axios.delete(`https://users-list-app.herokuapp.com/user/${payload.id}`, {
			method: 'delete',
		});
		return { id: payload.id };
	}
);

const userSlice = createSlice({
    name: 'userData',
    initialState: [],
    reducers: {
     addUser: (state, action) => {
        const { name, email, address, phoneNumber } = action.payload;
        const newUser = {
            id: nanoid(),
            name,
            email,
            address,
            phoneNumber
        }
        console.log(newUser);
        state.push(newUser);
     },
     deleteUser: (state, action) => {
        console.log(action.payload.id)
        return state.filter(user => user.id !== action.payload.id);
     }
    },
    extraReducers: {
      [getUserAsync.pending]: (state, action) => {
        console.log("fetching data...");
      },
      [getUserAsync.fulfilled]: (state, action) => {
        console.log("fetched data succesfully");
        return action.payload.user;
      },
      [addUserAsync.fulfilled]: (state, action) =>{
        state.push(action.payload.user);
      },
      [deleteUserAsync.fulfilled]: (state, action) => {
        return state.filter((user) => user.id !== action.payload.id);
      },
     }
  })
  
  export const { addUser, deleteUser } = userSlice.actions;
  export default userSlice.reducer;