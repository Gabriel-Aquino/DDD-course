import Product from './product';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100);
    }).toThrowError('Id is required');
  });

  it('should throw error when Name is empty', () => {
    expect(() => {
      const product = new Product('123', '', 100);
    }).toThrowError('Name is required');
  });

  it('should throw error when Price is less than zero', () => {
    expect(() => {
      const product = new Product('123', 'Product 01', -1);
    }).toThrowError('Price is required');
  });

  it('should change name', () => {
    const product = new Product('123', 'Product 01', 100);
    product.changeName('Name 2');
    expect(product.name).toBe('Name 2');
  });

  it('should change price', () => {
    const product = new Product('123', 'Product 01', 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
