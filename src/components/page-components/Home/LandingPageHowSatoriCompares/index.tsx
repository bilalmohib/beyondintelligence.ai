import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import DynamicTable from "@/components/common/DynamicTable";
import { landingPageHowSatoriComparesSectionTableData } from "@/components/page-components/Home/LandingPageHowSatoriCompares/data";
import SubscriptionOfferBannerForSignup from "@/components/page-components/Home/LandingPageHowSatoriCompares/SubscriptionOfferBannerForSignup";

const LandingPageHowSatoriCompares = () => {
  return (
    <div className="bg-background-secondary-2 py-12 md:py-18 lg:py-30">
      <Container className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-13.5">
        <Heading2 className="text-white! text-center! leading-13.75! -tracking-[0.92px]!">
          How Satori Compares
        </Heading2>
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-13.5">
          <DynamicTable
            tableData={landingPageHowSatoriComparesSectionTableData.tableData}
            firstColumnAsHeader={true}
            headerClassName={
              landingPageHowSatoriComparesSectionTableData.headerClassName
            }
            cellClassName={
              landingPageHowSatoriComparesSectionTableData.cellClassName
            }
          />
          <SubscriptionOfferBannerForSignup />
        </div>
      </Container>
    </div>
  );
};

export default LandingPageHowSatoriCompares;
