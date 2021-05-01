import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return <main>
    <PageHero title="about" />
    <Wrapper className="page section section-center">
      <img src={aboutImg} alt="about img" />
      <article>
        <div className="title">
          <h2>our story</h2>
          <div className="underline"></div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, laudantium. Possimus magnam ipsum odit sit libero assumenda, facere neque, expedita cum quisquam quia vel nesciunt magni sapiente repudiandae eum ullam ab nulla error in! Ducimus, delectus? Rerum quae totam aut exercitationem quaerat corrupti, aliquam sit labore sequi, eius unde quisquam.</p>
        </div>
      </article>
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
