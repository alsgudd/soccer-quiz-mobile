import { Content } from "components/Molecules";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";

import Atoms from "components/Atoms";
import styled from "styled-components";

import { useChart } from "src/hooks";
import { getOrdinalSuffix } from "src/utils";
import { useEffect } from "react";

const ChartTable = () => {
  const navigate = useNavigate();
  const { chart, status } = useChart();

  const FaHomeIcon: JSX.Element =
    <FaHome style={{ cursor: "pointer" }}
      onClick={() => navigate("/")} />;

  useEffect(() => {
    if(status === 404) {
      
    }
  }, [chart, status])

  return (
    <Content
      marginTop="0px"
      height="100%"
      header={FaHomeIcon}
      width="100vw"
      overflow="hidden"
    >
      <Atoms.Title margin="16px 0px 0px 0px">
        THE HALL OF FAME🏆
      </Atoms.Title>
      <Atoms.Div
        width="100%"
        marginTop="40px"
      >
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>RANKING</StyledTh>
              <StyledTh>USERNAME</StyledTh>
              <StyledTh>TEAM</StyledTh>
              <StyledTh>SCORE</StyledTh>
            </tr>
          </thead>
          <tbody>
            {chart.map((a, index) => {
              const rank = getOrdinalSuffix(index + 1);
              return (
                <tr>
                  <StyledTd>{rank}</StyledTd>
                  <StyledTd>{a.username}</StyledTd>
                  <StyledTd>{a.quizTeam}</StyledTd>
                  <StyledTd>{a.score}</StyledTd>
                </tr>
              )
            })}
          </tbody>
        </StyledTable>
      </Atoms.Div>
    </Content>

  )
}

const StyledTable = styled.table`
  // width: 400px;
  max-width: 700px;
  margin: auto;
  border-radius: 10px;
`
const StyledTd = styled.td`
  padding: 5px;
  text-align: center;
`
const StyledTh = styled.th`
  padding: 5px;
  font-weight: bold;
`

export default ChartTable;

