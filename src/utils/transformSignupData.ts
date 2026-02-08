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

type TimeOfDayEnum = SignupRequest['child_worse_when'];

const VALID_TIME_OF_DAY: TimeOfDayEnum[] = [
  'early_morning', 'late_morning', 'midday',
  'late_afternoon', 'evening', 'night', 'not_sure',
];

const mapTimeOfDay = (value: string): TimeOfDayEnum => {
  const normalized = toSnakeCase(value);
  if (VALID_TIME_OF_DAY.includes(normalized as TimeOfDayEnum)) {
    return normalized as TimeOfDayEnum;
  }
  return 'not_sure';
};

const extractPostalCode = (address: string): string => {
  const usZipMatch = address.match(/\b\d{5}(-\d{4})?\b/);
  if (usZipMatch) return usZipMatch[0];
  const genericMatch = address.match(/\b[A-Z0-9]{2,4}\s?[A-Z0-9]{2,4}\b/i);
  if (genericMatch) return genericMatch[0];
  return '';
};

const mapSeverity = (value: string): SignupRequest['severity'] => {
  const mapping: Record<string, SignupRequest['severity']> = {
    'mild': 'mild',
    'moderate': 'moderate',
    'severe': 'severe',
    'not sure': 'not_sure',
    'not_sure': 'not_sure',
  };
  return mapping[value.toLowerCase()] || 'not_sure';
};

const mapLifestyle = (value: string): SignupRequest['lifestyle'] => {
  const mapping: Record<string, SignupRequest['lifestyle']> = {
    'mostly indoors': 'mostly_indoors',
    'mostly_indoors': 'mostly_indoors',
    'outdoors a lot': 'mostly_outdoors',
    'mostly_outdoors': 'mostly_outdoors',
    // Legacy "mixed" values default to mostly_indoors
    'mixed': 'mostly_indoors',
  };
  return mapping[value.toLowerCase()] || 'mostly_indoors';
};

const mapHasAllergies = (value: string): SignupRequest['has_allergies'] => {
  const mapping: Record<string, SignupRequest['has_allergies']> = {
    'yes': 'yes',
    'no': 'no',
    'not-sure': 'not_sure',
    'not sure': 'not_sure',
    'not_sure': 'not_sure',
  };
  return mapping[value.toLowerCase()] || 'not_sure';
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
    child_worse_when: mapTimeOfDay(howTheirBreathingBehaves?.symptomsWorseTime || 'not_sure'),
    triggers: howTheirBreathingBehaves?.triggers || [],
    symptoms: howTheirBreathingBehaves?.symptoms || [],
    lifestyle: mapLifestyle(howTheirBreathingBehaves?.timeOutdoors || 'mostly_indoors'),
    most_active_time: mapTimeOfDay(howTheirBreathingBehaves?.mostActiveTime || 'not_sure'),
    plays_sports: (howTheirBreathingBehaves?.playsSports || 'no') as 'yes' | 'no',
    parent_unavailable_windows: (howTheirBreathingBehaves?.awayFromChild || []).map(toSnakeCase),
    home_address: homeAndSchoolEnvironment?.homeAddress || '',
    school_address: homeAndSchoolEnvironment?.schoolAddress || '',
    postal_code: extractPostalCode(homeAndSchoolEnvironment?.homeAddress || ''),
    has_purifier: toBool(homeAndSchoolEnvironment?.usesAirPurifier),
    has_allergies: mapHasAllergies(allergiesAndSensitivities?.hasAllergies || 'not_sure'),
    allergies: allergiesAndSensitivities?.allergies || [],
    pets_at_home: mapPetsAtHome(indoorAir?.hasPets || 'no'),
    home_humidity: homeHumidity,
    home_humidity_feel: humidityFeel,
    home_moisture_issues: toBool(indoorAir?.waterLeaksOrMustySmells),
    has_gas_stove: toBool(indoorAir?.usesGasStove) || toBool(illnessAndRecoveryTendencies?.usesGasStove),
    illness_prone: toBool(illnessAndRecoveryTendencies?.catchesColdsOften),
    recent_illness: false,
    parent_worries: yourExperienceAsAParent?.worries || [],
  };

  return signupRequest;
};

export type { SignupFormData };
