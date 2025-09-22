export type ColumnType = 'text' | 'date' | 'currency' | 'status';

export interface TableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    type?: ColumnType;
}

export interface Representative {
    name: string;
    image: string;
}

export interface Country {
    name: string;
    code: string;
}

export interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string;        // หรือจะเปลี่ยนเป็น Date ก็ได้
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
}

export interface TableAction {
    label: string;
    icon: string;
    command: (row: any) => void;
}
