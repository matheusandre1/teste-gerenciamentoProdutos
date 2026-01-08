import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
    let service: ProductsService;
    let repository: ProductsRepository;

    const mockRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        findByName: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ProductsRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        repository = module.get<ProductsRepository>(ProductsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createProduct', () => {
        it('should create a product', async () => {
            const dto = { name: 'Test', category: 'Cat', quantityInStock: 1, price: 10 };
            mockRepository.create.mockResolvedValue(dto);

            const result = await service.createProduct(dto as any);
            expect(result).toEqual(dto);
            expect(mockRepository.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findOne', () => {
        it('should find by id if valid mongo id', async () => {
            const id = '659c1b8f1f1f1f1f1f1f1f1f';
            const product = { name: 'Test' };
            mockRepository.findById.mockResolvedValue(product);

            const result = await service.findOne(id);
            expect(result).toEqual(product);
            expect(mockRepository.findById).toHaveBeenCalledWith(id);
        });

        it('should find by name if not mongo id', async () => {
            const name = 'Test';
            const products = [{ name: 'Test' }];
            mockRepository.findByName.mockResolvedValue(products);

            const result = await service.findOne(name);
            expect(result).toEqual(products[0]);
        });

        it('should throw NotFoundException if no product found', async () => {
            mockRepository.findByName.mockResolvedValue([]);
            await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
        });
    });
});
