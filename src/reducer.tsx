export const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  age: null,
  about: "",
  skills: [],
  gender: "",
  image: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateUser":
      return { ...state, [action.payload.key]: action.payload.value };
    case 'resetUser':
      return action.payload  
    default:
      return state;
  }
};

export default reducer;
