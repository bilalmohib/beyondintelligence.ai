"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Paragraph } from "@/components/common/Typography";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-row items-center gap-3">
        <Paragraph className="text-white text-base! font-normal! leading-6!">
          Dark Mode
        </Paragraph>
        <Switch
          checked={false}
          onCheckedChange={() => {}}
          className="h-[24px] w-[39px] rounded-[27.38px] data-[state=checked]:bg-primary data-[state=unchecked]:bg-white"
          thumbClassName="h-[21px] w-[21px] rounded-full data-[state=checked]:bg-white! data-[state=unchecked]:bg-gray-800! data-[state=checked]:translate-x-[15px] data-[state=unchecked]:translate-x-[1px]"
          aria-label="Toggle dark mode"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-3">
      <Paragraph className="text-white text-base! font-normal! leading-6!">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Paragraph>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-[24px] w-[39px] rounded-[27.38px] data-[state=checked]:bg-primary data-[state=unchecked]:bg-white"
        thumbClassName="h-[21px] w-[21px] rounded-full data-[state=checked]:bg-white! data-[state=unchecked]:bg-gray-800! data-[state=checked]:translate-x-[15px] data-[state=unchecked]:translate-x-[1px]"
        aria-label="Toggle dark mode"
      />
    </div>
  );
};
export default DarkModeToggle;
