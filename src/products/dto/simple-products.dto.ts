import { UUID } from 'crypto';

export class SimpleProductsDTO {
  constructor(
    public readonly id: UUID,
    public readonly name: string,
    public readonly price: number,
    public readonly availableQuantity: number,
    public readonly description: string,
    public readonly category: string,
    public readonly userUUID: UUID,
  ) {}
}
