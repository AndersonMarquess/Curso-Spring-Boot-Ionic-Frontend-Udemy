import { CidadeDTO } from "./cidade.dto";
import { Injectable } from "@angular/core";

export interface EnderecoDTO {
    id : string;
    logradouro : string;
    numero : string;
    complemento : string;
    bairro : string;
    cep : string;
    cidade : CidadeDTO;
}