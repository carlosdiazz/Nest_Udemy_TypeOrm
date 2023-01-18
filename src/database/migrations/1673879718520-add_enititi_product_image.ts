import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEnititiProductImage1673879718520 implements MigrationInterface {
  name = 'addEnititiProductImage1673879718520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, CONSTRAINT "UQ_cadac547ef3d7afbc58c7db3586" UNIQUE ("url"), CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_image"`);
  }
}
