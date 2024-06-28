import {Column, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';


export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
  @Column('datetime', {
    name: 'create_at',
    comment: '创建时间',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @UpdateDateColumn( {
    name: 'update_at',
    comment: '修改时间',

  })
  updateAt: Date;
  @DeleteDateColumn( {
    name: 'delete_at',
    comment: '修改时间',
  })
  deleteAt: Date;
}

export class BaseWithFullEntity extends BaseEntity {
  @Column('tinyint', {
    comment: '1(正常)0（禁用）',
    width: 1,
    default: 1
  })
  status:  number;
}

export class BaseWithIdEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
}
