import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import React, { useState } from "react";
import {
  BuilderComponent,
  builder,
  useIsPreviewing,
  Builder,
} from "@builder.io/react";
import Image from "next/future/image";

import Modal from "react-modal";

import Header from "/components/header";
import Loader from "/components/atoms/Loader";

import Container from "/components/atoms/Container";
import ButtonRow from "/components/molecules/ButtonRow";
import Button from "/components/atoms/Button";
import StackItem from "/components/molecules/StackItem";

import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { SideBar } from "../../components/sections/SideBar";
import { LogRegModal } from "../../components/sections/LogRegModal";
import Link from "next/link";
import getUrl from "../../lib/baseUrl";

// Initialize the Builder SDK with your organization's API Key
// Find the API Key on: https://builder.io/account/settings
builder.init("91ef722532bb4940b783c33d6d8d9c47");

export async function getStaticProps({ params }) {
  // Fetch the first page from Builder that matches the current URL.
  // Use the `userAttributes` field for targeting content.
  // For more, see https://www.builder.io/c/docs/targeting-with-builder
  const experience = await builder
    .get("experience", {
      userAttributes: {
        urlPath: "/experiences/" + (params?.experience || ""),
      },
      includeRefs: true,
    })
    .toPromise();

  const nav = await builder
    .get("navigation", {
      query: {
        id: "f8841974e4874e3ba862431f52432f6a",
      },
    })
    .toPromise();

  const footer = await builder
    .get("footer", {
      includeRefs: true,
      noTraverse: false,
    })
    .toPromise();

  const getStarted = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/get-started",
      },
      includeRefs: true,
    })
    .toPromise();

  return {
    props: {
      experience: experience || null,
      nav: nav || null,
      footer: footer || null,
      getStarted: getStarted || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  //  Fetch all published pages for the current model.
  //  Using the `fields` option will limit the size of the response
  //  and only return the `data.url` field from the matching pages.
  const experiences = await builder.getAll("experience", {
    fields: "data.url", // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: experiences.map((experience) => `${experience.data?.url}`),
    fallback: true,
  };
}

Modal.setAppElement("#__next");

export default function Experience({ experience, nav, footer, getStarted }) {
  const router = useRouter();
  //  This flag indicates if you are viewing the page in the Builder editor.
  const isPreviewing = useIsPreviewing();
  const [sidebar, setSidebar] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // const logout = async () => {
  //   const response = await fetch(getUrl(process.env.NEXT_PUBLIC_LOGOUT));
  //   const data = await response.json();
  //   console.log(data);
  //   router.reload();
  // };

  if (router.isFallback) {
    return <Loader />;
  }

  //  Add your error page here to return if there are no matching
  //  content entries published in Builder.
  if (!experience && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const closeModal = (e) => {
    e.preventDefault();
    router.push(page.data.url, undefined, { scroll: false });
  };
  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{`${experience?.data.title} | Formation`}</title>
        <meta name="description" content={experience?.data.descripton} />
      </Head>

      <Header nav={nav} />

      <Modal
        isOpen={!!router.query.getStarted}
        className="getStartedModal"
        overlayClassName="getStartedOverlay"
        closeTimeoutMS={300}
      >
        <div className="getStartedModal__header">
          <div className="modal__close" onClick={closeModal}></div>
        </div>
        <BuilderComponent
          model="page"
          content={getStarted}
          options={{ includeRefs: true }}
        />
      </Modal>

      <section className="experience">
        <LogRegModal loginModal={loginModal} setLoginModal={setLoginModal} />
        <SideBar
          preselectedName={experience.name}
          sidebar={sidebar}
          setSidebar={setSidebar}
        />
        <div className="experience__underlay">
          <div className="experience__image-wrap">
            {experience.data.image && (
              <Image
                className="experience__image"
                src={experience.data.image}
                alt=""
                fill
              />
            )}
          </div>
        </div>
        <div className="experience__content component component--spc-t-standard component--spc-b-standard">
          <Container size="wide">
            <div className="experience__content-positioner">
              <div className="experience__content-wrap">
                <ButtonRow
                  style={{
                    marginBottom: "25px",
                  }}
                >
                  <Button type="back" url="/experiences/" color="yellow">
                    Back to Experiences
                  </Button>
                </ButtonRow>
                <h1 className="experience__title">{experience.name}</h1>
                <div
                  className="experience__description margin-fix"
                  dangerouslySetInnerHTML={{ __html: experience.data.content }}
                />
                {experience.data.stack &&
                  experience.data.experiences?.length && (
                    <div className="experience__stack">
                      <h2 className="experience__stack-heading">
                        What’s Included:
                      </h2>
                      <div className="experience__stack-list">
                        {experience.data.experiences.map((item, index) => (
                          <StackItem key={index} item={item.experience} />
                        ))}
                      </div>
                    </div>
                  )}
                {(experience.data.duration || experience.data.price) && (
                  <div className="experience__meta">
                    {experience.data.duration && (
                      <span className="experience__meta-item experience__duration">
                        {experience.data.duration}
                      </span>
                    )}
                    {experience.data.price && (
                      <span className="experience__meta-item experience__price">
                        {experience.data.price}
                      </span>
                    )}
                  </div>
                )}
                <ButtonRow
                  style={{
                    marginTop: 60,
                  }}
                >
                  <Button
                    type="filled"
                    color="yellow"
                    onClick={() => setSidebar(true)}
                    target="_blank"
                  >
                    Book Now
                  </Button>
                  <Button onClick={() => setLoginModal(true)}>Login</Button>
                  {/* <Button onClick={logout}>Logout</Button> */}
                  <Link href="/personal">Personal Cabinet</Link>
                </ButtonRow>
                <ButtonRow
                  style={{
                    marginTop: 40,
                  }}
                >
                  <Button
                    type="underlined"
                    color="white"
                    url="/memberships/"
                    icon={solid("chevron-right")}
                  >
                    Learn about our memberships
                  </Button>
                </ButtonRow>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <BuilderComponent
        model="footer"
        content={footer}
        options={{
          includeRefs: true,
          noTraverse: false,
        }}
      />
    </>
  );
}
