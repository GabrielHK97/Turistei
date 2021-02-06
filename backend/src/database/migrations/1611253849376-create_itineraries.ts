import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createItineraries1611253849376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'itineraries',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'text',
                    type: 'varchar',
                },
                {
                    name:'post_id',
                    type:'integer',
                },
            ],
            foreignKeys: [
                {
                    name: 'ItineraryPost',
                    columnNames: ['post_id'],
                    referencedTableName: 'posts',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('itineraries');
    }

}
