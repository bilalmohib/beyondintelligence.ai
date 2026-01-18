"use client";

import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paragraph } from "@/components/common/Typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";

// Zod schema for form validation
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
    ),
  smsConsent: z.enum(["allow"], {
    message: "SMS consent is required",
  }),
});

type ParentInformationFormData = z.infer<typeof parentInformationSchema>;

const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters except the leading +
  let cleaned = value.replace(/[^\d+]/g, "");

  // Ensure it starts with +
  if (!cleaned.startsWith("+")) {
    cleaned = "+" + cleaned.replace(/\+/g, "");
  }

  // Remove any additional + signs after the first one
  cleaned = cleaned.charAt(0) + cleaned.slice(1).replace(/\+/g, "");

  // Limit to 16 characters (1 for + and up to 15 digits)
  if (cleaned.length > 16) {
    cleaned = cleaned.slice(0, 16);
  }

  return cleaned;
};

const SignupStepParentInformationPage = () => {
  const { registerForm, unregisterForm } = useSignupForm();

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ParentInformationFormData>({
    resolver: zodResolver(parentInformationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      smsConsent: "allow",
    },
    mode: "onChange",
  });

  useEffect(() => {
    registerForm(async () => {
      const isValid = await trigger();
      return isValid;
    });
    return () => unregisterForm();
  }, [registerForm, unregisterForm, trigger]);

  const phoneValue = watch("phone");
  const isPhoneValid = phoneValue
    ? parentInformationSchema.shape.phone.safeParse(phoneValue).success
    : false;

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
                  placeholder="+1234567890"
                  className="rounded-2xl"
                  labelClassName="text-white!"
                  inputClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${errors.phone ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                    }`}
                  aria-label="Parent Phone Number"
                  aria-required="true"
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  {...field}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    field.onChange(formatted);
                  }}
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
                    Format: E.164 (e.g., +1234567890)
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
