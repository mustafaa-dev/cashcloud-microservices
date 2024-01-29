import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Store } from './entites/store.entity';
import { StoresService } from './stores.service';

@Resolver(() => Store)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation(() => Store)
  createStore(@Args('createStoreInput') input: object) {
    console.log(input);
    return this.storesService.getHello(input);
  }
}
