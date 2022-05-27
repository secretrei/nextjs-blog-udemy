import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/Layout';

import Link from 'next/Link';
import utilStyles from '../styles/utils.module.css';
import { getPostsData } from '../lib/post';

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>私はフルスタックエンジニアです</p>
      </section>

      <section>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  alt=""
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText} href="">
                  {title}
                </a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>${date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
