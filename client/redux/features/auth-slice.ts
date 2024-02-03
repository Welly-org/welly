import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	value: AuthState;
}

type AuthState = {
	isAuth: boolean;
	_id: string;
	username: string;
	progress: number;
	groups: [];
	friends: []
}

const initialState = {
	value: {
		isAuth: false,
		_id: "",
		username: "",
		progress: 0,
		groups: [],
		friends: []
	} as AuthState, 
} as InitialState; 

export const auth = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: () => {
			return initialState;
		},
		logIn: (state, action: PayloadAction) => {
			return {
				value: {
					isAuth: true,
					_id: action.payload,
					username: "",
					progress: 0,
					groups: [],
					friends: []
				}
			}
		}
	}
});

export const {logIn, logOut} = auth.actions;
export default auth.reducer;