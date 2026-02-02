"use client";

import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "@/components/icons";
import { Combobox } from "@/components/ui/combo-box";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paragraph } from "@/components/common/Typography";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSignupForm } from "@/app/(auth)/signup/steps/(components)/SignupFormContext";
import { useSignupProgress } from "@/hooks/useSignupProgress";
import { useFormSyncWithRedux } from "@/hooks/useFormSyncWithRedux";
import { selectSignupData } from "@/redux/slices/signupSlice";
import type { RootState } from "@/redux/store";

const howTheirBreathingBehavesSchema = z.object({
  symptomsWorseTime: z.string().min(1, "Please select an option"),
  triggers: z.array(z.string()).min(1, "Please select at least one option"),
  symptoms: z.array(z.string()).min(1, "Please select at least one option"),
  timeOutdoors: z.string().min(1, "Please select an option"),
  mostActiveTime: z.string().min(1, "Please select an option"),
  playsSports: z.enum(["yes", "no"], {
    message: "Please select an option",
  }),
  awayFromChild: z.array(z.string()).min(1, "Please select at least one option"),
});

type HowTheirBreathingBehavesFormData = z.infer<typeof howTheirBreathingBehavesSchema>;

const SignupStepHowTheirBreathingBehavesPage = () => {
  const pathname = usePathname();
  const { registerForm, unregisterForm } = useSignupForm();
  const { saveStepDraft } = useSignupProgress();
  const savedData = useSelector((state: RootState) => selectSignupData(state).howTheirBreathingBehaves);

  const toUnderscore = (v: string) => v.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
  const migrateTime = (v: string | undefined) => (v === "varies" ? "not_sure" : v ? toUnderscore(v) : undefined);
  const migrateArr = (arr: string[] | undefined) =>
    (arr ?? []).map((x) => (x === "varies" ? "not_sure" : toUnderscore(x)));

  const defaultValues = useMemo((): {
    symptomsWorseTime?: string;
    triggers: string[];
    symptoms: string[];
    timeOutdoors?: string;
    mostActiveTime?: string;
    playsSports?: HowTheirBreathingBehavesFormData["playsSports"];
    awayFromChild: string[];
  } => {
    const raw = savedData?.playsSports;
    const playsSports: HowTheirBreathingBehavesFormData["playsSports"] | undefined =
      raw === "yes" || raw === "no" ? raw : undefined;
    return {
      symptomsWorseTime: migrateTime(savedData?.symptomsWorseTime),
      triggers: migrateArr(savedData?.triggers),
      symptoms: migrateArr(savedData?.symptoms),
      timeOutdoors: savedData?.timeOutdoors ? toUnderscore(savedData.timeOutdoors) : undefined,
      mostActiveTime: migrateTime(savedData?.mostActiveTime),
      playsSports,
      awayFromChild: migrateArr(savedData?.awayFromChild),
    };
  }, [savedData]);

  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<HowTheirBreathingBehavesFormData>({
    resolver: zodResolver(howTheirBreathingBehavesSchema),
    defaultValues,
    mode: "onChange",
  });

  useFormSyncWithRedux<HowTheirBreathingBehavesFormData>(savedData, reset, defaultValues);

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

  const onSubmit = (data: HowTheirBreathingBehavesFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <form 
      className="flex flex-col gap-10" 
      onSubmit={handleSubmit(onSubmit)}
      aria-label="How Their Breathing Behaves Form"
    >
      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="symptomsWorseTime"
            control={control}
            render={({ field }) => (
              <>
                <Combobox
                  label="When do their symptoms tend to get worse?"
                  labelClassName="text-white!"
                  id="when-do-their-symptoms-tend-to-get-worse"
                  comboBoxClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                    errors.symptomsWorseTime ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                  }`}
                  aria-label="When do their symptoms tend to get worse?"
                  aria-required="true"
                  aria-invalid={errors.symptomsWorseTime ? "true" : "false"}
                  aria-describedby={errors.symptomsWorseTime ? "symptoms-worse-time-error" : undefined}
                  data={[
                    { label: "Early Morning", value: "early_morning" },
                    { label: "Late Morning", value: "late_morning" },
                    { label: "Midday", value: "midday" },
                    { label: "Late Afternoon", value: "late_afternoon" },
                    { label: "Evening", value: "evening" },
                    { label: "Night", value: "night" },
                    { label: "Not Sure", value: "not_sure" },
                  ]}
                  value={field.value || ""}
                  onValueChange={field.onChange}
                />
                {errors.symptomsWorseTime && (
                  <p id="symptoms-worse-time-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.symptomsWorseTime.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Breathing has rhythms — and so does the environment.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Knowing whether mornings, afternoons, or evenings are harder for
                your child lets Satori align environmental intelligence with
                your child's physiological windows, timing alerts around the
                moments when they need it most
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="triggers"
            control={control}
            render={({ field }) => (
              <>
                <MultiSelect
                  label="What usually triggers their breathing symptoms?"
                  labelClassName="text-white!"
                  id="what-usually-triggers-their-breathing-symptoms"
                  multiSelectClassName={`px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base! ${
                    errors.triggers ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                  }`}
                  aria-label="What usually triggers their breathing symptoms?"
                  aria-required="true"
                  aria-invalid={errors.triggers ? "true" : "false"}
                  aria-describedby={errors.triggers ? "triggers-error" : undefined}
                  data={[
                    { label: "Exercise", value: "exercise" },
                    { label: "Cold Air", value: "cold_air" },
                    { label: "Dust", value: "dust" },
                    { label: "Pollen", value: "pollen" },
                    { label: "Mold", value: "mold" },
                    { label: "Pets", value: "pets" },
                    { label: "Smoke", value: "smoke" },
                    { label: "Strong Smells", value: "strong_smells" },
                    { label: "Infections", value: "infections" },
                    { label: "Weather Changes", value: "weather_changes" },
                    { label: "Not Sure", value: "not_sure" },
                  ]}
                  value={field.value || []}
                  onValueChange={field.onChange}
                />
                {errors.triggers && (
                  <p id="triggers-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.triggers.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Every child has unique triggers — knowing them helps Satori
            personalize guidance more precisely.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Satori uses an internal <b>causal model</b> of how pollution,
                weather, allergens, and meteorology interact with specific
                triggers. When Satori understands your child's triggers, it can
                detect the exact environmental patterns that activate them and
                offer targeted, high-impact guidance instead of generic advice.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="symptoms"
            control={control}
            render={({ field }) => (
              <>
                <MultiSelect
                  label="What symptoms do you see when their asthma acts up?"
                  labelClassName="text-white!"
                  id="what-symptoms-do-you-see-when-their-asthma-acts-up"
                  multiSelectClassName={`px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base! ${
                    errors.symptoms ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                  }`}
                  aria-label="What symptoms do you see when their asthma acts up?"
                  aria-required="true"
                  aria-invalid={errors.symptoms ? "true" : "false"}
                  aria-describedby={errors.symptoms ? "symptoms-error" : undefined}
                  data={[
                    { label: "Cough", value: "cough" },
                    { label: "Wheeze", value: "wheeze" },
                    { label: "Shortness of Breath", value: "shortness_of_breath" },
                    { label: "Chest Tightness", value: "chest_tightness" },
                    { label: "Nighttime Cough", value: "nighttime_cough" },
                    { label: "Fast Breathing", value: "fast_breathing" },
                    { label: "Not Sure", value: "not_sure" },
                  ]}
                  value={field.value || []}
                  onValueChange={field.onChange}
                />
                {errors.symptoms && (
                  <p id="symptoms-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.symptoms.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Different symptoms signal different kinds of stress on the lungs.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                A child who coughs at night and a child who wheezes during
                sports often need different environmental guidance. This helps
                Satori tailor its explanations and suggestions so they match
                what you actually observe.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="timeOutdoors"
            control={control}
            render={({ field }) => (
              <>
                <Combobox
                  label="How much time do they spend outdoors?"
                  labelClassName="text-white!"
                  id="how-much-time-do-they-spend-outdoors"
                  comboBoxClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                    errors.timeOutdoors ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                  }`}
                  aria-label="How much time do they spend outdoors?"
                  aria-required="true"
                  aria-invalid={errors.timeOutdoors ? "true" : "false"}
                  aria-describedby={errors.timeOutdoors ? "time-outdoors-error" : undefined}
                  data={[
                    { label: "Mostly Indoors", value: "mostly_indoors" },
                    { label: "Mixed", value: "mixed" },
                    { label: "Outdoors A Lot", value: "mostly_outdoors" },
                  ]}
                  value={field.value || ""}
                  onValueChange={field.onChange}
                />
                {errors.timeOutdoors && (
                  <p id="time-outdoors-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.timeOutdoors.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Outdoor time changes how strongly environmental conditions affect
            your child.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Kids who spend many hours outside are "inside the air" Satori
                interprets, while indoor-heavy routines shift focus to dust,
                humidity, and household triggers. This determines how Satori
                balances outdoor vs. indoor guidance.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="mostActiveTime"
            control={control}
            render={({ field }) => (
              <>
                <Combobox
                  label="When are they usually most active?"
                  labelClassName="text-white!"
                  id="when-are-they-usually-most-active"
                  comboBoxClassName={`px-5! py-4! h-14.25! rounded-2xl! text-base! ${
                    errors.mostActiveTime ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                  }`}
                  aria-label="When are they usually most active?"
                  aria-required="true"
                  aria-invalid={errors.mostActiveTime ? "true" : "false"}
                  aria-describedby={errors.mostActiveTime ? "most-active-time-error" : undefined}
                  data={[
                    { label: "Early Morning", value: "early_morning" },
                    { label: "Late Morning", value: "late_morning" },
                    { label: "Midday", value: "midday" },
                    { label: "Late Afternoon", value: "late_afternoon" },
                    { label: "Evening", value: "evening" },
                    { label: "Night", value: "night" },
                    { label: "Not Sure", value: "not_sure" },
                  ]}
                  value={field.value || ""}
                  onValueChange={field.onChange}
                />
                {errors.mostActiveTime && (
                  <p id="most-active-time-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.mostActiveTime.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Activity increases airflow — and exposure to whatever is in the air.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                If their most intense activity coincides with ozone, cold-dry
                air, or pollution peaks, Satori can recommend small timing
                shifts that reduce stress on their breathing without limiting
                the joy of movement.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <Label id="do-they-play-sports-or-run-hard-regularly" className="text-white!">
          Do they play sports or run hard regularly?
        </Label>
        <Controller
          name="playsSports"
          control={control}
          render={({ field }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                id="do-they-play-sports-or-run-hard-regularly"
                className="flex flex-row gap-3"
                aria-label="Do they play sports or run hard regularly?"
                aria-required="true"
                aria-invalid={errors.playsSports ? "true" : "false"}
              >
                <Label
                  htmlFor="do-they-play-sports-or-run-hard-regularly-yes"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="yes" id="do-they-play-sports-or-run-hard-regularly-yes" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    Yes
                  </span>
                </Label>
                <Label
                  htmlFor="do-they-play-sports-or-run-hard-regularly-no"
                  className="flex items-center gap-2 p-5 w-[171.2px] bg-white rounded-2xl cursor-pointer border-3 border-[#D1D5DB] has-data-[state=checked]:border-primary transition-all"
                >
                  <RadioGroupItem value="no" id="do-they-play-sports-or-run-hard-regularly-no" />
                  <span className="text-radio-text text-lg leading-7 font-normal">
                    No
                  </span>
                </Label>
              </RadioGroup>
              {errors.playsSports && (
                <p id="plays-sports-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                  {errors.playsSports.message}
                </p>
              )}
            </>
          )}
        />
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Exercise affects how environmental conditions interact with
            sensitive lungs.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Sports are wonderful — but exercise plus harsh air can amplify
                irritation. This lets Satori protect your child without asking
                you to remove them from activities they love.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3 w-full">
        <div className="flex-1">
          <Controller
            name="awayFromChild"
            control={control}
            render={({ field }) => (
              <>
                <MultiSelect
                  label="When are you usually away from your child?"
                  labelClassName="text-white!"
                  id="when-are-you-usually-away-from-your-child"
                  multiSelectClassName={`px-5! py-3! h-auto! min-h-14.25! rounded-2xl! text-base! ${
                    errors.awayFromChild ? "border-red-500! focus:border-red-500! focus-visible:border-red-500! focus-visible:ring-red-500!" : ""
                  }`}
                  aria-label="When are you usually away from your child?"
                  aria-required="true"
                  aria-invalid={errors.awayFromChild ? "true" : "false"}
                  aria-describedby={errors.awayFromChild ? "away-from-child-error" : undefined}
                  data={[
                    { label: "Early Morning", value: "early_morning" },
                    { label: "Late Morning", value: "late_morning" },
                    { label: "Midday", value: "midday" },
                    { label: "Late Afternoon", value: "late_afternoon" },
                    { label: "Evening", value: "evening" },
                    { label: "Night", value: "night" },
                    { label: "Not Sure", value: "not_sure" },
                  ]}
                  value={field.value || []}
                  onValueChange={field.onChange}
                />
                {errors.awayFromChild && (
                  <p id="away-from-child-error" className="text-sm text-red-500 mt-1 font-medium" role="alert">
                    {errors.awayFromChild.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <Paragraph className="text-white! text-xs!">
            Many parents worry most when they're not physically present.
          </Paragraph>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row justify-center items-center gap-1.5 cursor-pointer">
                <InfoIcon className="text-white!" />
                <Paragraph className="text-white! text-xs! font-semibold">
                  See why this matters?
                </Paragraph>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white! dark:text-background! text-xs!">
                Knowing when you're typically away lets Satori time its most
                protective guidance around the hours when your child may be more
                exposed — and you're less able to observe them directly. This
                creates a safety net that works even when you can't be there.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </form>
  );
};

export default SignupStepHowTheirBreathingBehavesPage;
