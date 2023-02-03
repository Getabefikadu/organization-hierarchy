import {
  Controller,
  Post,
  HttpStatus,
  Res,
  Body,
  Get,
  Delete,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { PositionService } from './position.service';
import { IndexParams, TreeParams } from './../../requests';
import { PositionModel } from './models';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async index(
    @Query() query: IndexParams,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.positionService.paginate(query);

    response.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  async show(@Param('id') id: string, @Res() response: Response) {
    const result = await this.positionService.findOrFail(id);

    response.status(HttpStatus.OK).json(result);
  }

  @Get('index/trees')
  async trees(
    @Query() query: TreeParams,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.positionService.findTrees(query.depth);

    response.status(HttpStatus.OK).json(result);
  }

  @Get('index/roots')
  async roots(
    @Query() query: TreeParams,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.positionService.findRoots(query.depth);

    response.status(HttpStatus.OK).json(result);
  }

  @Get('parents/:id')
  async parents(
    @Param('id') id: string,
    @Query() query: TreeParams,
    @Res() response: Response,
  ) {
    const result = await this.positionService.findParents(id, query.depth);

    response.status(HttpStatus.OK).json(result);
  }

  @Get('parents/:id/tree')
  async parentTree(
    @Param('id') id: string,
    @Query() query: TreeParams,
    @Res() response: Response,
  ) {
    const result = await this.positionService.findParentsTree(id, query.depth);

    response.status(HttpStatus.OK).json(result);
  }

  @Get('children/:id')
  async children(
    @Param('id') id: string,
    @Query() query: TreeParams,
    @Res() response: Response,
  ) {
    const result = await this.positionService.findChildren(id, query.depth);

    response.status(HttpStatus.OK).json(result);
  }

  @Get('children/:id/tree')
  async childrenTree(
    @Param('id') id: string,
    @Query() query: TreeParams,
    @Res() response: Response,
  ) {
    const result = await this.positionService.findChildrenTree(id, query.depth);

    response.status(HttpStatus.OK).json(result);
  }

  @Post()
  async store(@Body() position: PositionModel, @Res() response: Response) {
    const result = await this.positionService.create(position);

    response.status(HttpStatus.CREATED).json(result);
  }

  @Post('batch')
  async batchStore(
    @Body('resources') resources: PositionModel[],
    @Res() response: Response,
  ) {
    const result = await this.positionService.createMany(resources);

    response.status(HttpStatus.CREATED).json(result);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() position: PositionModel,
    @Res() response: Response,
  ) {
    const result = await this.positionService.update(id, position);

    response.status(HttpStatus.OK).json(result);
  }

  @Put('/batch/update')
  async batchUpdate(
    @Body('resources') resources: PositionModel[],
    @Res() response: Response,
  ) {
    const result = await this.positionService.updateMany(resources);

    response.status(HttpStatus.OK).json(result);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() response: Response) {
    const result = await this.positionService.delete(id);

    response.status(HttpStatus.OK).json(result);
  }

  @Delete('/batch/delete')
  async batchDestroy(@Body('resources') resources: string[], @Res() response: Response) {
    const result = await this.positionService.deleteMany(resources);

    response.status(HttpStatus.OK).json(result);
  }
}
