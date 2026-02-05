import { IDynamicTableData } from "@/components/common/DynamicTable/types";

export const landingPageHowSatoriComparesSectionTableData: IDynamicTableData = {
  tableData: {
    headerData: [
      { label: "Comparison",},
      { label: "Air Quality Apps" },
      { label: "Weather Apps" },
      { label: "Asthma Care Apps" },
      { label: "Satori" },
    ],
    bodyData: [
      [
        "Purpose",
        "General air awareness for the public.",
        "Daily weather planning (rain, temperature).",
        "Manage asthma after symptoms start.",
        "Predicts environmental danger before symptoms begin — built for children ages 2-12.",
      ],
      [
        "What They Measure",
        "Pollution averages (PM2.5, PM10, ozone).",
        "Temperature, humidity, storms.",
        "Symptoms, inhaler logs, lung function.",
        "Child-sensitive triggers: PM2.5 spikes, ozone peaks, NO2 traffic plumes, nighttime pooling, cold-dry air, humidity drops, weather shifts, smoke drift.",
      ],
      [
        "Timing",
        "24-hour averages; no danger windows.",
        "Weather timing only.",
        "Respond after symptoms appear.",
        "Precise danger windows: AM traffic, afternoon ozone, nighttime pooling, cold-dry mornings, pre-visible smoke.",
      ],
      [
        "Pediatric Science",
        "None (adult thresholds).",
        "None.",
        "Clinical guidance, but not environmental.",
        "Built on pediatric respiratory science: young lungs react earlier, at lower levels, in predictable cycles.",
      ],
      [
        "Guidance & Delivery",
        "General air quality messages in an app.",
        "General weather advice in an app.",
        "Symptom management in an app.",
        "Real-time pediatric steps by SMS — no app, no setup, instant for every caregiver.",
      ],
    ],
  },
  headerClassName: "px-0 sm:py-10 sm:pb-9",
  cellClassName: "px-0",
};
