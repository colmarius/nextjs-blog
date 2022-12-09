import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';


export default function Posts({ title, date, contentHtml }) {
  if (!title) return null;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}

export function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: postData
  }
}