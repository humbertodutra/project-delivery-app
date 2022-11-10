import { Table, TableCell, TableHead, TableRow } from '@mui/material';

export default function TableComponent() {
  return (
    <Table align="center" sx={ { width: 800 } } aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Item</TableCell>
          <TableCell align="center">Descrição</TableCell>
          <TableCell align="center">Quantidade</TableCell>
          <TableCell align="center">Valor Unitário</TableCell>
          <TableCell align="center">Sub-total</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}
