import { MigrationInterface, QueryRunner } from 'typeorm';

export class elimeColumn1673464923384 implements MigrationInterface {
  name = 'elimeColumn1673464923384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "prueba"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "prueba" character varying NOT NULL`,
    );
  }
}
