import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSAFSpaces1619718736705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        //onde eu crio a tabela de usuários
        await queryRunner.createTable(
            new Table({
                name:'SAF_Spaces',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'space_id',
                        type: 'uuid',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'area',
                        type: 'real',
                    },
                    {
                        name: 'lines_quantity',
                        type: 'integer',
                    },
                    {
                        name: 'width_line',
                        type: 'real',
                    },
                    {
                        name: 'width_interline',
                        type: 'real',
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
                        name: 'ownerSAFSpace',
                        referencedTableName: 'space',
                        referencedColumnNames: ['id'],
                        columnNames: ['space_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('SAF_Spaces');
    }

}
