import { ContactsState, contactsState } from '../state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './thunks';

const handlePending = (state: ContactsState) => {
  state.isLoading = true;
};
const handleRejected = (
  state: ContactsState,
  { payload }: PayloadAction<string>
) => {
  state.error = payload;
  state.isLoading = false;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.isLoading = false;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        if (typeof payload === 'string') {
          const index = state.contacts.findIndex(
            contact => contact.id === payload
          );
          state.contacts.splice(index, 1);
          state.isLoading = false;
        }
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload.data);
      })
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;