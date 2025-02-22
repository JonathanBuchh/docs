import classNames from "../lib/classNames";

export type Column = {
  title: string;
  key?: string;
  alignment?: string;
  component?: CallableFunction;
};

export type Row = {
  [key: string]: string;
};

type TableProps = {
  columns: Array<Column>;
  content: Array<Row>;
};

export default function Table(props: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  {props.columns.map((column, i) => (
                    <th
                      scope="col"
                      key={i}
                      className={classNames(
                        column.alignment === "right" ? "text-right" : "",
                        "px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      )}
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.content.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                  >
                    {props.columns.map((column, keyIndex) => (
                      <td
                        className={classNames(
                          keyIndex === 0
                            ? "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 overflow-x-auto"
                            : "px-6 py-4 text-sm text-gray-500 overflow-x-auto",
                          column.alignment === "right" ? "float-right" : ""
                        )}
                        key={keyIndex}
                      >
                        {column.component
                          ? column.component(row[column.key || column.title])
                          : row[column.key || column.title]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
