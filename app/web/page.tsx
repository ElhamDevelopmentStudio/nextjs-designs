import React from "react";

const DAY1 = () => {
  const students = [
    { name: "Elhamullah Hossaini", id: "201-2204049" },
    { name: "Ahmad", id: "201-22020202" },
  ];

  return (
    <div>
      {students.map((student) => (
        <table key={student.id} className="rounded-md border-black bg-blue-300">
          <tr>
            <td className="p-4">{student.id}</td>
            <td className="p-4">{student.name}</td>
          </tr>
        </table>
      ))}
    </div>
  );
};

export default DAY1;
