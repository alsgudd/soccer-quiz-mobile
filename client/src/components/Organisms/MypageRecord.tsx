import { Content } from "components/Molecules";
import Atoms from "components/Atoms";

import { useMyPage } from "src/hooks"
import styled from "styled-components";
import { getOrdinalSuffix } from "src/utils";

import { useEffect } from "react";
import { useNavigate } from "react-router";

const MypageRecord = () => {
  const navigate = useNavigate();
  const { record, status } = useMyPage();

  useEffect(() => {
    if(status === 404) {
      window.alert('This page is only available to members. Go to the homepage.')
      navigate('/');
      window.location.reload();
    }
  }, [record, status])
  return (
    <Content
      header="My Record"
    >
      <Atoms.Div width="100%">
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>RANKING</StyledTh>
              <StyledTh>TEAM</StyledTh>
              <StyledTh>SCORE</StyledTh>
            </tr>
          </thead>
          <tbody>
            {
              record.map((a, index) => {
                const rank = getOrdinalSuffix(index + 1);
                return (
                  <tr>
                    <StyledTd>{rank}</StyledTd>
                    <StyledTd>{a.quizTeam}</StyledTd>
                    <StyledTd>{a.score}</StyledTd>
                  </tr>
                )
              })
            }
          </tbody>
        </StyledTable>
      </Atoms.Div>
    </Content>
  )
}

const StyledTable = styled.table`
  width: 100%;
  max-width: 700px;
  margin: auto;
  border-radius: 10px;
`
const StyledTd = styled.td`
  padding: 10px;
  text-align: center;
`
const StyledTh = styled.th`
  padding: 10px;
  font-weight: bold;
`

export default MypageRecord;