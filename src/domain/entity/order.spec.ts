import Order from './order';
import OrderItem from './order_item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', []);
    }).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('123', '', []);
    }).toThrowError('customerId is required');
  });

  it('should throw error when order item is empty', () => {
    expect(() => {
      const order = new Order('123', '123', []);
    }).toThrowError('Items are required');
  });

  it('should calculate total', () => {
    const item = new OrderItem('i1', 'p1', 'Item 1', 100, 2);
    const order = new Order('o1', 'c1', [item]);

    const total = order.total();

    expect(total).toBe(200);

    const item2 = new OrderItem('i2', 'p2', 'Item 2', 200, 2);
    const order2 = new Order('o2', 'c2', [item, item2]);

    const total2 = order2.total();

    expect(total2).toBe(600);
  });

  it('should throw error the item quantity is greater than 0', () => {
    expect(() => {
      const item = new OrderItem('i1', 'p1', 'Item 1', 100, 0);
      const order = new Order('o1', 'c1', [item]);
    }).toThrowError('Quantity must be greater than 0');
  });
});
