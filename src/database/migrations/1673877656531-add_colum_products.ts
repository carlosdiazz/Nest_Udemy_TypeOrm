import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumProducts1673877656531 implements MigrationInterface {
  name = 'addColumProducts1673877656531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "tags" character varying array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
  }
}
