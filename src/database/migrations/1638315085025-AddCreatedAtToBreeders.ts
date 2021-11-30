import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCreatedAtToBreeders1638315085025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('breeders', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP(6)'
    }))
  }
            
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('breeders', 'created_at')
  }
}
