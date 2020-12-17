import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { loadData, updateData } from '../lib/firebase/api';
import { history } from '../lib/helpers/history';
import GrassBackground from '../components/common/GrassBackground';
import CloudBackground from '../components/common/CloudBackground';
import ResultContainer from '../containers/result/ResultContainer';
import RightTree from '../components/common/RightTree';
import LeftTree from '../components/common/LeftTree';
import grassImg from '../../public/img/ground.png';
import cloudImg from '../../public/img/cloud.png';
import useUpdateCount from '../lib/hooks/useUpdateCount';
import media from '../lib/styles/media';
import { results } from '../lib/util/util';

const ResultWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: #436943;
  @media (min-width: ${media.laptopM}) {
    overflow: hidden;
  }
  @media (max-width: ${media.laptopM}) {
    overflow-x: hidden;
  }
`;

const BackgroundColor = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #c5f1fc;
`;

const BackgroundDark = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  position: absolute;
  background-color: black;
  opacity: 0.5;
  z-index: 99;
  top: 0;
`;

const Result = () => {
  const { type } = useParams();
  const { pathname, state } = useLocation();
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useUpdateCount({
    type,
    result: state?.result,
    update: updateData,
    load: loadData,
  });

  useEffect(() => {
    history.replace(pathname, { state: null });
  }, []);

  return (
    <>
      <Helmet>
        <script src="https://developers.kakao.com/sdk/js/kakao.js" />
      </Helmet>
      <ResultWrapper ref={ref}>
        <ResultContainer />
        <BackgroundDark />
        <RightTree />
        <LeftTree />
        <CloudBackground
          role="img"
          ariaLabel="clouds background"
          img={cloudImg}
          style={{ opacity: '0.6' }}
        />
        <GrassBackground
          role="img"
          ariaLabel="grass background"
          img={grassImg}
          style={{ opacity: '0.6' }}
        />
        <BackgroundColor />
      </ResultWrapper>
    </>
  );
};

export default Result;
