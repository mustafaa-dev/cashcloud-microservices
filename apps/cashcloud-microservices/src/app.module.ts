import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
