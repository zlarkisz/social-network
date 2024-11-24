import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Post } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
