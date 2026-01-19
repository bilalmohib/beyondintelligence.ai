import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupFormData {
  parentInformation?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    smsConsent: string;
  };
  childInformation?: {
    firstName: string;
    lastName: string;
    age: number;
    asthmaDescription: string;
  };
  howTheirBreathingBehaves?: {
    symptomsWorseTime: string;
    triggers: string[];
    symptoms: string[];
    timeOutdoors: string;
    mostActiveTime: string;
    playsSports: string;
    awayFromChild: string[];
  };
  homeAndSchoolEnvironment?: {
    usesAirPurifier: string;
    homeAddress: string;
    schoolAddress: string;
  };
  allergiesAndSensitivities?: {
    hasAllergies: string;
    allergies: string[];
  };
  indoorAir?: {
    hasPets: string;
    homeFeelsHumid: string;
    waterLeaksOrMustySmells: string;
    usesGasStove: string;
  };
  illnessAndRecoveryTendencies?: {
    catchesColdsOften: string;
    usesGasStove: string;
  };
  yourExperienceAsAParent?: {
    worries: string[];
  };
}

interface SignupState {
  formData: SignupFormData;
}

const initialState: SignupState = {
  formData: {},
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    saveParentInformation: (state, action: PayloadAction<SignupFormData['parentInformation']>) => {
      state.formData.parentInformation = action.payload;
    },
    saveChildInformation: (state, action: PayloadAction<SignupFormData['childInformation']>) => {
      state.formData.childInformation = action.payload;
    },
    saveHowTheirBreathingBehaves: (state, action: PayloadAction<SignupFormData['howTheirBreathingBehaves']>) => {
      state.formData.howTheirBreathingBehaves = action.payload;
    },
    saveHomeAndSchoolEnvironment: (state, action: PayloadAction<SignupFormData['homeAndSchoolEnvironment']>) => {
      state.formData.homeAndSchoolEnvironment = action.payload;
    },
    saveAllergiesAndSensitivities: (state, action: PayloadAction<SignupFormData['allergiesAndSensitivities']>) => {
      state.formData.allergiesAndSensitivities = action.payload;
    },
    saveIndoorAir: (state, action: PayloadAction<SignupFormData['indoorAir']>) => {
      state.formData.indoorAir = action.payload;
    },
    saveIllnessAndRecoveryTendencies: (state, action: PayloadAction<SignupFormData['illnessAndRecoveryTendencies']>) => {
      state.formData.illnessAndRecoveryTendencies = action.payload;
    },
    saveYourExperienceAsAParent: (state, action: PayloadAction<SignupFormData['yourExperienceAsAParent']>) => {
      state.formData.yourExperienceAsAParent = action.payload;
    },
    resetSignupData: (state) => {
      state.formData = {};
    },
  },
});

export const {
  saveParentInformation,
  saveChildInformation,
  saveHowTheirBreathingBehaves,
  saveHomeAndSchoolEnvironment,
  saveAllergiesAndSensitivities,
  saveIndoorAir,
  saveIllnessAndRecoveryTendencies,
  saveYourExperienceAsAParent,
  resetSignupData,
} = signupSlice.actions;

export const selectSignupData = (state: { signup: SignupState }) => state.signup.formData;
export const selectAllSignupData = (state: { signup: SignupState }) => state.signup.formData;

export default signupSlice.reducer;
