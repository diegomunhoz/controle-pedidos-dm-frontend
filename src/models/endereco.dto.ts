import { CidadeDTO } from './cidade.dto';

export interface EnderecoDTO {
  id: string
  logradouro: string
  numero: string
  complemente: string
  bairro: string
  cep: string
  cidade: CidadeDTO
}
