/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import cx from "classnames";
import { Box, Text } from "@/components/ui";
import { LoadingState } from "@/components/states";

import { ReactComponent as NoResultFound } from "@/theme/vectors/no-result-found.svg";

export interface Column {
  key?: string;
  dataIndex?: string;
  className?: string;
  title: string;
  render?: (params: { data: any[]; rowIndex: number } & ColProps) => React.ReactNode;
}

export interface ColProps {
  [key: string]: any;
}

export interface TableProps {
  className?: string;
  data: any[];
  columns: Column[];
  isLoading?: boolean;
  isEmpty?: boolean;
  colProps?: ColProps;
  placeholder?: React.ReactNode;
}

const Table = ({
  className = "table-auto",
  data,
  columns,
  isLoading,
  isEmpty,
  colProps = {},
  placeholder = "-",
}: TableProps) => {
  if (isLoading && !data) {
    return <LoadingState />;
  }

  return (
    <Box className="flex-1">
      <table className={cx("w-full text-left", className)}>
        <thead>
          <tr>
            {columns.map((item, index) => {
              const isFirstColumn = index === 0;
              const isLastColumn = index === columns.length - 1;

              return (
                <th
                  key={item.key || item.dataIndex}
                  className={cx("bg-white/5 overflow-hidden p-4 uppercase text-sm", item.className, {
                    "rounded-l-xl pl-8": isFirstColumn,
                    "rounded-r-xl pr-8": isLastColumn,
                  })}
                >
                  {item.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length} />
          </tr>
          <tr>
            <td colSpan={columns.length} />
          </tr>
          <tr>
            <td colSpan={columns.length}>
              {isEmpty ? (
                <Box className="mx-auto w-full md:w-1/2 xl:w-1/3 space-6 text-center">
                  <NoResultFound />
                  <Text>No Data</Text>
                </Box>
              ) : null}
            </td>
          </tr>
          {data.map((row, rowIndex) => (
            <tr
              className="hover:bg-white/5 transition-all duration-100"
              key={row.updatedAt || row.index || row.id || row._id || row.title}
            >
              {columns.map((item, index) => {
                const isFirstColumn = index === 0;
                const isLastColumn = index === columns.length - 1;

                return (
                  <td
                    key={`${row.updatedAt}_${item.key || item.dataIndex}`}
                    className={cx("p-4 text-sm", item.className, {
                      "rounded-l-xl pl-8": isFirstColumn,
                      "rounded-r-xl pr-8": isLastColumn,
                    })}
                  >
                    {item.render
                      ? item.render({ data, rowIndex, ...colProps }) || placeholder
                      : row[item.dataIndex] || placeholder}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Table;
