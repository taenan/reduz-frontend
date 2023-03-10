import { Category } from "src/app/categories/model/category";

export class Link {
  id!: number;
  slug!: string;
  title!: string;
	favicon!: string;
  original!: string;
  counter!: number;
  createdAt!: Date;
  category!: Category
}