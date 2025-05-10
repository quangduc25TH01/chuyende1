import SimilarArticlesPage from "../[components]/SimilarArticlesPage";
import config from "@/config";
import { IArticle, ICategory } from "@/config/entities";
import moment from "moment";
import { notFound } from "next/navigation";
import Link from "next/link";
import { information } from "@/config/data/information";

export const revalidate = 60;

async function getArticles() {
  try {
    const res = await fetch(`${config.apiServerUrl}/api/articles?client=true`, {
      next: { revalidate: 60 },
      cache: "no-cache",
    });

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    return [];
  }
}

async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(`${config.apiServerUrl}/api/articles/${slug}`, {
      next: { revalidate: 60 },
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Tin tức không tồn tại",
      description: "Không tìm thấy tin tức",
    };
  }

  return {
    title: article.title || "Danh mục tin tức",
    description: `Tin tức thuộc ${article.category} của ${information.shopName}`,
    icons: "ly-icon.png",
    // openGraph: {
    //   title: article.title,
    //   description: article.description,
    //   images: [article.thumbnail || "/default-thumbnail.jpg"],
    // },
  };
}

export async function generateStaticParams() {
  const articles: IArticle[] = await getArticles();

  return articles.map((art) => ({
    slug: art.slug.toString(),
  }));
}

const NewsDetail = async ({ params }: { params: { slug: string } }) => {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container">
      <section className="new-detail-container">
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex font-medium">
            <li className="flex items-center text-[15px]">
              <Link href="/" className="text-gray-600 hover:text-main">
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-main">
              <Link href="/tin-tuc" className="text-gray-600 hover:text-main">
                Tin tức
              </Link>
            </li>
          </ol>
        </nav>
        <h2 className="mb-2">{article.title}</h2>

        <div className="text-[16px] mb-4">
          Đã cập nhật ngày {moment(article.createdAt).format("DD-MM-YYYY")} bởi{" "}
          <strong>{information.shopName}</strong>
        </div>

        <div className="flex items-start lg:gap-[30px] gap-4 lg:flex-row flex-col">
          <div className="lg:w-3/4 w-full">
            <article
              className="prose prose-lg max-w-none article-content editor-content"
              dangerouslySetInnerHTML={{ __html: article.content || "" }}
            />
          </div>
        </div>
      </section>

      <SimilarArticlesPage currentArticle={article} />
    </div>
  );
};

export default NewsDetail;
