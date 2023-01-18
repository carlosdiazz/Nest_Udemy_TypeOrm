import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntitiUserDefault1674049707054 implements MigrationInterface {
  name = 'addEntitiUserDefault1674049707054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT '{user}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`,
    );
  }
}
