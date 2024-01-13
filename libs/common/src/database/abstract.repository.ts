import { AbstractEntity } from '@app/common/database/abstract.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<
  TEntity extends AbstractEntity<TEntity>,
> {
  constructor(
    private readonly entityRepository: Repository<TEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: TEntity): Promise<TEntity> {
    return await this.entityManager.save(entity);
  }

  async findOne(where: FindOptionsWhere<TEntity>): Promise<TEntity> {
    const entity = await this.entityRepository.findOne({ where });
    if (!entity) throw new NotFoundException('Item Not Found');
    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<TEntity>,
    update: QueryDeepPartialEntity<TEntity>,
  ) {
    const entity = await this.entityRepository.update(where, update);
    if (!entity.affected) throw new NotFoundException('Entity Not found');
    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<TEntity>) {
    return await this.entityRepository.find({ where });
  }

  async findOneAndDelete(where: FindOptionsWhere<TEntity>) {
    return await this.entityRepository.delete(where);
  }
}
