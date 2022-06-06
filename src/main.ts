import Address from './domain/entity/address';
import Customer from './domain/entity/customer';
import Order from './domain/entity/order';
import OrderItem from './domain/entity/order_item';

const customer = new Customer('123', 'Aquino');
const address = new Address('Rua Tamoios', 39, '65911324', 'Imperatriz');
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem('1', 'p1', 'Item 1', 100, 2);
const item2 = new OrderItem('2', 'p2', 'Item 2', 200, 2);
const order = new Order('1', '123', [item1, item2]);
