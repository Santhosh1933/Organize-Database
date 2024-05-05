import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import { FaKeycdn } from "react-icons/fa6";
import { CiMapPin } from "react-icons/ci";



import { RiMenu2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { NodeHook } from "../Hooks/NodeHook";

export const SidePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recoilNode, setRecoilNode] = useRecoilState(NodeHook);
  const [editTableName, setEditTableName] = useState(null);
  const [editId, setEditId] = useState(null);
  const [createRowId, setCreateRowId] = useState(null);

  function CreateNewNode(e) {
    e.preventDefault();
    let newId = uuid();
    const Node = {
      id: newId,
      data: {
        tableName: "Table Name",
        row: [],
      },
      position: { x: 20, y: 30 },
      type: "CustomNode",
    };

    setRecoilNode((old) => [...old, Node]);
  }

  const handleDeleteNode = (id) => {
    const updatedNodes = recoilNode.filter((node) => node.id !== id);
    setRecoilNode(updatedNodes);
  };

  const handleKeyDown = (event, node) => {
    if (event.key === "Enter" && event.target.value !== "") {
      const newValue = event.target.value;
      const updatedNodes = recoilNode.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              tableName: newValue,
            },
          };
        }
        return n;
      });
      setRecoilNode(updatedNodes);
      setEditTableName(null);
      setEditId(null);
    }
  };

  return (
    <div className="w-[400px] ">
      <button
        onClick={onOpen}
        className="bg-white self-start p-4 sm:hidden block"
      >
        <RiMenu2Line size={28} />
      </button>

      <div className="w-full bg-white shadow-md h-[90vh] hidden sm:block ">
        <div className="w-full shadow-md flex flex-wrap items-center px-4 py-2 justify-between">
          <h1 className="text-xl font-semibold text-gray-600">Tables</h1>
          <button
            onClick={CreateNewNode}
            className="flex items-center gap-2 bg-violet-500 transition-all hover:bg-violet-700 text-white py-2 px-6 rounded-md"
          >
            <FaPlus />
            <p>New table</p>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {recoilNode.map((node) => (
            <Accordion
              allowToggle
              key={node.id}
              className="flex flex-col gap-2 border-l-8 border-l-green-800"
            >
              <AccordionItem>
                <AccordionButton className="">
                  <div className="flex  items-center justify-between  w-full py-2 font-semibold text-lg">
                    <div className="flex gap-2 items-center">
                      <p>
                        {editTableName === node.id ? (
                          <div>
                            <input
                              type="text"
                              className="py-2 outline-none border rounded-md px-1"
                              defaultValue={node?.data?.tableName}
                              onKeyDown={(e) => handleKeyDown(e, node)}
                              onBlur={() => {
                                setEditTableName(null);
                                setEditId(null);
                              }}
                            />
                          </div>
                        ) : (
                          node?.data?.tableName
                        )}
                      </p>
                      <p>
                        <AccordionIcon />
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <MdModeEditOutline
                        onClick={() => {
                          setEditTableName(node.id);
                          setEditId(node.id);
                        }}
                        className="m-1 hover:bg-slate-100"
                      />
                      <Menu>
                        <MenuButton>
                          <GoKebabHorizontal className="rotate-90 m-1 hover:bg-slate-100" />
                        </MenuButton>
                        <MenuList bg={"#1e293b"} color={"white"}>
                          <MenuItem
                            bg={"#1e293b"}
                            className=" text-sm flex items-center gap-2"
                            onClick={() => {
                              setCreateRowId(node.id);
                            }}
                          >
                            Add Column <FaPlus />
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            bg={"#1e293b"}
                            className=" text-sm flex items-center gap-2"
                            onClick={() => handleDeleteNode(node.id)}
                          >
                            Delete Table <FaRegTrashCan />
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {node?.data?.row.map((row) => (
                    <div
                      key={row.id}
                      className="mb-2 grid grid-cols-3 gap-4 items-center w-full"
                    >
                      <div className="grid grid-cols-2 gap-1 col-span-2">
                        <input
                          defaultValue={row.name}
                          key={row.id}
                          className="border p-2 w-full rounded-md outline-violet-400"
                        />
                        <p className="border max-w-full w-full p-2 rounded-md truncate  outline-violet-400">
                          {row.dataType}
                        </p>
                      </div>
                      <div>
                        <p className={`${row.isNullable&&"text-violet-900"} text-sm font-semibold`}>N</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    {createRowId === node.id && (
                      <input
                        type="text"
                        className="outline-none border p-1 rounded-md "
                      />
                    )}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
