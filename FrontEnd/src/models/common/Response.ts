export interface AxiosResponseMessage {
    data: BasicResponse;
}

export interface BasicResponse {
    message: string;
    status?: string;
}
