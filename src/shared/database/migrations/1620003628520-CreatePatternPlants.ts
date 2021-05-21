import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePatternPlants1620003628520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name:'pattern_plants',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'plant_name',
                        type: 'varchar',
                    },
                    {
                        name: 'plant_class',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                ],
                foreignKeys:[
                    {
                        name: 'ownerPatternPlantsId',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );

        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('pattern_plants')
            .values([
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Laranja', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Mexerica', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Limão', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Goiaba', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Pêra', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Mamão', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Banana', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Caju', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Acerola', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Caqui', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000000', plant_name: 'Coco', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000001', plant_name: 'Jabuticaba', plant_class: 'Árvore Média', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000002', plant_name: 'Café' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000003', plant_name: 'Cacau' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000004', plant_name: 'Uva' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000005', plant_name: 'Milho' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000006', plant_name: 'Framboesa' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000007', plant_name: 'Amora' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000008', plant_name: 'Maracujá' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000009', plant_name: 'Cajá' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000010', plant_name: 'Carambola' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000020', plant_name: 'Cana de açucar' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000030', plant_name: 'Pêssego' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000040', plant_name: 'Kiwi' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000050', plant_name: 'Maçã' , plant_class: 'Árvore Pequena', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000060', plant_name: 'Alface' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000070', plant_name: 'Couve' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000080', plant_name: 'Salsa' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000090', plant_name: 'Cebolinha' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000100', plant_name: 'Coentro' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000200', plant_name: 'Alho-Poró' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000300', plant_name: 'Brócolis' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000400', plant_name: 'Salsão' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000500', plant_name: 'Hortelã' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000600', plant_name: 'Taioba' , plant_class: 'Hortaliça', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000700', plant_name: 'Jaca' , plant_class: 'Árvore Grande', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000800', plant_name: 'Manga' , plant_class: 'Árvore Grande', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000000900', plant_name: 'Açai' , plant_class: 'Árvore Grande', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000001000', plant_name: 'Abacate' , plant_class: 'Árvore Grande', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000002000', plant_name: 'Trigo' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000003000', plant_name: 'Feijão' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000004000', plant_name: 'Algodão' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000005000', plant_name: 'Aveia' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000006000', plant_name: 'Cevada' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000007000', plant_name: 'Amendoim' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000008000', plant_name: 'Ervilha' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000009000', plant_name: 'Centeio' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000010000', plant_name: 'Soja' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Arroz' , plant_class: 'Grão', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Melância' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Chuchu' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Cebola' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Morango' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Abóbora' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Batata' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Batata-doce' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Cara' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Mandioca' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Melão' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Pepino' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Pimentão' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Cenoura' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Repolho' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Tomate' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
                { id: '00000000-0000-0000-0000-000000020000', plant_name: 'Abacaxi' , plant_class: 'Legumes', user_id: '00000000-0000-0000-0000-000000000000'},
            ])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pattern_plants');
    }

}
