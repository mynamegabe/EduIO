import React from "react";
import { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function NumberDropdown() {
    const [numQuestions, setNumQuestions] = useState(10)
  const items = [
    {
      key: "10",
      label: "10",
    },
    {
      key: "20",
      label: "20",
    },
    {
      key: "30",
      label: "30",
    }
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered"
          className="h-[20px] w-[10px]" 
        >
          {numQuestions}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" className="bg-[#4A4E69] rounded-lg text-white" items={items} onAction={(key) => setNumQuestions(key)}>
        {(item) => (
          <DropdownItem
            key={item.key}
            // color={item.key === "delete" ? "danger" : "default"}
            // className={item.key === "delete" ? "text-danger" : ""}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
