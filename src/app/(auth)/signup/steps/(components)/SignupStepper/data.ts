export type SignupStep = {
  id: number;
  title: string;
  stepValue: string;
  href: string;
  active: boolean;
  completed: boolean;
};

export const signupSteps: SignupStep[] = [
  {
    id: 1,
    title: "Parent Information",
    href: "/signup/steps/parent-information",
    stepValue: "01",
    active: false,
    completed: false,
  },
  {
    id: 2,
    title: "Child Information",
    href: "/signup/steps/child-information",
    stepValue: "02",
    active: false,
    completed: false,
  },
  {
    id: 3,
    title: "How their breathing behaves",
    href: "/signup/steps/how-their-breathing-behaves",
    stepValue: "03",
    active: false,
    completed: false,
  },
  {
    id: 4,
    title: "Home & school environment",
    href: "/signup/steps/home-and-school-environment",
    stepValue: "04",
    active: false,
    completed: false,
  },
  {
    id: 5,
    title: "Allergies & sensitivities",
    href: "/signup/steps/allergies-and-sensitivities",
    stepValue: "05",
    active: false,
    completed: false,
  },
  {
    id: 6,
    title: "Indoor Air",
    href: "/signup/steps/indoor-air",
    stepValue: "06",
    active: false,
    completed: false,
  },
  {
    id: 7,
    title: "Illness & recovery tendencies",
    href: "/signup/steps/illness-and-recovery-tendencies",
    stepValue: "07",
    active: false,
    completed: false,
  },
  {
    id: 8,
    title: "Your experience as a parent",
    href: "/signup/steps/your-experience-as-a-parent",
    stepValue: "08",
    active: false,
    completed: false,
  },
];
