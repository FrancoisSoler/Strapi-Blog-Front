import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import Image from "next/image"
const Article = ({ article, categories, author }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)
  console.log("articles", article.attributes)
  const filteredAuthor = author.data.find(
    (x) => x.id === article.attributes.author.data.id
  )
  console.log("writers", filteredAuthor.attributes)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown children={article.attributes.content} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {/* {filteredAuthor.data && ( */}
              <img
                image={
                  "http://localhost:3000"+filteredAuthor.attributes.picture.data.attributes.formats
                  .medium.url
                }
                width="100"
                height="100"
                placeholder="blur"
                src={
                  "http://localhost:1337"+filteredAuthor.attributes.picture.data.attributes.formats
                  .medium.url
                }
              />
              {/*    )} */}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom text-3xl text-purple-5">
                By {article.attributes.author.data.attributes.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top uk-container">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  console.log("hey")
  const writersRes = await fetchAPI("/writers", {
    filters: {
      id: articlesRes.data[0].author,
    },
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories")

  return {
    props: {
      article: articlesRes.data[0],
      categories: categoriesRes,
      author: writersRes,
    },
    revalidate: 1,
  }
}

export default Article
