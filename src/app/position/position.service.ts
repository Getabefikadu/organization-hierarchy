import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './../../entities';
import { Collection, PaginateOption } from './../../responses';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PositionModel } from './models';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private repository: Repository<Position>,
    private dataSource: DataSource,
  ) {}

  async paginate(options?: PaginateOption): Promise<Collection<Position>> {
    const limit = options.limit || 15;
    const page = options.page || 0;
    const [results, total] = await this.repository.findAndCount({
      take: limit,
      skip: page,
    });

    return new Collection<Position>({
      data: results,
      total: total,
      per_page: limit,
    });
  }

  async all(): Promise<Position[]> {
    return await this.repository.find();
  }

  async find(id: string): Promise<Position | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOrFail(id: string): Promise<Position> {
    return await this.repository.findOneByOrFail({ id });
  }

  async findTrees(depth: number): Promise<Position[]> {
    return await this.dataSource.manager
      .getTreeRepository(Position)
      .findTrees({ depth: depth });
  }

  async findRoots(depth?: number): Promise<Position[]> {
    return await this.dataSource.manager
      .getTreeRepository(Position)
      .findRoots({ depth: depth });
  }

  async findParents(id: string, depth?: number): Promise<Position[]> {
    const child = await this.findOrFail(id);

    return await this.dataSource.manager
      .getTreeRepository(Position)
      .findAncestors(child, { depth: depth });
  }

  async findParentsTree(id: string, depth?: number): Promise<Position> {
    const child = await this.findOrFail(id);

    return await this.dataSource.manager
      .getTreeRepository(Position)
      .findAncestorsTree(child, { depth: depth });
  }

  async findChildren(id: string, depth?: number): Promise<Position[]> {
    const parent = await this.findOrFail(id);

    return await this.dataSource.manager
      .getTreeRepository(Position)
      .findDescendants(parent, { depth: depth });
  }

  async findChildrenTree(id: string, depth?: number): Promise<Position> {
    const parent = await this.findOrFail(id);

    return await this.dataSource.manager
      .getTreeRepository(Position)
      .findDescendantsTree(parent, { depth: depth });
  }

  async create(position: PositionModel): Promise<Position> {
    let parent: Position | null = null;
    if (position.parent) {
      parent = await this.find(position.parent);
    }

    const entity = this.repository.create({
      name: position.name,
      description: position.description,
      parent: parent,
    });

    return await this.repository.save(entity);
  }

  async createMany(positions: PositionModel[]) {
    return await this.dataSource.transaction(
      async (manager: EntityManager): Promise<Position[]> => {
        let entities: Position[] = [];
        for await (const position of positions) {
          let parent: Position | null = null;
          if (position.parent) {
            parent = await this.find(position.parent);
          }

          const entity = new Position();
          (entity.name = position.name),
            (entity.description = position.description),
            (entity.parent = parent);

          await manager.save<Position>(entity);

          entities = [...entities, entity];
        }

        return entities;
      },
    );
  }

  async update(id: string, position: PositionModel): Promise<Position> {
    const entity = await this.findOrFail(id);

    let parent: Position | null = null;
    if (position.parent) {
      parent = await this.find(position.parent);
    }

    entity.name = position.name;
    entity.description = position.description;
    entity.parent = parent;

    return await this.repository.save(entity);
  }

  async updateMany(positions: PositionModel[]): Promise<Position[]> {
    return await this.dataSource.transaction(
      async (manager: EntityManager): Promise<Position[]> => {
        let entities: Position[] = [];
        for await (const [id, position] of Object.entries(positions)) {
          const entity = await this.findOrFail(id);

          let parent: Position | null = null;
          if (position.parent) {
            parent = await this.find(position.parent);
          }

          entity.name = position.name;
          entity.description = position.description;
          entity.parent = parent;

          await manager.save<Position>(entity);

          entities = [...entities, entity];
        }

        return entities;
      },
    );
  }

  async delete(id: string): Promise<Position> {
    const position = await this.findOrFail(id);

    return await this.repository.remove(position);
  }

  async deleteMany(positionIds: string[]): Promise<Position[]> {
    return await this.dataSource.transaction(
      async (manager: EntityManager): Promise<Position[]> => {
        let entities: Position[] = [];
        for await (const id of positionIds) {
          const entity = await this.findOrFail(id);

          await manager.remove<Position>(entity);

          entities = [...entities, entity];
        }

        return entities;
      },
    );
  }
}
