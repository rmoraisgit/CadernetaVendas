import { HttpHeaders } from "@angular/common/http";

export abstract class BaseService {
    protected UrlServiceV1: string = "https://localhost:5002/api/";

    // protected ObterHeaderJson() {
    //     return {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //         })
    //     };
    // }

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
            })
        };
    }
}