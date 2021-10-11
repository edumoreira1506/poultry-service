import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddMainVideoToBreeders1633956152455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('breeders', new TableColumn({
      name: 'main_video',
      type: 'varchar',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('breeders', 'main_video')
  }
}
