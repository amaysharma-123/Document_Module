import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "documents" }) // means this class represent [a database table]. 
export class DocumentEntity {

  //Note:- AppDataSource.initialize() .It collects all classes marked with @Entity.
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  type!: string;

  @Column()
  status!: string;

  @Column()
  active!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

}
