import { MigrationInterface, QueryRunner } from 'typeorm';

export class agregueRelacionDeProductsProductImage1673881304520
  implements MigrationInterface
{
  name = 'agregueRelacionDeProductsProductImage1673881304520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_image" ADD "product_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" ADD CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_image" DROP CONSTRAINT "FK_dbc7d9aa7ed42c9141b968a9ed3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_image" DROP COLUMN "product_id"`,
    );
  }
}
