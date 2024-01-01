import { UUID } from 'crypto';
import { CharacteristicsProductsEntity } from './products-characteristics.entity';

export class ProductEntity {
  id: UUID;
  name: string;
  price: number;
  availableQuantity: number;
  description: string;
  category: string;
  characteristics: CharacteristicsProductsEntity[];
  userUUID: UUID;
  created: Date;
  updated: Date;
}
