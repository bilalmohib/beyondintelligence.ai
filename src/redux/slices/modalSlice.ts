import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalContent {
  title: string;
  description: string;
  bottomText: string;
  image: string;
}

interface ModalState {
  isOpen: boolean;
  content: ModalContent | null;
}

const initialState: ModalState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalContent>) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalIsOpen = (state: { modal: ModalState }) => state.modal.isOpen;
export const selectModalContent = (state: { modal: ModalState }) => state.modal.content;

export default modalSlice.reducer;
