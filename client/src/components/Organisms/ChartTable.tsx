import { Content } from "components/Molecules";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";

import Atoms from "components/Atoms";
import styled from "styled-components";

import { useChart } from "src/hooks";
import { getOrdinalSuffix } from "src/utils";

const ChartTable = () => {
  const navigate = useNavigate();
  const { chart } = useChart();

  const FaHomeIcon: JSX.Element =
    <FaHome style={{ cursor: "pointer" }}
      onClick={() => navigate("/")} />;


  return (
    <Content
      marginTop="0px"
      height="100%"
      header={FaHomeIcon}
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
            <tr>
              {chart.map((chart, index) => {
                const rank = getOrdinalSuffix(index + 1);
                return (
                  <StyledTd>
                    {rank}
                  </StyledTd>
                )
              })}
              <StyledTd>1</StyledTd>
              <StyledTd>USERNAME</StyledTd>
              <StyledTd>ManchesterUnited</StyledTd>
              <StyledTd>SCORE</StyledTd>
            </tr>
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

export default ChartTable;

