import { Test, TestingModule } from '@nestjs/testing';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { response } from "express";
import { Position } from './../../entities';
import { Collection } from './../../responses';

describe('PositionController', () => {
  let positionController: PositionController;
  let positionService: PositionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [PositionController],
        providers: [PositionService],
      }).compile();

      positionService = moduleRef.get<PositionService>(PositionService);
      positionController = moduleRef.get<PositionController>(PositionController);
  });

  describe('index', () => {
    it('should return an array of positions', async () => {
      const result = [Promise<Collection<Position>>];
      jest.spyOn(positionService, 'paginate').mockImplementation(() => result);

      expect(await positionController.index({ limit: 10, page: 1}, response)).toBe(result);
    });
  });
});
