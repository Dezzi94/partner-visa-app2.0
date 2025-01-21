import { generateSEOMetadata } from "@/lib/seo";
import CategoryHeader from "@/components/blog/CategoryHeader";
import BlogList from "@/components/blog/BlogList";
import { getCategoryById, getCategories } from "@/lib/blog";
import { notFound } from "next/navigation";
import { getArticlesByCategoryId } from "@/lib/blog";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ categoryId: category.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ categoryId: string }>;
}) {
  const params = await props.params;
  const category = await getCategoryById(params.categoryId);
  if (!category) return notFound();
  return generateSEOMetadata({
    title: `${category.name} | SwiftVoice Blog`,
    description: `Articles in the ${category.name} category`,
  });
}

export default async function CategoryPage(props: {
  params: Promise<{ categoryId: string }>;
}) {
  const params = await props.params;
  const category = await getCategoryById(params.categoryId);
  if (!category) return notFound();
  const articles = await getArticlesByCategoryId(params.categoryId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <CategoryHeader category={category} />
      {/* @ts-expect-error Server Component */}
      <BlogList articles={articles} />
    </div>
  );
}
