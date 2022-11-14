import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function FirstPost({ title, id, date, contentHtml }) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{id} - {title} - {date}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
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