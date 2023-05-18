import styled from "styled-components";

const EmptyTable = () => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Column 1</TableHeader>
            <TableHeader>Column 2</TableHeader>
            <TableHeader>Column 3</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableCell colSpan={3}>
              <EmptyTableMessage>No data available</EmptyTableMessage>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  )
}

const TableContainer = styled.div`
  width: 100%;
  padding: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f5f5f5;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
`;

const EmptyTableMessage = styled.p`
  margin-top: 16px;
  text-align: center;
`;

export default EmptyTable;