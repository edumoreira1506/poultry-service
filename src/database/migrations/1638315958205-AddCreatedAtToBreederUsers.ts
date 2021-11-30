import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCreatedAtToBreederUsers1638315958205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('breeder_users', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP(6)'
    }))
  }
            
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('breeder_users', 'created_at')
  }
}
