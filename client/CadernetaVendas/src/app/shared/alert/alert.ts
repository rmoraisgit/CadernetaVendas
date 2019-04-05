export class Alert {
    constructor(
        readonly alertType: AlertType,
        readonly message: string
    ){}
}

export enum AlertType {
    SUCCESS,
    WARNNING,
    DANGER,
    INFO
}