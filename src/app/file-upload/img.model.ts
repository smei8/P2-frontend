import { Byte } from "@angular/compiler/src/util";

export interface FileImage {
    imgId: number,
    imgData: Byte[],
    imgName: string,
    imgType: string,
    req_Id: number
}