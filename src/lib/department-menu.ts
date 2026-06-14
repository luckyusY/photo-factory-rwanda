import { categories } from "@/lib/catalog";

// The mega-menu is derived from the single source of truth (`categories` in
// catalog.ts). Each subcategory link carries its `sub` slug so the menu can
// deep-link into a filtered category view: /c/{slug}?sub={sub}.

export type DepartmentLink = { label: string; sub: string };

export type DepartmentGroup = {
  title: string;
  links: DepartmentLink[];
};

export type Department = {
  slug: string;
  label: string;
  image: string;
  imageLabel: string;
  groups: DepartmentGroup[];
};

export const departments: Department[] = categories.map((category) => ({
  slug: category.slug,
  label: category.name,
  image: category.image,
  imageLabel: category.name.toUpperCase(),
  groups: [
    {
      title: category.name,
      links: category.subcategories.map((s) => ({ label: s.name, sub: s.slug })),
    },
  ],
}));

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug);
}
