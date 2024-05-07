import { atom } from "recoil";

export const NodeHook = atom({
  key: "NodeHook",
  default: [
    {
      id: "03652582-3916-4322-94f6-8b59f5c0cf55",
      data: {
        tableName: "User",
        row: [
          {
            id: "i1",
            name: "id",
            dataType: "int",
            isNullable: true,
            indexType: "Primary key",
            comment: "",
          },
          {
            id: "i2",
            name: "username",
            dataType: "varchar(255)",
            isNullable: true,
            indexType: "Unique",
            comment: "The username of the user.",
          },
          {
            id: "i3",
            name: "email",
            dataType: "varchar(255)",
            isNullable: false,
            indexType: "Unique",
            comment: "The email address of the user.",
          },
          {
            id: "i4",
            name: "password",
            dataType: "varchar(255)",
            isNullable: false,
            indexType: "None",
            comment: "The password of the user.",
          },
        ],
      },
      position: { x: 0, y: 0 },
      type: "CustomNode",
    },
    {
      id: "a07288ae-09de-46c1-8b49-9142713f5d77",
      data: {
        tableName: "Product",
        row: [
          {
            id: "p1",
            name: "id",
            dataType: "int",
            isNullable: false,
            indexType: "None",
            comment: "",
          },
          {
            id: "p2",
            name: "name",
            dataType: "varchar(255)",
            isNullable: true,
            indexType: "Index",
            comment: "The name of the product.",
          },
          {
            id: "p3",
            name: "price",
            dataType: "decimal(10,2)",
            isNullable: true,
            indexType: "None",
            comment: "The price of the product.",
          },
        ],
      },
      position: { x: 0, y: 0 },
      type: "CustomNode",
    },
  ],
});
