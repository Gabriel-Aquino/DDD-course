import Address from './address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'Aquino');
    }).toThrowError('Id is required');
  });

  it('should throw error when Name is empty', () => {
    expect(() => {
      const customer = new Customer('1', '');
    }).toThrowError('Name is required');
  });

  it('should changes customer name', () => {
    const customer = new Customer('123', 'Aquino');
    customer.changeName('Gabriel');
    expect(customer.name).toBe('Gabriel');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'Aquino');
    const address = new Address('Rua 1', 123, '192949', 'Imperatriz');
    customer.changeAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'Aquino');
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined when activate a customer', () => {
    expect(() => {
      const customer = new Customer('123', 'Aquino');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add rewardPoints', () => {
    const customer = new Customer('id', 'Aquino');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
