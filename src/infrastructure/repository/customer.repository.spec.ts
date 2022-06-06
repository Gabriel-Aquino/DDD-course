import { Sequelize } from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';

describe('Customer repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {
        force: true,
      },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('street 1', 203, '12982', 'Imperatriz')
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('street 1', 203, '12982', 'Imperatriz')
    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName('Customer 2');
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('street 1', 203, '12982', 'Imperatriz')
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find('1');

    expect(customer).toStrictEqual(foundCustomer);
  });

  it('should throws an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find('abcd');
    }).rejects.toThrow('Customer not found');
  });

  it('should find all customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('1', 'Customer 1');
    const address1 = new Address('street 1', 203, '12982', 'Imperatriz')
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer('2', 'Customer 2');
    const address2 = new Address('street 2', 222, '2222222', 'Goiania')
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);
    customer2.activate();

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await CustomerModel.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
})
