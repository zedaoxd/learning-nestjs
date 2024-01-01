import { UUID } from 'crypto';
import { CharacteristicsProductsDTO } from './characteristics-products.dto';
import { SimpleProductsDTO } from './simple-products.dto';

export class FullProductsDTO extends SimpleProductsDTO {
  constructor(
    id: UUID,
    name: string,
    price: number,
    availableQuantity: number,
    description: string,
    category: string,
    userUUID: UUID,
    public readonly characteristics: CharacteristicsProductsDTO[],
  ) {
    super(id, name, price, availableQuantity, description, category, userUUID);
  }
}
