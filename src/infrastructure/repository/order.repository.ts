/* eslint-disable no-shadow */
import Order from '../../domain/entity/order';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';

export default class OrderRepository {
  async create({
    id, customerId, total, items, validate,
  }: Order): Promise<void> {
    await OrderModel.create({
      id,
      customerId,
      total,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    }, {
      include: [{ model: OrderItemModel }],
    });
  }
}
