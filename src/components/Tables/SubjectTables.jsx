import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

const SubjectTables = () => {
  const { subjectsOffered } = useSelector((state) => state.mgt);

  const data = [];
  subjectsOffered?.data?.map((subject) =>
    data.push({
      ...subject?.subject,
    })
  );

  const columns = [
    {
      title: "Subject Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Subject Code",
      dataIndex: "code",
      key: "code",
    },

    {
      title: "Subject Description",
      dataIndex: "description",
      key: "description",
    },
  ];
  return (
    <Table columns={columns} dataSource={data} scroll className="text-[12px]" />
  );
};
export default SubjectTables;
