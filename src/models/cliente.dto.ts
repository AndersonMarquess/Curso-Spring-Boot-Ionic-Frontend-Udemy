export interface ClienteDTO{
    id : string;
    nome : string;
    email: string;
    // a interrogação define como opcional
    imagePath? : string;
}