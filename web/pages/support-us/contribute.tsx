import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { getPartnershipsPage } from '@cms/getPartnerships';
import { Seo } from '@components/common';
import { Container, SectionContainer } from '@components/layout';
import { ContributionForm } from '@components/quickLinks/widgets/ContributionForm';
import { Link, PolyButton, Typography } from '@components/ui';
import { defaultSettings } from '@config/preval';
import { cloin } from '@lib/cloin';
import { useStripeJs } from '@lib/stripe';
import S from '@styles/pages/get-involved/Contribute.module.css';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import NextImage from 'next/image';
import { useRouter } from 'next/router';

const { seo } = defaultSettings;

export const getStaticProps = async ({ preview = false }: GetStaticPropsContext) => {
  const data = await getPartnershipsPage(preview);

  return {
    props: {
      data,
    },
  };
};

const Contribute = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { backgroundImage, _createdAt: createdAt, _updatedAt: updatedAt } = data;

  return (
    <>
      <Seo
        canonicalUrl={`${seo.siteUrl}/support-us/contribute`}
        description='A one-click contribution to our $2.19 club is like dropping a quarter in a tip jar! It adds up and matters!'
        pageTitle={`Partnerships | ${seo.siteName}`}
        timeModified={new Date(updatedAt)}
        timePublished={new Date(createdAt)}
      />

      <SectionContainer className={S.root}>
        <Container className={S.container}>
          <div className={S.formPane}>
            <div className={S.sidePane}>
              <div className={S.breadcrumbs}>
                <Typography tag='span' variant='overline'>
                  <Link to='/support-us'>Support Us /</Link>
                </Typography>
                <Typography tag='h1' variant='overline'>
                  Contribute
                </Typography>
              </div>
              <h2 className={S.sidePaneTitle}>Every cent counts.</h2>
              <Typography tag='p' variant='body1'>
                Contributing is like dropping a little something extra in a tip jar to help us
                continue to provide quick, concise, nonpartisan news.
              </Typography>
            </div>

            <div className={S.form}>
              <ContributionForm showForm />
            </div>
          </div>
        </Container>
        <NextImage
          alt={backgroundImage.alt}
          className={S.backgroundImage}
          /* height={backgroundImage.height} */
          layout='fill'
          objectFit='cover'
          src={backgroundImage.src}
          /* width={backgroundImage.width} */
        />
      </SectionContainer>
    </>
  );
};

export default Contribute;
