export enum SortType {
    DATE_UPDATED = 'DATE_UPDATED',
    //too be expanded on in the feature
}

export enum SortDirection {
    DESC = 'DESC',
    ASC = 'ASC',
}

export interface SortOptions {
    id: number;
    sortColumn: SortType;
    sortDirection: SortDirection;
    displayText: string;
}
