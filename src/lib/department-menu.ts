import {
  categories,
  categoryOptionsFrom,
  getCategory,
  type Product,
} from "@/lib/catalog";

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

export function departmentsFromProducts(products: Product[]): Department[] {
  const { categories: options, subByCategory } = categoryOptionsFrom(products);

  return options.map((option) => {
    const curated = getCategory(option.slug);
    const categoryProducts = products.filter(
      (product) => product.category === option.slug,
    );
    const links = subByCategory[option.slug] ?? [];

    return {
      slug: option.slug,
      label: option.name,
      image: curated?.image ?? categoryProducts[0]?.images[0] ?? "/logo.png",
      imageLabel: option.name.toUpperCase(),
      groups: [
        {
          title: option.name,
          links: links.map((subcategory) => ({
            label: subcategory.name,
            sub: subcategory.slug,
          })),
        },
      ],
    };
  });
}

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug);
}
