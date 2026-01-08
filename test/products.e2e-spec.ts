import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let createdProductId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (POST) - should create a product', async () => {
    const productData = {
      name: 'Test Smartphone',
      category: 'Electronics',
      quantityInStock: 50,
      price: 999.99,
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(productData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(productData.name);
    createdProductId = response.body.id;
  });

  it('/products (GET) - should return all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/products/:idOrName (GET) - should find product by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(200);

    expect(response.body.id).toBe(createdProductId);
    expect(response.body.name).toBe('Test Smartphone');
  });

  it('/products/:idOrName (GET) - should find product by Name', async () => {
    const response = await request(app.getHttpServer())
      .get('/products/Test%20Smartphone')
      .expect(200);

    const product = Array.isArray(response.body)
      ? response.body[0]
      : response.body;
    expect(product.name).toBe('Test Smartphone');
  });

  it('/products/:id (PATCH) - should update a product', async () => {
    const updateData = { price: 899.99 };
    const response = await request(app.getHttpServer())
      .patch(`/products/${createdProductId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.price).toBe(updateData.price);
  });

  it('/products/:id (DELETE) - should delete a product', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${createdProductId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/products/${createdProductId}`)
      .expect(404);
  });
});
