import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCreatedAtToBreederContacts1649120655870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('breeder_contacts', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP(6)'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('breeder_contacts', 'created_at')
  }
}
