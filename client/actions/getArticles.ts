import { GetAllArticleResponse } from "@/interfaces/Article.interface";
import { emptyArticleListResponse } from "@/lib/emptyresponse";

export async function getArticles(
  query: string,
  page: number,
  sort: "recent" | "oldest" | "views",
  limit: number = 10
): Promise<GetAllArticleResponse> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/blogs/search?query=${query}&page=${page}&sort=${sort}&limit=${limit}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyArticleListResponse;
  }
}
