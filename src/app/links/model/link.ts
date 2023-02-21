import { Category } from "src/app/categories/model/category";

export class Link {
  id!: string;
  slug!: string;
  title!: string;
	favicon!: string;
  original!: string;
  counter!: number;
  created_at!: Date;
  category!: Category
}