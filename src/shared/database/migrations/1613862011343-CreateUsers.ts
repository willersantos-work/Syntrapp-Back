import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1613862011343 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        //onde eu crio a tabela de usuários
        await queryRunner.createTable(
            new Table({
                name:'users',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'CPF',
                        type: 'varchar',
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
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
            })
        );

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('users')
            .values([
                { id: '00000000-0000-0000-0000-000000000000', name: 'Basic', email: 'Basic@Basic.com', password: '12345678', CPF: '00000000000', phone_number:'00999999999'},
            ])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //onde eu deleto a tabela de usuários
        await queryRunner.dropTable('users');
    }
}

//service trata da lógica de programção
//controller faz as regras de negócios e controla o fluxo de entradas e saídas
