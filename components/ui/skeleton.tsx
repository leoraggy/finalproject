import { columns } from "../transaction-table/column";
import { Table, TableBody, TableCell, TableRow } from "./table";

export function CardsSkeleton() {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
