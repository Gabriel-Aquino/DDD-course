/* eslint-disable no-shadow */
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerRepositoryInterface from '../../domain/repository/customer-repository.interface';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create({
    id, name, Address, active, rewardPoints,
  }: Customer): Promise<void> {
    await CustomerModel.create({
      id,
      name,
      street: Address.street,
      number: Address.number,
      zip: Address.zip,
      city: Address.city,
      active,
      rewardPoints,
    });
  }

  async update({
    id, name, Address, active, rewardPoints,
  }: Customer): Promise<void> {
    await CustomerModel.update({
      id,
      name,
      street: Address.street,
      number: Address.number,
      zip: Address.zip,
      city: Address.city,
      active,
      rewardPoints,
    }, {
      where: {
        id,
      },
    })
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      })
    } catch (error) {
      throw new Error('Customer not found');
    }
    const customer = new Customer(id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city,
    );

    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    const customers = customerModels.map((customerModels): Customer => {
      const customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zip,
        customerModels.city,
      );
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate()
      }
      return customer;
    });

    return customers;
  }
}
