import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Post } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ nullable: true })
  token: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
