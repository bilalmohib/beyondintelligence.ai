"use client";

import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { useSignupProgress } from "@/hooks/useSignupProgress";
import { useFormSyncWithRedux } from "@/hooks/useFormSyncWithRedux";
import { selectSignupData } from "@/redux/slices/signupSlice";
import type { RootState } from "@/redux/store";

const parentInformationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Please enter a valid email address").min(1, "Email is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Please enter a valid phone number in E.164 format (e.g., +1234567890)"
    )
    .refine(
      (val) => {
        const digits = val.slice(1);
        if (digits.length < 1 || digits.length > 15) return false;
        if (!/^[1-9]/.test(digits)) return false;
        return /^\d+$/.test(digits);
      },
      {
        message: "Invalid E.164 format. Must be +[country code][number] (e.g., +923081511889)",
      }
    ),
  smsConsent: z.enum(["allow"], {
    message: "SMS consent is required",
  }),
});

type ParentInformationFormData = z.infer<typeof parentInformationSchema>;

const normalizePhoneToE164 = (value: string): string => {
  let cleaned = value.replace(/[^\d+]/g, "");

  if (!cleaned.startsWith("+")) {
    cleaned = "+" + cleaned.replace(/\+/g, "");
  }

  cleaned = cleaned.charAt(0) + cleaned.slice(1).replace(/\+/g, "");

  if (cleaned.length > 16) {
    cleaned = cleaned.slice(0, 16);
  }

  return cleaned;
};

