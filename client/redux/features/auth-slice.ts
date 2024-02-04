import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	value: AuthState;
}

type AuthState = {
	_id: string;
	username: string;
	progress: number;
	groups: Group[];
	friends: [];
}

type Group = {
	_id: string;
	name: string;
}

const initialState = {
	value: {
		_id: "",
		username: "",
		progress: 0,
		groups: [],
		friends: [],
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
				...state,
				value: {
				  ...state.value,
				  _id: action.payload,
				},
			}
		},
		setName: (state, action: PayloadAction) => {
			return {
				...state,
				value: {
				  ...state.value,
				  username: action.payload,
				},
			}
		},
		addGroup: (state, action: PayloadAction) => {
			return {
				...state,
				value: {
				  ...state.value,
				  groups: [...state.value.groups, action.payload],
				},
			  };
		},
	}
});

export const {logIn, logOut, setName, addGroup,} = auth.actions;
export default auth.reducer;