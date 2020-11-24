import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import {Context} from '../../lib/helpers/Context';
import media from '../../lib/styles/media';


const ContentBtnBox = styled.div`
  position: relative;
`;
const ContentBtnButton = styled.button`
  @media (max-width: ${media.mobileL}) {
    font-size: 14px;
  };
  display: block;
  margin: 20px auto;
  width: 100%;
  height: 65px;
  font-family: 'jua';
  font-size: 16px;
  word-break: keep-all;
  white-space: break-spaces;
  line-height: normal;
  background: none;
  border: 1px solid #FF9C9C;
  border-radius: 25px;
  cursor: pointer;
  &:hover{
    color:white;
    background-color: #FF9C9C;
  };
  &:focus{
      outline-style:none;
  }
  @media (max-width: ${media.tablet}) {
    &:focus{
      color:black;
      background-color:white;
    }
  }
  &:active{
    border: 2px solid #fc7676;
  }
  -webkit-tap-highlight-color:transparent;
`;

const ContentBtnContainer = ({nextSlide, data, count, history}) => {
    const {state, dispatch } = useContext(Context);
  
    const classifySelection = (id, selection)=>{
      if(selection=="A"){
        dispatch(id);
      }else{
        console.log("B 선택");
      }
      console.log(state);
    }
    const goToResult = ()=>{
      if(count === 15){
        history.push('/result');
        return;
      }
    }
    const clickSelection = useCallback((id, selection)=>{
      classifySelection(id,selection);
      goToResult();
      nextSlide();
    });
  
    return (
    <ContentBtnBox>
      <ContentBtnButton type="button" onClick={()=>{clickSelection({type:data.id},"A");}}>
        {data.A}
      </ContentBtnButton>
      <ContentBtnButton type="button" onClick={()=>{clickSelection({type:data.id},"B");}}>
        {data.B}
      </ContentBtnButton>
    </ContentBtnBox>
    );
  };
  
  export default ContentBtnContainer;