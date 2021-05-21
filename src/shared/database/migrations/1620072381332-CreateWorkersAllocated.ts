import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateWorkersAllocated1620072381332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        //onde eu crio a tabela de usuários
        await queryRunner.createTable(
            new Table({
                name:'workers_allocated',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'task_id',
                        type: 'uuid',
                    },
                    {
                        name: 'worker_id',
                        type: 'uuid',
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
                        name: 'taskExecuted',
                        referencedTableName: 'task',
                        referencedColumnNames: ['id'],
                        columnNames: ['task_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'executeTask',
                        referencedTableName: 'workers',
                        referencedColumnNames: ['id'],
                        columnNames: ['worker_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('workers_allocated');
    }

}
