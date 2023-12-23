// import { EntityRepository, Repository } from 'typeorm';
// import Product from '../entities/Product';

// @EntityRepository(Product)
// export class ProductRepository extends Repository<Product> {
//   public async findByName(name: string): Promise<Product | null> {
//     const product = this.findOne({
//       where: {
//         name,
//       },
//     });
//     return product;
//   }
// }

import { appDataSource } from '@shared/typeorm';
import Product from '../entities/Product';

export const ProductRepository = appDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {

    const product = await this.findOne({
      where: {
        name,
      },
    })
    return product;
  },
})


