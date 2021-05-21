import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpace1619715490408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        //onde eu crio a tabela de usuários
        await queryRunner.createTable(
            new Table({
                name:'space',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'farm_id',
                        type: 'uuid',
                    },
                    {
                        name: 'position_x_general',
                        type: 'varchar',
                    },
                    {
                        name: 'position_y_general',
                        type: 'varchar',
                    },
                    {
                        name: 'type',
                        type: 'integer',
                    },
                    {
                        name: 'figures_quantities',
                        type: 'integer',
                    },
                    {
                        name: 'position_x_specific',
                        type: 'bigint',
                    },
                    {
                        name: 'position_y_specific',
                        type: 'bigint',
                    },
                    {
                        name: 'width',
                        type: 'bigint',
                    },
                    {
                        name: 'length',
                        type: 'bigint',
                    },
                    {
                        name: 'climate',
                        type: 'varchar',
                    },
                    {
                        name: 'water_proximity',
                        type: 'float',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys:[
                    {
                        name: 'ownerSpace',
                        referencedTableName: 'farms',
                        referencedColumnNames: ['id'],
                        columnNames: ['farm_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('space');
    }

}
