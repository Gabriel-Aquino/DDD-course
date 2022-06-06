import Product from '../../domain/entity/product';
import ProductRepositoryInterface from '../../domain/repository/product-repository.interface';
import ProductModel from '../db/sequelize/model/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
  async create({ id, name, price }: Product): Promise<void> {
    await ProductModel.create({
      id,
      name,
      price,
    });
  }

  async update({ id, name, price }: Product): Promise<void> {
    await ProductModel.update({
      name,
      price,
    }, {
      where: {
        id,
      },
    })
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } })
    return new Product(productModel.id, productModel.name, productModel.price)
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((productModel): Product => {
      const products = new Product(productModel.id, productModel.name, productModel.price);
      return products;
    })
  }
}