const formatPhoneDisplay = (e164Value: string): string => {
  if (!e164Value || !e164Value.startsWith("+")) {
    return e164Value || "";
  }

  const digits = e164Value.slice(1);

  if (digits.length === 0) {
    return "+";
  }

  if (digits.startsWith("1")) {
    if (digits.length <= 1) {
      return `+${digits}`;
    } else if (digits.length <= 4) {
      return `+${digits.slice(0, 1)} (${digits.slice(1)}`;
    } else if (digits.length <= 7) {
      return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    } else if (digits.length <= 10) {
      return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    } else {
      return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
    }
  }

  if (digits.startsWith("44")) {
    if (digits.length <= 2) {
      return `+${digits}`;
    } else if (digits.length <= 4) {
      return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
    } else if (digits.length <= 8) {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`;
    } else {
      return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`;
    }
  }

  if (digits.length <= 2) {
    return `+${digits}`;
  } else if (digits.length <= 5) {
    return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
  } else if (digits.length <= 8) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  } else if (digits.length <= 11) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  } else {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 12)}`;
  }
};

const SignupStepParentInformationPage = () => {
  const pathname = usePathname();
  const { registerForm, unregisterForm } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();
  const savedData = useSelector((state: RootState) => selectSignupData(state).parentInformation);

  const defaultValues = useMemo((): {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    smsConsent: ParentInformationFormData["smsConsent"];
  } => {
    const smsConsent: ParentInformationFormData["smsConsent"] =
      savedData?.smsConsent === "allow" ? "allow" : "allow";
    return {
      firstName: savedData?.firstName ?? "",
      lastName: savedData?.lastName ?? "",
      email: savedData?.email ?? "",
      phone: savedData?.phone ?? "",
      smsConsent,
    };
  }, [savedData]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ParentInformationFormData>({
    resolver: zodResolver(parentInformationSchema),
    defaultValues,
    mode: "onChange",
  });

  useFormSyncWithRedux<ParentInformationFormData>(savedData, reset, defaultValues);

  useEffect(() => {
    registerForm(
      async () => {
        const isValid = await trigger();
        return isValid;
      },
      () => getValues()
    );
    return () => {
      saveStepDraft(pathname, getValues());
      unregisterForm();
    };
  }, [registerForm, unregisterForm, trigger, getValues, pathname, saveStepDraft]);

  const phoneValue = watch("phone");
  const isPhoneValid = phoneValue
    ? parentInformationSchema.shape.phone.safeParse(phoneValue).success
    : false;

  const [phoneDisplay, setPhoneDisplay] = useState("");

  useEffect(() => {
    if (phoneValue) {
      setPhoneDisplay(formatPhoneDisplay(phoneValue));
    } else {
      setPhoneDisplay("");
    }
  }, [phoneValue]);

  const onSubmit = (data: ParentInformationFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form 
      className="flex flex-col gap-10" 
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Parent Information Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-1">
            <Input
              label="First Name*"
              required
              type="text"
              id="first-name"
              placeholder="First Name"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${errors.firstName ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                }`}
              aria-label="First Name"
              aria-required="true"
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby={errors.firstName ? "first-name-error" : undefined}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p id="first-name-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Input
              label="Last Name*"
              required
              type="text"
              id="last-name"
              placeholder="Last Name"
              className="rounded-2xl"
              labelClassName="text-white!"
              inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${errors.lastName ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                }`}
              aria-label="Last Name"
              aria-required="true"
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby={errors.lastName ? "last-name-error" : undefined}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p id="last-name-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            We'll use your name to speak with care, clarity, and respect —
            always as your child's partner in protection.
          </Paragraph>
          <Tooltip>
            <div className="flex flex-row justify-center items-center gap-1.5">
              <div>
                <TooltipTrigger asChild className="cursor-pointer">
                  <InfoIcon className="text-white!" />
                </TooltipTrigger>
              </div>
              <Paragraph className="text-white! text-xs! font-semibold">
                See why this matters?
              </Paragraph>
            </div>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Using your name ensures Satori speaks directly to you as the
                parent, especially during moments when guidance needs to feel
                steady, personal, and relevant to your family — not generic or
                broadcast to others.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Input
          label="Email Address*"
          required
          id="email-address"
          type="email"
          placeholder="Email Address"
          className="rounded-2xl"
          labelClassName="text-white!"
          inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${errors.email ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
            }`}
          aria-label="Email Address"
          aria-required="true"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
            {errors.email.message}
          </p>
        )}
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Email lets Satori send longer-form insights that don't fit into SMS
            — like seasonal guides and important updates.
          </Paragraph>
          <Tooltip>
            <div className="flex flex-row justify-center items-center gap-1.5">
              <div>
                <TooltipTrigger asChild className="cursor-pointer">
                  <InfoIcon className="text-white!" />
                </TooltipTrigger>
              </div>
              <Paragraph className="text-white! text-xs! font-semibold">
                See why this matters?
              </Paragraph>
            </div>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Some of the most meaningful support for families — seasonal
                asthma–allergy planning, environmental insight summaries, safety
                updates, and improvements to your child's personalized model —
                simply cannot fit in a text message. Email provides a reliable
                way for Satori to help you stay one step ahead throughout the
                year. Your email is never sold or shared.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-2">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  label="Parent Phone*"
                  required
                  id="parent-phone"
                  type="tel"
                  placeholder="+1 (234) 567-8900"
                  className="rounded-2xl"
                  labelClassName="text-white!"
                  inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${errors.phone ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                    }`}
                  aria-label="Parent Phone Number"
                  aria-required="true"
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  value={phoneDisplay}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const e164Value = normalizePhoneToE164(inputValue);
                    setPhoneDisplay(formatPhoneDisplay(e164Value));
                    field.onChange(e164Value);
                  }}
                  onBlur={field.onBlur}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="text-sm text-red-500 mt-1 font-medium"
                    role="alert"
                  >
                    {errors.phone.message}
                  </p>
                )}
                {!errors.phone && phoneValue && isPhoneValid && (
                  <p className="text-xs text-green-400 mt-1">
                    ✓ Valid E.164 format
                  </p>
                )}
                {!errors.phone && !phoneValue && (
                  <p className="text-xs text-gray-400 mt-1">
                    Format: E.164 (e.g., +1 (234) 567-8900)
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Your phone is your secure login and the channel Satori uses to
            protect your child in real time.
          </Paragraph>
          <Tooltip>
            <div className="flex flex-row justify-center items-center gap-1.5">
              <div>
                <TooltipTrigger asChild className="cursor-pointer">
                  <InfoIcon className="text-white!" />
                </TooltipTrigger>
              </div>
              <Paragraph className="text-white! text-xs! font-semibold">
                See why this matters?
              </Paragraph>
            </div>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Satori is a no-app, text-first, voice-ready asthma–allergy
                guardian. Your phone becomes your identity, security key, and
                conversation link. This is what enables instant guidance —
                without apps, passwords, or friction — especially during moments
                when the environment shifts quickly.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="consent-to-receive-sms-alerts" className="text-white!">
          Consent to Receive SMS Alerts
        </Label>
        <Controller
          name="smsConsent"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-row gap-3"
              aria-label="Consent to Receive SMS Alerts"
              aria-required="true"
              aria-invalid={errors.smsConsent ? "true" : "false"}
            >
              <Label
                htmlFor="consent-to-receive-sms-alerts-allow"
                className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
              >
                <RadioGroupItem value="allow" id="consent-to-receive-sms-alerts-allow" />
                <span className="text-radio-text dark:text-radio-text text-lg leading-7 font-normal">
                  Allow
                </span>
              </Label>
            </RadioGroup>
          )}
        />
        {errors.smsConsent && (
          <p id="sms-consent-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
            {errors.smsConsent.message}
          </p>
        )}
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Satori sends life-simplifying guidance when environmental or
            meteorological conditions may affect your child's breathing.
          </Paragraph>
          <Tooltip>
            <div className="flex flex-row justify-center items-center gap-1.5">
              <div>
                <TooltipTrigger asChild className="cursor-pointer">
                  <InfoIcon className="text-white!" />
                </TooltipTrigger>
              </div>
              <Paragraph className="text-white! text-xs! font-semibold">
                See why this matters?
              </Paragraph>
            </div>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Satori monitors real-time environmental, weather, and
                atmospheric patterns — including pollution spikes, heat-ozone
                surges, cold-dry air, and air-trapping events. SMS consent
                allows Satori to reach you instantly so you can make small but
                powerful adjustments at the exact moments they matter most.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepParentInformationPage;
