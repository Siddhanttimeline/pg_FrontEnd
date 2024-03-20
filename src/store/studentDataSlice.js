import { createSlice } from "@reduxjs/toolkit";

const initialStudentDataState = {
  id: null,
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
  aadharCardNumber: "",
  profileImagePath: null,
  aadharCardImagePath: null,
  room: {
    id: null,
    roomNumber: null,
    floorNumber: null,
    price: null,
  },
  payments: null,
  dateOfJoining: null,
  currentMonthPayment: null,
};

const dataSlice = createSlice({
  name: "studentDataUserProfile",
  initialState: initialStudentDataState,
  reducers: {
    saveData(state, action) {
      const {
        id,
        name,
        email,
        address,
        phoneNumber,
        aadharCardNumber,
        profileImagePath,
        aadharCardImagePath,
        room,
        payments,
        dateOfJoining,
        currentMonthPayment,
      } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.address = address;
      state.phoneNumber = phoneNumber;
      state.aadharCardNumber = aadharCardNumber;
      state.profileImagePath = profileImagePath;
      state.aadharCardImagePath = aadharCardImagePath;
      state.room = room;
      state.payments = payments;
      state.dateOfJoining = dateOfJoining;
      state.currentMonthPayment = currentMonthPayment;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
