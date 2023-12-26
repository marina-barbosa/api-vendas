import { appDataSource } from '@shared/typeorm';
import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';

interface InterfaceProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface InterfaceRequest {
  customer: Customer;
  products: InterfaceProduct[];
}

export const ordersRepository = appDataSource.getRepository(Order).extend({

  async findById(id: string): Promise<Order | null> {

    const order = await this.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    },)
    return order;
  },

  async createOrder({ customer, products }: InterfaceRequest): Promise<Order> {

    const order = this.create({
      customer,
      order_products: products,
    })

    await this.save(order);

    return order;
  },
})


