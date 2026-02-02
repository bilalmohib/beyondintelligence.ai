import type { SignupRequest } from '@/redux/signupApiSlice';

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

const toSnakeCase = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '_');
};

const extractPostalCode = (address: string): string => {
  const usZipMatch = address.match(/\b\d{5}(-\d{4})?\b/);
  if (usZipMatch) return usZipMatch[0];
  const genericMatch = address.match(/\b[A-Z0-9]{2,4}\s?[A-Z0-9]{2,4}\b/i);
  if (genericMatch) return genericMatch[0];
  return '';
};

const VALID_MOST_ACTIVE_TIME = ['early_morning', 'late_morning', 'midday', 'late_afternoon', 'evening', 'night', 'not_sure'] as const;

const mapSeverity = (value: string): SignupRequest['severity'] => {
  const v = value.toLowerCase().replace(/\s+/g, '_');
  if (v === 'mild' || v === 'moderate' || v === 'severe' || v === 'not_sure') return v;
  return 'not_sure';
};

const mapLifestyle = (value: string): SignupRequest['lifestyle'] => {
  const v = value.toLowerCase().replace(/\s+/g, '_');
  if (v === 'mostly_indoors' || v === 'mostly_outdoors' || v === 'mixed') return v;
  if (v === 'outdoors_a_lot') return 'mostly_outdoors';
  return 'mixed';
};

const mapHasAllergies = (value: string): SignupRequest['has_allergies'] => {
  const v = value.toLowerCase().replace(/-/g, '_').replace(/\s+/g, '_');
  if (v === 'yes' || v === 'no' || v === 'not_sure') return v;
  return 'not_sure';
};

const mapMostActiveTime = (value: string): string => {
  const v = value.toLowerCase().replace(/\s+/g, '_');
  if (VALID_MOST_ACTIVE_TIME.includes(v as typeof VALID_MOST_ACTIVE_TIME[number])) return v;
  return 'not_sure'; // "varies" or any invalid value -> not_sure
};

const mapTimeWindow = (value: string): string => {
  const v = value.toLowerCase().replace(/\s+/g, '_');
  if (VALID_MOST_ACTIVE_TIME.includes(v as typeof VALID_MOST_ACTIVE_TIME[number])) return v;
  return 'not_sure';
};

const mapPetsAtHome = (hasPets: string): SignupRequest['pets_at_home'] => {
  return hasPets === 'yes' ? 'other' : 'none';
};

const mapHumidityFeel = (value: string): SignupRequest['home_humidity_feel'] => {
  return value === 'yes' ? 'too_humid' : 'comfortable';
};

const deriveHomeHumidity = (humidityFeel: SignupRequest['home_humidity_feel']): SignupRequest['home_humidity'] => {
  const mapping: Record<SignupRequest['home_humidity_feel'], SignupRequest['home_humidity']> = {
    'too_dry': 'low',
    'comfortable': 'normal',
    'too_humid': 'high',
  };
  return mapping[humidityFeel];
};

const toBool = (value: string | undefined): boolean => {
  return value?.toLowerCase() === 'yes';
};

const generateLobId = (): string => {
  return `lob_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const transformSignupData = (formData: SignupFormData): SignupRequest => {
  const {
    parentInformation,
    childInformation,
    howTheirBreathingBehaves,
    homeAndSchoolEnvironment,
    allergiesAndSensitivities,
    indoorAir,
    illnessAndRecoveryTendencies,
    yourExperienceAsAParent,
  } = formData;

  const humidityFeel = mapHumidityFeel(indoorAir?.homeFeelsHumid || 'no');
  const homeHumidity = deriveHomeHumidity(humidityFeel);

  const signupRequest: SignupRequest = {
    lob_id: generateLobId(),
    home_alerts: true,
    parent_full_name: `${parentInformation?.firstName || ''} ${parentInformation?.lastName || ''}`.trim(),
    parent_email: parentInformation?.email || '',
    parent_phone: parentInformation?.phone || '',
    sms_consent: parentInformation?.smsConsent === 'allow',
    child_name: `${childInformation?.firstName || ''} ${childInformation?.lastName || ''}`.trim(),
    child_age_years: childInformation?.age || 0,
    severity: mapSeverity(childInformation?.asthmaDescription || 'not sure'),
    child_worse_when: toSnakeCase(howTheirBreathingBehaves?.symptomsWorseTime || 'not_sure'),
    triggers: (howTheirBreathingBehaves?.triggers || []).map(toSnakeCase),
    symptoms: (howTheirBreathingBehaves?.symptoms || []).map(toSnakeCase),
    lifestyle: mapLifestyle(howTheirBreathingBehaves?.timeOutdoors || 'mixed'),
    most_active_time: mapMostActiveTime(howTheirBreathingBehaves?.mostActiveTime || 'not_sure'),
    plays_sports: (howTheirBreathingBehaves?.playsSports || 'no') as 'yes' | 'no',
    parent_unavailable_windows: (howTheirBreathingBehaves?.awayFromChild || []).map(mapTimeWindow),
    home_address: homeAndSchoolEnvironment?.homeAddress || '',
    school_address: homeAndSchoolEnvironment?.schoolAddress || '',
    postal_code: extractPostalCode(homeAndSchoolEnvironment?.homeAddress || ''),
    has_purifier: toBool(homeAndSchoolEnvironment?.usesAirPurifier),
    has_allergies: mapHasAllergies(allergiesAndSensitivities?.hasAllergies || 'not_sure'),
    allergies: (allergiesAndSensitivities?.allergies || []).map(toSnakeCase),
    pets_at_home: mapPetsAtHome(indoorAir?.hasPets || 'no'),
    home_humidity: homeHumidity,
    home_humidity_feel: humidityFeel,
    home_moisture_issues: toBool(indoorAir?.waterLeaksOrMustySmells),
    has_gas_stove: toBool(indoorAir?.usesGasStove) || toBool(illnessAndRecoveryTendencies?.usesGasStove),
    illness_prone: toBool(illnessAndRecoveryTendencies?.catchesColdsOften),
    recent_illness: false,
    parent_worries: (yourExperienceAsAParent?.worries || []).map(toSnakeCase),
  };

  return signupRequest;
};

export type { SignupFormData };
