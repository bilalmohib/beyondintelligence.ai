import type { SignupRequest } from '@/redux/signupApiSlice';

// Form data structure from Redux store
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

/**
 * Converts a string to snake_case format
 */
const toSnakeCase = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '_');
};

/**
 * Extracts postal code from an address string
 * Handles both US ZIP codes (5 or 9 digit) and international postal codes
 */
const extractPostalCode = (address: string): string => {
  // Match US ZIP codes (5 digits or 5+4 format)
  const usZipMatch = address.match(/\b\d{5}(-\d{4})?\b/);
  if (usZipMatch) return usZipMatch[0];
  
  // Match generic alphanumeric postal codes (e.g., UK, Canada)
  const genericMatch = address.match(/\b[A-Z0-9]{2,4}\s?[A-Z0-9]{2,4}\b/i);
  if (genericMatch) return genericMatch[0];
  
  return '';
};

/**
 * Maps severity value from form to API format
 */
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

/**
 * Maps lifestyle/time outdoors value from form to API format
 */
const mapLifestyle = (value: string): SignupRequest['lifestyle'] => {
  const mapping: Record<string, SignupRequest['lifestyle']> = {
    'mostly indoors': 'mostly_indoors',
    'mostly_indoors': 'mostly_indoors',
    'outdoors a lot': 'mostly_outdoors',
    'mostly_outdoors': 'mostly_outdoors',
    'mixed': 'mixed',
  };
  return mapping[value.toLowerCase()] || 'mixed';
};

/**
 * Maps has allergies value from form to API format
 */
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

/**
 * Maps pets at home value from form to API format
 */
const mapPetsAtHome = (hasPets: string): SignupRequest['pets_at_home'] => {
  // Since the form only asks yes/no, we default to 'other' for yes and 'none' for no
  // In a more detailed form, this could be expanded
  return hasPets === 'yes' ? 'other' : 'none';
};

/**
 * Maps humidity feel value from form to API format
 */
const mapHumidityFeel = (value: string): SignupRequest['home_humidity_feel'] => {
  // Form asks if home feels humid/musty/damp with yes/no
  return value === 'yes' ? 'too_humid' : 'comfortable';
};

/**
 * Derives home humidity from humidity feel
 */
const deriveHomeHumidity = (humidityFeel: SignupRequest['home_humidity_feel']): SignupRequest['home_humidity'] => {
  const mapping: Record<SignupRequest['home_humidity_feel'], SignupRequest['home_humidity']> = {
    'too_dry': 'low',
    'comfortable': 'normal',
    'too_humid': 'high',
  };
  return mapping[humidityFeel];
};

/**
 * Converts boolean-like string to boolean
 */
const toBool = (value: string | undefined): boolean => {
  return value?.toLowerCase() === 'yes';
};

/**
 * Generates a unique LOB ID for the signup
 */
const generateLobId = (): string => {
  return `lob_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Transforms the Redux form data into the API request format
 */
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

  // Determine humidity feel and humidity
  const humidityFeel = mapHumidityFeel(indoorAir?.homeFeelsHumid || 'no');
  const homeHumidity = deriveHomeHumidity(humidityFeel);

  // Build the API request
  const signupRequest: SignupRequest = {
    // Generate unique LOB ID
    lob_id: generateLobId(),
    
    // Default home alerts to true
    home_alerts: true,
    
    // Parent Information
    parent_full_name: `${parentInformation?.firstName || ''} ${parentInformation?.lastName || ''}`.trim(),
    parent_email: parentInformation?.email || '',
    parent_phone: parentInformation?.phone || '',
    sms_consent: parentInformation?.smsConsent === 'allow',
    
    // Child Information
    child_name: `${childInformation?.firstName || ''} ${childInformation?.lastName || ''}`.trim(),
    child_age_years: childInformation?.age || 0,
    severity: mapSeverity(childInformation?.asthmaDescription || 'not sure'),
    
    // How Their Breathing Behaves
    child_worse_when: toSnakeCase(howTheirBreathingBehaves?.symptomsWorseTime || 'not_sure'),
    triggers: howTheirBreathingBehaves?.triggers || [],
    symptoms: howTheirBreathingBehaves?.symptoms || [],
    lifestyle: mapLifestyle(howTheirBreathingBehaves?.timeOutdoors || 'mixed'),
    most_active_time: toSnakeCase(howTheirBreathingBehaves?.mostActiveTime || 'not_sure'),
    plays_sports: (howTheirBreathingBehaves?.playsSports || 'no') as 'yes' | 'no',
    parent_unavailable_windows: (howTheirBreathingBehaves?.awayFromChild || []).map(toSnakeCase),
    
    // Home and School Environment
    home_address: homeAndSchoolEnvironment?.homeAddress || '',
    school_address: homeAndSchoolEnvironment?.schoolAddress || '',
    postal_code: extractPostalCode(homeAndSchoolEnvironment?.homeAddress || ''),
    has_purifier: toBool(homeAndSchoolEnvironment?.usesAirPurifier),
    
    // Allergies and Sensitivities
    has_allergies: mapHasAllergies(allergiesAndSensitivities?.hasAllergies || 'not_sure'),
    allergies: allergiesAndSensitivities?.allergies || [],
    
    // Indoor Air
    pets_at_home: mapPetsAtHome(indoorAir?.hasPets || 'no'),
    home_humidity: homeHumidity,
    home_humidity_feel: humidityFeel,
    home_moisture_issues: toBool(indoorAir?.waterLeaksOrMustySmells),
    has_gas_stove: toBool(indoorAir?.usesGasStove) || toBool(illnessAndRecoveryTendencies?.usesGasStove),
    
    // Illness and Recovery Tendencies
    illness_prone: toBool(illnessAndRecoveryTendencies?.catchesColdsOften),
    recent_illness: false, // Not collected in form, defaulting to false
    
    // Your Experience as a Parent
    parent_worries: yourExperienceAsAParent?.worries || [],
  };

  return signupRequest;
};

export type { SignupFormData };
