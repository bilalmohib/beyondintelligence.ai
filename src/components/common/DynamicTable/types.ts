export interface IDynamicTableHeaderData {
    label: string;
    description?: string;
    isGetStartedButton?: boolean;
    className?: string;
    headerTextClassName?: string;
    headerButtonLink?: string;
}

export interface IDynamicTableDataInterface {
    headerData: IDynamicTableHeaderData[];
    bodyData: (string | number | React.ReactNode)[][];
}

export interface IDynamicTableData {
    tableData: IDynamicTableDataInterface;
    headerClassName?: string;
    cellClassName?: string;
    firstColumnAsHeader?: boolean;
    mobileBreakpoint?: number;
    /** When true (default), hides borders and shows small row separator lines instead */
    minimalRowSeparators?: boolean;
}
