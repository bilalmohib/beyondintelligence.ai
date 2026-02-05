"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/utils/detect-dimensions";
import { Heading5, Paragraph } from "@/components/common/Typography";
import { IDynamicTableData } from "@/components/common/DynamicTable/types";

interface IDynamicTableProps extends IDynamicTableData {
  className?: string;
}

const DynamicTable = ({
  tableData,
  className = "",
  headerClassName = "",
  cellClassName = "",
  firstColumnAsHeader = false,
  mobileBreakpoint = 768,
  minimalRowSeparators = true,
}: IDynamicTableProps) => {
  const { headerData, bodyData } = tableData;

  const { width } = useWindowSize();

  const [currentSelectedItemId, setCurrentSelectedItemId] = useState<
    string | null
  >(null);

  const [selectedColumnIndex, setSelectedColumnIndex] = useState(1);

  const isMobileView = (width ?? 1024) < mobileBreakpoint;

  // Mobile view: 2-column layout with column switcher
  if (isMobileView) {
    const dataColumns = headerData.filter((_, index) =>
      firstColumnAsHeader ? index > 0 : true
    );
    const startIndex = firstColumnAsHeader ? 1 : 0;

    return (
      <div
        className={`block bg-transparent rounded-none md:rounded-xl overflow-hidden w-full ${className}`}
      >
        {/* Column Switcher */}
        <div
          className={cn(
            "flex gap-2 pb-4 flex-wrap",
            !minimalRowSeparators && "border-b border-[#BEBEBE]"
          )}
        >
          {dataColumns.map((header, idx) => {
            const columnIndex = startIndex + idx;
            const isSelected = selectedColumnIndex === columnIndex;

            return (
              <Button
                key={columnIndex}
                onClick={() => {
                  setSelectedColumnIndex(columnIndex);
                }}
                className={cn(
                  "px-3 sssmd:px-4 py-2 rounded-md font-inter text-sm font-medium transition-colors",
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-transparent text-white border border-[#BEBEBE] border-solid"
                )}
              >
                {header.label}
              </Button>
            );
          })}
        </div>

        {/* Two-Column Table */}
        <table
          className="w-full table-fixed border-separate -ml-5"
          style={{ borderSpacing: "20px 0", width: "calc(100% + 20px)" }}
        >
          <thead className="bg-transparent">
            <tr>
              <th
                className={cn(
                  "py-4 text-left pl-0 pr-0 w-[50%]",
                  !minimalRowSeparators && "border border-[#BEBEBE]",
                  headerClassName
                )}
              >
                <Heading5 className="w-fit! font-inter text-xl font-bold leading-7 tracking-[-0.4px] text-primary text-left whitespace-nowrap">
                  {headerData[0]?.label}
                </Heading5>
              </th>
              <th
                className={cn(
                  "py-4 text-left pl-0 pr-0 w-[65%]",
                  !minimalRowSeparators && "border border-[#BEBEBE]",
                  headerClassName,
                  headerData[selectedColumnIndex]?.className || ""
                )}
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <Heading5
                      className={cn(
                        "font-inter text-xl font-bold leading-7 tracking-[-0.4px] text-primary text-left",
                        headerData[selectedColumnIndex]?.headerTextClassName
                      )}
                    >
                      {headerData[selectedColumnIndex]?.label}
                    </Heading5>
                    {headerData[selectedColumnIndex]?.description && (
                      <Paragraph className="w-fit! leading-[100%] tracking-[0%] text-left text-[15px]! text-[#505050]!">
                        {headerData[selectedColumnIndex].description}
                      </Paragraph>
                    )}
                  </div>
                  {headerData[selectedColumnIndex]?.isGetStartedButton && (
                    <Button
                      variant="default"
                      className={cn(
                        "border border-[#1D1D1D] border-solid hover:border-primary bg-transparent hover:bg-primary hover:text-white w-fit ssmd:w-37.25 h-8 ssmd:h-10.25 rounded-[5px] font-bold text-sm ssmd:text-base font-inter text-center text-white",
                        currentSelectedItemId ===
                          headerData[selectedColumnIndex].label &&
                          "border-primary bg-primary text-white"
                      )}
                      onClick={() => {
                        setCurrentSelectedItemId(
                          headerData[selectedColumnIndex].label
                        );
                      }}
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {bodyData.map((row, rowIndex) => {
              const rowLabel = firstColumnAsHeader
                ? row[0]
                : headerData[0]?.label || "";
              const cellValue = row[selectedColumnIndex];

              const showRowSeparator =
                minimalRowSeparators && rowIndex < bodyData.length - 1;

              return (
                <tr key={rowIndex} className="bg-transparent">
                  <td
                    className={cn(
                      "py-[50px] align-top pl-0 pr-0",
                      !minimalRowSeparators && "border border-[#BEBEBE]",
                      showRowSeparator && "border-b border-[#7C81E8]/50",
                      cellClassName
                    )}
                  >
                    <Paragraph className="text-white! leading-7! text-lg! font-bold">
                      {rowLabel}
                    </Paragraph>
                  </td>
                  <td
                    className={cn(
                      "py-[50px] align-top pl-0 pr-0",
                      !minimalRowSeparators && "border border-[#BEBEBE]",
                      showRowSeparator && "border-b border-[#7C81E8]/50",
                      cellClassName
                    )}
                  >
                    {cellValue === "TICK" ? (
                      <div className="w-5 h-5 bg-tickGreen rounded-full flex items-center justify-center">
                        <CheckIcon className="size-3.5 text-white" />
                      </div>
                    ) : (
                      <Paragraph
                        className="text-white! leading-7! text-lg!"
                        dangerouslySetInnerHTML={{
                          __html: cellValue as string,
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Desktop view: Full table
  return (
    <div
      className={cn(
        "block bg-transparent rounded-xl overflow-hidden w-full",
        !minimalRowSeparators && "border border-[#BEBEBE]",
        className
      )}
    >
      <table
        className="w-full table-auto border-separate"
        style={{ borderSpacing: "40px 0" }}
      >
        <thead className="bg-transparent">
          <tr>
            {headerData.map((header, index) => (
              <th
                key={index}
                className={cn(
                  "px-5 py-4 sm:py-10 text-left",
                  !minimalRowSeparators && "border border-[#BEBEBE]",
                  headerClassName,
                  header.className
                )}
              >
                <div className="flex flex-col items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <Heading5
                      className={cn(
                        "w-fit! font-inter text-xl font-bold leading-7 tracking-[-0.4px] text-primary text-left whitespace-nowrap",
                        header.headerTextClassName
                      )}
                    >
                      {header.label}
                    </Heading5>
                    {header.description && (
                      <Paragraph className="w-fit! leading-[100%] tracking-[0%] text-left text-[15px]! sm:text-base! text-[#505050]!">
                        {header.description}
                      </Paragraph>
                    )}
                  </div>
                  {header.isGetStartedButton && (
                    <Button
                      variant="default"
                      className={cn(
                        "border border-[#1D1D1D] border-solid hover:border-primary bg-transparent hover:bg-primary hover:text-white w-37.25 h-10.25 rounded-[5px] font-bold text-base font-inter text-center text-white",
                        currentSelectedItemId === header.label &&
                          "border-primary bg-primary text-white"
                      )}
                      onClick={() => {
                        setCurrentSelectedItemId(header.label);
                        if (header.headerButtonLink) {
                          window.open(header.headerButtonLink, "_blank");
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyData.map((row, rowIndex) => {
            const showRowSeparator =
              minimalRowSeparators && rowIndex < bodyData.length - 1;

            return (
              <tr key={rowIndex} className="bg-transparent">
                {row.map((cell, cellIndex) => {
                  const isFirstColumn = cellIndex === 0;
                  const cellContent =
                    firstColumnAsHeader && isFirstColumn ? (
                      <Paragraph className="text-white! leading-7! text-lg! whitespace-nowrap font-bold">
                        {cell}
                      </Paragraph>
                    ) : (
                      <Paragraph
                        className="text-white! leading-7! text-lg!"
                        dangerouslySetInnerHTML={{ __html: cell as string }}
                      />
                    );

                  return (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-5 py-12.5 align-top",
                        !minimalRowSeparators && "border border-[#BEBEBE]",
                        showRowSeparator && "border-b border-[#7C81E8]/50",
                        cellClassName
                      )}
                    >
                      {cell === "TICK" ? (
                        <div className="w-5 h-5 sm:w-6.5 sm:h-6.5 bg-tickGreen rounded-full flex items-center justify-center">
                          <CheckIcon className="size-3.5 text-white" />
                        </div>
                      ) : (
                        cellContent
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default DynamicTable;
